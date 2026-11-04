import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered and nothing revalidates, so the cache is read
// from the deployed static assets: no R2 bucket or KV namespace to set up.
const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});

// `npm run build` runs the OpenNext build (so Cloudflare's default build step
// produces .open-next/worker.js); OpenNext itself must then call `next build`
// directly, or it would call `npm run build` again and loop.
config.buildCommand = "npx next build";

export default config;
