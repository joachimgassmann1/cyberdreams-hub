import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const port = Number(process.env.PORT || 3000);
const englishRoot = resolve('dist');
const germanRoot = resolve('dist-de');

const contentTypes = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

function isGermanHost(host) {
  return host === 'sphere-music-hub.de' || host === 'www.sphere-music-hub.de';
}

function resolveRequestedFile(root, requestPathname) {
  const decodedPath = decodeURIComponent(requestPathname);
  const normalizedPath = normalize(decodedPath).replace(/^[/\\]+/, '');
  const candidate = resolve(root, normalizedPath);

  if (!candidate.startsWith(`${root}/`) && candidate !== root) return null;

  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;

  const directoryIndex = resolve(candidate, 'index.html');
  if (directoryIndex.startsWith(`${root}/`) && existsSync(directoryIndex) && statSync(directoryIndex).isFile()) {
    return directoryIndex;
  }

  return null;
}

const server = createServer((request, response) => {
  const host = (request.headers.host || '').split(':')[0].toLowerCase();
  const root = isGermanHost(host) ? germanRoot : englishRoot;
  const requestUrl = new URL(request.url || '/', `http://${host || 'localhost'}`);
  const filePath = resolveRequestedFile(root, requestUrl.pathname);

  if (!filePath) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const extension = extname(filePath).toLowerCase();
  const cacheControl = extension === '.html' || extension === '.xml' || extension === '.txt'
    ? 'public, max-age=0, must-revalidate'
    : 'public, max-age=31536000, immutable';

  response.writeHead(200, {
    'Content-Type': contentTypes[extension] || 'application/octet-stream',
    'Cache-Control': cacheControl,
    'Vary': 'Host',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Sphere Music Hub static server listening on port ${port}`);
});
