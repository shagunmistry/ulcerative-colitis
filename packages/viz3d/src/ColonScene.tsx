"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
import { DRAWING, involvement, segmentAt, tissueColor } from "./anatomy";

/* A stylised colon, viewed from the front: the cecum sits on the viewer's left. */
const POINTS: [number, number, number][] = [
  [0.15, -3.35, 0], [0.0, -2.75, -0.15], [0.05, -2.15, 0], // rectum
  [0.45, -1.7, 0.4], [1.05, -1.65, 0.6], [1.45, -2.1, 0.3], [1.95, -1.75, 0], // sigmoid
  [2.25, -1.0, -0.2], [2.3, 0.2, -0.3], [2.28, 1.2, -0.3], [2.0, 1.85, -0.2], // descending
  [1.05, 1.35, 0.45], [0, 0.95, 0.65], [-1.05, 1.2, 0.45], [-2.0, 1.65, 0], // transverse
  [-2.3, 0.6, -0.2], [-2.3, -0.5, -0.1], // ascending
  [-2.25, -1.35, 0], // cecum
];

/** [position along the colon, index of the control point where it falls] */
const ANCHORS: [number, number][] = [[0, 0], [0.12, 2], [0.34, 6], [0.52, 10], [0.8, 14], [0.93, 16], [1, 17]];

class ColonCurve extends THREE.Curve<THREE.Vector3> {
  private base = new THREE.CatmullRomCurve3(POINTS.map((p) => new THREE.Vector3(...p)));

  constructor() {
    super();
  }

  override getPoint(s: number, target = new THREE.Vector3()) {
    let i = 1;
    while (i < ANCHORS.length - 1 && s > ANCHORS[i]![0]) i++;
    const [s0, a] = ANCHORS[i - 1]!;
    const [s1, b] = ANCHORS[i]!;
    const index = a + ((s - s0) / (s1 - s0)) * (b - a);
    return this.base.getPoint(Math.min(1, Math.max(0, index / (POINTS.length - 1))), target);
  }

  // The parameter already means "position along the colon", so skip arc-length remapping.
  override getPointAt(u: number, target?: THREE.Vector3) {
    return this.getPoint(u, target);
  }

  override getTangentAt(u: number, target?: THREE.Vector3) {
    return this.getTangent(u, target);
  }
}

const RINGS = 360;
const SIDES = 40;

const radiusAt = (s: number) => {
  const haustra = s < 0.12 ? 0 : 0.17 * Math.abs(Math.sin(s * Math.PI * 30));
  const taper = s < 0.12 ? 0.75 + s * 1.2 : s > 0.93 ? 1.18 : 0.92 + s * 0.18;
  return 0.36 * taper * (1 + haustra);
};

/** Rounds off both ends instead of leaving the tube open. */
const capAt = (s: number) => Math.sqrt(Math.min(1, Math.min(s, 1 - s) / 0.018 + 0.002));

function buildGeometry(curve: ColonCurve) {
  const geometry = new THREE.TubeGeometry(curve, RINGS, 1, SIDES, false);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const centre = new THREE.Vector3();
  const vertex = new THREE.Vector3();
  for (let j = 0; j <= RINGS; j++) {
    const s = j / RINGS;
    curve.getPointAt(s, centre);
    const radius = radiusAt(s) * capAt(s);
    for (let i = 0; i <= SIDES; i++) {
      const k = j * (SIDES + 1) + i;
      vertex.fromBufferAttribute(position, k).sub(centre).multiplyScalar(radius).add(centre);
      position.setXYZ(k, vertex.x, vertex.y, vertex.z);
    }
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(position.count * 3), 3));
  geometry.computeVertexNormals();
  return geometry;
}

/** Smooth, repeatable patches over the surface, so ulcers stay put between frames. */
function buildPatches(geometry: THREE.BufferGeometry) {
  const noise = new ImprovedNoise();
  const position = geometry.attributes.position as THREE.BufferAttribute;
  return Float32Array.from({ length: position.count }, (_, k) => {
    const x = position.getX(k);
    const y = position.getY(k);
    const z = position.getZ(k);
    return noise.noise(x * 5, y * 5, z * 5) + 0.5 * noise.noise(x * 11, y * 11, z * 11);
  });
}

function Colon({ extent, inflammation, onSegment }: SceneProps) {
  const invalidate = useThree((state) => state.invalidate);
  const geometry = useMemo(() => buildGeometry(new ColonCurve()), []);
  const patches = useMemo(() => buildPatches(geometry), [geometry]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  useEffect(() => {
    const color = geometry.attributes.color as THREE.BufferAttribute;
    const c = new THREE.Color();
    for (let j = 0; j <= RINGS; j++) {
      const level = involvement(j / RINGS, extent, inflammation);
      for (let i = 0; i <= SIDES; i++) {
        const k = j * (SIDES + 1) + i;
        // Ulcer patches appear above moderate intensity and widen as it rises.
        const edge = DRAWING.ulcerEdge - level * DRAWING.ulcerEdgeFall;
        const ulcer =
          THREE.MathUtils.smoothstep(patches[k]!, edge, edge + DRAWING.ulcerSoftness) *
          Math.max(0, level - DRAWING.ulcerFrom);
        c.setRGB(...tissueColor(level + ulcer), THREE.SRGBColorSpace);
        color.setXYZ(k, c.r, c.g, c.b);
      }
    }
    color.needsUpdate = true;
    invalidate();
  }, [geometry, patches, extent, inflammation, invalidate]);

  return (
    <mesh
      geometry={geometry}
      onPointerMove={(e) => e.uv && onSegment?.(segmentAt(e.uv.x).name)}
      onPointerOut={() => onSegment?.(null)}
    >
      <meshPhysicalMaterial vertexColors roughness={0.45} clearcoat={0.5} clearcoatRoughness={0.4} />
    </mesh>
  );
}

export interface SceneProps {
  extent: number;
  inflammation: number;
  onSegment?: (name: string | null) => void;
}

/** Pulls the camera back on narrow screens so the whole colon stays in frame. */
function Frame() {
  const { camera, size, invalidate } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.position.setLength(Math.max(9.6, 10.4 / aspect));
    invalidate();
  }, [camera, size, invalidate]);
  return null;
}

export default function ColonScene(props: SceneProps) {
  const [lost, setLost] = useState(false);
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  if (lost) return <p>The 3D view stopped. Reload the page to restart it.</p>;
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ position: [0, -0.4, 9.4], fov: 42 }}
      onCreated={({ gl }) => gl.domElement.addEventListener("webglcontextlost", () => setLost(true))}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 6]} intensity={2.1} />
      <directionalLight position={[-6, -2, -4]} intensity={0.9} color="#ffb38a" />
      <group position={[0, 0.65, 0]}>
        <Colon {...props} />
      </group>
      <Frame />
      <OrbitControls enableDamping={!reducedMotion} enableZoom={false} enablePan={false} minPolarAngle={0.6} maxPolarAngle={2.5} />
    </Canvas>
  );
}
