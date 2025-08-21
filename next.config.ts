import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGhPages ? "/multi-select-widget" : undefined,
  assetPrefix: isGhPages ? "/multi-select-widget" : undefined,
  // images: { unoptimized: true },
};

export default nextConfig;
