'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

/**
 * Smoke, lit red like The Batman posters, in both themes.
 *
 * Two variants share one fragment shader and no library:
 *
 *   ambient  A fixed layer behind every page (see SmokeBackground). Capped at
 *            15% opacity, because it passes behind body text: at that cap the
 *            worst pair, --source on smoke-tinted paper, still clears WCAG AA
 *            (4.65 at night, 4.87 by day). Raise AMBIENT_CAP and red dates
 *            and links are the first thing to fail.
 *   plume    The dense smoke rising under the homepage masthead. It fades out
 *            before the masthead text, so it is allowed to be thick.
 *
 * Smoke only looks like smoke when the noise evolves (billows, curls, thins
 * out) rather than slides, which means computing it every frame on the GPU;
 * three.js or a particle library would add 40 to 150 kB to do the same thing
 * less directly. Domain-warped fractal noise is advected upward.
 *
 * Kept cheap on purpose: reduced-resolution buffer (smoke is soft, CSS
 * upscales it), about 30 fps, paused when off screen or the tab is hidden, one
 * still frame under reduced motion, and nothing at all without WebGL. Callers
 * load it with next/dynamic, so pages read before it arrives.
 */

const AMBIENT_CAP = 0.15

// By day the smoke is a brighter red than --source. The light theme's
// --source is oxblood, which at 15% on cream reads as dust, not smoke. This is
// decorative and appears nowhere else. It also darkens the paper less, so the
// worst text pair over it improves to 5.15.
const DAY_SMOKE = [0.878, 0.208, 0.169] // #E0352B

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uColor;
uniform float uDensity;
uniform float uAmbient;
uniform float uCap;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  // The ambient layer covers a whole viewport, so its features are larger
  // and it drifts more slowly than the plume.
  float scale = mix(2.2, 1.6, uAmbient);
  vec2 p = vec2(uv.x * uRes.x / uRes.y, uv.y) * scale;
  float t = uTime * mix(0.06, 0.035, uAmbient);

  // Two levels of domain warping: the warp itself drifts, so wisps curl and
  // re-form instead of translating as one sheet. The -t terms carry it upward.
  vec2 q = vec2(fbm(p + vec2(0.0, -t)), fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(
    fbm(p + 3.0 * q + vec2(1.7 + 0.15 * t, 9.2 - 1.4 * t)),
    fbm(p + 3.0 * q + vec2(8.3, 2.8 - 1.2 * t))
  );
  float f = fbm(p + 3.0 * r);
  float d = smoothstep(0.35, 0.9, f);

  if (uAmbient > 0.5) {
    // Scaled into the cap rather than clipped at it, so thick smoke keeps
    // its gradation instead of flattening into solid patches; the power lifts
    // the mid-tones so the smoke still reads at this ceiling. Heavier toward
    // the bottom of the screen, as if lit from below. Never above the cap
    // anywhere, since text can sit on any pixel.
    float a = uCap * pow(d, 0.6) * mix(1.0, 0.6, uv.y);
    gl_FragColor = vec4(uColor * a, a);
    return;
  }

  // Plume: dense low in the frame, gone by two thirds of the way up, faded at
  // the very bottom so there is no seam where the hero meets the next section.
  float v = (1.0 - smoothstep(0.05, 0.66, uv.y)) * smoothstep(0.0, 0.14, uv.y);
  float h = smoothstep(0.0, 0.15, uv.x) * smoothstep(1.0, 0.85, uv.x);
  float a = d * v * mix(0.55, 1.0, h) * uDensity;

  // Brighter where the smoke is thick and close to the light below the frame.
  vec3 c = uColor * (0.55 + 0.9 * f * (1.0 - uv.y));
  gl_FragColor = vec4(c * a, a);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

function readSource(): number[] {
  const hex = getComputedStyle(document.documentElement)
    .getPropertyValue('--source')
    .trim()
    .replace('#', '')
  if (hex.length !== 6) return [0.94, 0.27, 0.23]
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
}

export default function Smoke({
  variant,
  className = '',
}: {
  variant: 'ambient' | 'plume'
  className?: string
}) {
  const ambient = variant === 'ambient'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef<number[]>([0.94, 0.27, 0.23])
  const densityRef = useRef(0.9)
  const drawOnceRef = useRef<(() => void) | null>(null)
  const { resolvedTheme } = useTheme()

  // Theme drives colour and density through refs, so a toggle recolours the
  // running loop without rebuilding the GL context. Read --source a frame
  // later, once next-themes has swapped the class on <html>.
  useEffect(() => {
    const dark = resolvedTheme !== 'light'
    const id = requestAnimationFrame(() => {
      colorRef.current = dark ? readSource() : DAY_SMOKE
      // By day the plume is thinner, so the cream sky still reads as sky.
      // The ambient layer ignores density; its ceiling is AMBIENT_CAP.
      densityRef.current = dark ? 0.9 : 0.55
      drawOnceRef.current?.()
    })
    return () => cancelAnimationFrame(id)
  }, [resolvedTheme, ambient])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    })
    // A lost context (GPU reset, too many contexts) draws nothing rather than
    // leaving the browser's crashed-canvas placeholder on the page.
    if (!gl || gl.isContextLost()) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    // One triangle that covers the viewport.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uRes')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uColor = gl.getUniformLocation(program, 'uColor')
    const uDensity = gl.getUniformLocation(program, 'uDensity')
    gl.uniform1f(gl.getUniformLocation(program, 'uAmbient'), ambient ? 1 : 0)
    gl.uniform1f(gl.getUniformLocation(program, 'uCap'), AMBIENT_CAP)

    // The ambient layer is a whole viewport, so it renders at a lower
    // resolution; at 15% opacity nobody can see the difference.
    const SCALE = ambient ? 0.35 : 0.5
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * SCALE))
      const h = Math.max(1, Math.round(canvas.clientHeight * SCALE))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    // Start part-way in so the first frame is already developed smoke.
    let elapsed = ambient ? 90 : 40
    const draw = () => {
      resize()
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, elapsed)
      gl.uniform3fv(uColor, colorRef.current)
      gl.uniform1f(uDensity, densityRef.current)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    drawOnceRef.current = draw

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let last = 0
    let onScreen = true

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (now - last < 33) return
      if (last) elapsed += Math.min(now - last, 100) / 1000
      last = now
      draw()
    }
    const start = () => {
      if (frame || reduced.matches || !onScreen || document.hidden) return
      last = 0
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    io.observe(canvas)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    const onMotion = () => {
      if (reduced.matches) {
        stop()
        draw()
      } else start()
    }
    reduced.addEventListener('change', onMotion)
    const ro = new ResizeObserver(() => draw())
    ro.observe(canvas)
    const onLost = (event: Event) => {
      event.preventDefault()
      stop()
      canvas.style.visibility = 'hidden'
    }
    canvas.addEventListener('webglcontextlost', onLost)

    draw()
    start()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reduced.removeEventListener('change', onMotion)
      canvas.removeEventListener('webglcontextlost', onLost)
      drawOnceRef.current = null
      // Free the resources but keep the context: calling loseContext() here
      // kills it for good, and a remount of the same canvas (React's dev
      // double-mount, or fast refresh) would get the dead one back.
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [ambient])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
    >
      {/* The plume's light source, a red glow just below the frame. It
          doubles as the fallback when WebGL is unavailable. */}
      {!ambient && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_105%,color-mix(in_srgb,var(--source)_18%,transparent),transparent_70%)] [mask-image:linear-gradient(to_top,transparent,black_35%)] dark:bg-[radial-gradient(ellipse_70%_45%_at_50%_105%,color-mix(in_srgb,var(--source)_22%,transparent),transparent_70%)]" />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
