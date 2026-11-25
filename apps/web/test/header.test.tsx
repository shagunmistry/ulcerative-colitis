import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { Header } from "../components/Header";

const theme = vi.hoisted(() => ({ resolvedTheme: undefined as string | undefined }));
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next-themes", () => ({ useTheme: () => ({ ...theme, setTheme: () => {} }) }));

describe("theme button", () => {
  it("renders first as the server did, whatever theme the browser has saved", () => {
    const server = renderToStaticMarkup(<Header />);
    // React keeps a mismatched label after hydration, so the saved theme must wait until mounted.
    for (const saved of ["light", "dark"]) {
      theme.resolvedTheme = saved;
      expect(renderToStaticMarkup(<Header />), saved).toBe(server);
    }
  });
});
