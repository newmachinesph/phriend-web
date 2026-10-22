// `npm run dev:v2`: the site on :3110 against the local api2 on :8040 (owned by the stack, not started here).
// API_URL may be overridden, but only with a loopback address: a local run never reads production.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const PORT = "3110";
const API_URL = process.env.API_URL?.trim() || "http://localhost:8040";
if (!/^http:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\/?$/.test(API_URL)) {
  console.error(`dev:v2 reads a local API only; API_URL=${API_URL} is not a loopback address.`);
  process.exit(1);
}

const next = createRequire(import.meta.url).resolve("next/dist/bin/next");
const child = spawn(process.execPath, [next, "dev", "-p", PORT], { stdio: "inherit", env: { ...process.env, API_URL } });
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code ?? 0));
