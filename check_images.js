import fs from 'fs';
import path from 'path';
import https from 'https';

const blogDir = path.join(process.cwd(), 'client/src/data/blog');

async function checkUrl(url) {
  if (!url.startsWith('http')) return { url, status: 'local' };
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: e.message });
    });
  });
}

async function main() {
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'posts.ts' && f !== 'categories.ts');
  
  const results = [];
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const match = content.match(/heroImage:\s*['"]([^'"]+)['"]/);
    if (match) {
      const url = match[1];
      const result = await checkUrl(url);
      results.push({ file, ...result });
      if (result.status !== 200 && result.status !== 'local') {
        console.log(`[FAILED] ${file}: ${url} (${result.status})`);
      } else {
        console.log(`[OK] ${file}: ${url} (${result.status})`);
      }
    }
  }
}

main();
