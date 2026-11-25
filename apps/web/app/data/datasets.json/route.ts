import { DATASETS } from "@uc/evidence";

export const dynamic = "force-static";

/** The dataset list for scripts. */
export function GET() {
  return Response.json({ datasets: DATASETS });
}
