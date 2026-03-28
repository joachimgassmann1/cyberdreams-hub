import { JSDOM } from 'jsdom';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import blog posts to get all slugs
const postsFile = fs.readFileSync(path.join(__dirname, 'client/src/data/blog/posts.ts'), 'utf-8');
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(postsFile)) !== null) {
  slugs.push(match[1]);
}

// Also need to check individual files if they are imported
const blogDir = path.join(__dirname, 'client/src/data/blog');
const files = fs.readdirSync(blogDir);
for (const file of files) {
  if (file.endsWith('.ts') && file !== 'posts.ts' && file !== 'types.ts') {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const fileMatch = /slug:\s*['"]([^'"]+)['"]/.exec(content);
    if (fileMatch && !slugs.includes(fileMatch[1])) {
      slugs.push(fileMatch[1]);
    }
  }
}

const routes = [
  '/',
  '/impressum',
  '/datenschutz',
  '/blog',
  '/404',
  ...slugs.map(slug => `/blog/${slug}`)
];

const PORT = 3001;
const DIST_DIR = path.join(__dirname, 'dist/public');

async function prerender() {
  console.log('Starting prerender process with JSDOM...');
  
  // Start a local server to serve the built SPA
  const app = express();
  app.use(express.static(DIST_DIR));
  // Fallback to index.html for SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
  
  const server = app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);

  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    
    try {
      const dom = await JSDOM.fromURL(`http://localhost:${PORT}${route}`, {
        runScripts: "dangerously",
        resources: "usable",
        pretendToBeVisual: true
      });
      
      // Wait for React to render and any lazy loaded components
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const html = dom.serialize();
      
      // Determine file path
      let filePath;
      if (route === '/') {
        filePath = path.join(DIST_DIR, 'index.html');
      } else if (route === '/404') {
        filePath = path.join(DIST_DIR, '404.html');
      } else {
        const dirPath = path.join(DIST_DIR, route);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        filePath = path.join(dirPath, 'index.html');
      }
      
      fs.writeFileSync(filePath, html);
      console.log(`Saved ${filePath}`);
      
      dom.window.close();
    } catch (err) {
      console.error(`Error prerendering ${route}:`, err);
    }
  }
  
  server.close();
  console.log('Prerendering complete!');
}

prerender().catch(err => {
  console.error('Prerendering failed:', err);
  process.exit(1);
});
