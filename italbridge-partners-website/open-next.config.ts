import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered and nothing revalidates, so the cache is read
// from the deployed static assets: no R2 bucket or KV namespace to set up.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
