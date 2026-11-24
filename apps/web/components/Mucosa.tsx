import { mucosaState } from "@uc/viz3d";

/** Repeatable scatter so dots do not jump between frames. */
const scatter = (i: number, salt: number) => {
  const x = Math.sin((i + 1) * 91.7 + salt * 47.3) * 43758.5453;
  return x - Math.floor(x);
};

const CELLS = 12;

export function Mucosa(props: { barrier: number; microbes: number; inflammation: number }) {
  const s = mucosaState(props);
  const mucus = 6 + 44 * s.mucusThickness;
  const surface = 100;
  // Open junctions are spread evenly along the surface.
  const open = new Set(Array.from({ length: s.gaps }, (_, i) => Math.floor(((i + 0.5) * (CELLS - 1)) / s.gaps)));

  return (
    <figure>
      <svg
        viewBox="0 0 480 220"
        className="w-full"
        role="img"
        aria-label={`Lining close-up: mucus ${Math.round(s.mucusThickness * 100)} percent of healthy thickness, ${s.gaps} open gaps, ${s.immuneCells} immune cells shown`}
      >
        <rect x="0" y={surface - mucus} width="480" height={mucus} fill="var(--sage)" opacity="0.28" />
        {Array.from({ length: 70 }, (_, i) => (
          <ellipse
            key={i}
            cx={scatter(i, 1) * 480}
            cy={6 + scatter(i, 2) * Math.max(4, surface - mucus - 12)}
            rx="5"
            ry="2.2"
            transform={`rotate(${scatter(i, 3) * 180} ${scatter(i, 1) * 480} ${6 + scatter(i, 2) * Math.max(4, surface - mucus - 12)})`}
            fill="var(--signal)"
          />
        ))}
        <rect x="0" y={surface + 46} width="480" height={220 - surface - 46} fill="var(--surface-2)" />
        {Array.from({ length: CELLS }, (_, i) => {
          const gap = open.has(i) ? 7 : 1;
          return (
            <g key={i}>
              <rect x={i * 40 + 0.5} y={surface} width={40 - gap} height="46" rx="5" fill="var(--paper)" stroke="var(--ink-soft)" />
              <circle cx={i * 40 + 20 - gap / 2} cy={surface + 31} r="7" fill="var(--ink-soft)" opacity="0.55" />
            </g>
          );
        })}
        {Array.from({ length: s.bacteriaInside }, (_, i) => (
          <ellipse key={i} cx={20 + scatter(i, 4) * 440} cy={surface + 54 + scatter(i, 5) * 40} rx="5" ry="2.2" fill="var(--signal)" />
        ))}
        {Array.from({ length: s.immuneCells }, (_, i) => (
          <g key={i} transform={`translate(${12 + scatter(i, 6) * 456} ${surface + 58 + scatter(i, 7) * 54})`}>
            <circle r="6.5" fill="var(--ink)" opacity="0.85" />
            <circle r="2.6" fill="var(--paper)" />
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-sm text-[var(--ink-soft)]">
        The lining, magnified and simplified. From top: bacteria, the mucus layer, the single layer of colon cells, and
        the tissue below where immune cells gather. Not to scale.
      </figcaption>
    </figure>
  );
}
