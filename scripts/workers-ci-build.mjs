// Runs after `npm install`. On Cloudflare Workers Builds (WORKERS_CI=1) it
// builds the site, so the deploy command (`npx wrangler deploy`) finds
// .open-next/ even when the dashboard's Build command field is empty.
// Locally it does nothing. Set SKIP_POSTINSTALL_BUILD=1 to turn it off.
import { execSync } from "node:child_process";

if (process.env.WORKERS_CI === "1" && process.env.SKIP_POSTINSTALL_BUILD !== "1") {
  console.log("Workers Builds detected: running `npm run build`");
  execSync("npm run build", { stdio: "inherit" });
}
