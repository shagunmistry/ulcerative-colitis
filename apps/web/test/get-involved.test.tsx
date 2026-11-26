import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import GetInvolved from "../app/get-involved/page";
import { Footer } from "../components/Footer";

afterEach(() => vi.unstubAllEnvs());
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

  it("shows an email to-do until a sign-up form is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_ADVISORY_FORM_URL", "");
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
