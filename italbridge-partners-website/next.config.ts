import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    // Unmatched URLs get app/global-not-found.tsx, rendered on the server with
    // a 404 status. The root layout sits under [lang], so a not-found page
    // composed from it was rendered only in the browser.
    globalNotFound: true,
  },
  partialPrefetching: true,
  images: {
    // AVIF first (smallest), WebP for browsers without AVIF support.
    formats: ["image/avif", "image/webp"],
    // Every photo is served at 60: 40-50% smaller than the default 75, with no
    // visible difference at the sizes the pages show them.
    qualities: [60],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
