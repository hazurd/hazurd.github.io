// Tiny static preview server. Local-only on purpose: it binds to 127.0.0.1.
// No dependencies — run with `node tools/serve.js`.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, normalize, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const PORT = Number(process.argv[2] ?? 8000);
const HOST = "127.0.0.1";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
};

async function resolveTarget(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  let target = join(ROOT, normalize(decoded));

  // Keep requests inside the repo.
  if (!target.startsWith(ROOT)) return null;

  let info = await stat(target).catch(() => null);

  if (info?.isDirectory()) {
    target = join(target, "index.html");
    info = await stat(target).catch(() => null);
  }

  if (info?.isFile()) return target;

  const withHtml = await stat(`${target}.html`).catch(() => null);
  if (withHtml?.isFile()) return `${target}.html`;

  return join(ROOT, "404.html");
}

const server = createServer(async (req, res) => {
  const target = await resolveTarget(req.url);
  const notFound = target === join(ROOT, "404.html");

  try {
    const body = await readFile(target);
    const ext = target.slice(target.lastIndexOf("."));
    res.writeHead(notFound ? 404 : 200, {
      "content-type": MIME[ext] ?? "application/octet-stream",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": MIME[".html"] });
    res.end(await readFile(join(ROOT, "404.html")));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`preview: http://${HOST}:${PORT}`);
});
