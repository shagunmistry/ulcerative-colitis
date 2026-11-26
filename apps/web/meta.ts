import type { Metadata } from "next";
import { ogImage, type OgPage } from "./og-pages";

/**
 * Title, description and social preview for a page. A page's `openGraph` replaces the
 * layout's, so everything a preview needs has to be given again.
 */
export function pageMetadata(title: string, description: string, image: OgPage = "understand"): Metadata {
  return {
    title,
    description,
    openGraph: { type: "website", siteName: "Ulcerative Colitis", title, description, images: [ogImage(image)] },
  };
}
