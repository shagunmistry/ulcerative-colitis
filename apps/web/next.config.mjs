import { REDIRECTS } from "./redirects.mjs";

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@uc/sim", "@uc/viz3d", "@uc/evidence"],
  redirects: async () => REDIRECTS,
};
export default config;
