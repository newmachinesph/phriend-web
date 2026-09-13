// Uploads site images and files to R2 under site/<path>, served at https://cdn.phriend.app/site/<path>.
// Reference them in code with cdn("/blog/x.jpg") from lib/site.ts. No dependencies: S3 SigV4 signing with node:crypto.
// Run from phriend-web: node --env-file=../phriend-ph/.env.local scripts/upload-to-cdn.mjs <file-or-folder> [...]
// The first folder of each path is dropped from the key: "new/blog/cover.jpg" -> site/blog/cover.jpg.
// Cached for a week: give a changed image a new file name if it has to update everywhere at once.
import { createHash, createHmac } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, isAbsolute, join, relative, sep } from "node:path";

const TYPES = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".gif": "image/gif", ".avif": "image/avif", ".pdf": "application/pdf" };
const { R2_ACCOUNT_ID: account, R2_ACCESS_KEY_ID: accessKey, R2_SECRET_ACCESS_KEY: secret, R2_BUCKET: bucket } = process.env;
if (!account || !accessKey || !secret || !bucket) throw new Error("R2_* env missing: run with --env-file=../phriend-ph/.env.local");

const sha256 = (data) => createHash("sha256").update(data).digest("hex");
const hmac = (key, data) => createHmac("sha256", key).update(data).digest();

async function put(key, body, contentType) {
  const host = `${account}.r2.cloudflarestorage.com`;
  const path = `/${bucket}/${key.split("/").map((s) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)).join("/")}`;
  const amzDate = new Date().toISOString().replace(/[-:]|\.\d{3}/g, "");
  const date = amzDate.slice(0, 8);
  const headers = { "cache-control": "public, max-age=604800", "content-type": contentType, host, "x-amz-content-sha256": sha256(body), "x-amz-date": amzDate };
  const signed = Object.keys(headers).sort().join(";");
  const canonical = ["PUT", path, "", ...Object.keys(headers).sort().map((h) => `${h}:${headers[h]}`), "", signed, headers["x-amz-content-sha256"]].join("\n");
  const scope = `${date}/auto/s3/aws4_request`;
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${secret}`, date), "auto"), "s3"), "aws4_request");
  const signature = createHmac("sha256", signingKey).update(["AWS4-HMAC-SHA256", amzDate, scope, sha256(canonical)].join("\n")).digest("hex");
  const sent = Object.fromEntries(Object.entries(headers).filter(([h]) => h !== "host")); // fetch sets Host itself
  const res = await fetch(`https://${host}${path}`, { method: "PUT", body, headers: { ...sent, authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, SignedHeaders=${signed}, Signature=${signature}` } });
  if (!res.ok) throw new Error(`${key}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
}

const walk = (p) => (statSync(p).isDirectory() ? readdirSync(p).flatMap((f) => walk(join(p, f))) : [p]);
const args = process.argv.slice(2);
if (!args.length) throw new Error("name at least one file or folder");

for (const arg of args) {
  if (isAbsolute(arg) || arg.startsWith("..")) throw new Error(`pass a relative path like new/blog/cover.jpg, not ${arg}`);
  const root = arg.split(/[\\/]/)[0];
  for (const file of walk(arg)) {
    const type = TYPES[extname(file).toLowerCase()];
    if (!type) { console.warn("skip (unknown type)", file); continue; }
    const key = `site/${relative(root, file).split(sep).join("/")}`;
    await put(key, readFileSync(file), type);
    console.log(`https://cdn.phriend.app/${key}`);
  }
}
