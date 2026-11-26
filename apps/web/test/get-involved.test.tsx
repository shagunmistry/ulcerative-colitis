import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import GetInvolved from "../app/get-involved/page";
import { Footer } from "../components/Footer";
import { OWNER } from "../owner";

const email = OWNER.email;
afterEach(() => {
  vi.unstubAllEnvs();
  OWNER.email = email;
});
const render = () => renderToStaticMarkup(<GetInvolved />).replaceAll("&#x27;", "'");

describe("get involved", () => {
  it("offers three ways in", () => {
    const html = render();
    for (const heading of ["People with UC and caregivers", "Clinicians", "Developers and researchers"]) {
      expect(html).toContain(`>${heading}</h2>`);
    }
    expect(html).toContain("docs/CLINICAL_REVIEW.md");
    expect(html).toContain("CONTRIBUTING.md");
    expect(html).toContain("TODO(owner): stipend");
  });

  it("asks people to email until a sign-up form is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_ADVISORY_FORM_URL", "");
    expect(render()).toContain(`href="mailto:${email}"`);
    OWNER.email = "TODO(owner): contact email";
    const html = render();
    expect(html).toContain("Email ");
    expect(html).toContain("TODO(owner): contact email");
    expect(html).not.toContain("sign-up form");
  });

  it("links the sign-up form once configured, and collects nothing itself", () => {
    vi.stubEnv("NEXT_PUBLIC_ADVISORY_FORM_URL", "https://forms.example.org/join");
    const html = render();
    expect(html).toContain('href="https://forms.example.org/join"');
    expect(html).toContain("sign-up form");
    expect(html).not.toMatch(/<(form|input)/);
  });

  it("is linked from the footer", () => {
    expect(renderToStaticMarkup(<Footer />)).toContain('href="/get-involved"');
  });
});
