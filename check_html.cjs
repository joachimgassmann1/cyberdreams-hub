const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const distDir = path.join(__dirname, 'dist');
let errors = 0;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content);
  const relativePath = path.relative(distDir, filePath);
  
  // 1. Check for unrendered HTML tags in text
  const bodyText = $('body').text();
  if (bodyText.includes('<p>') || bodyText.includes('<h2>') || bodyText.includes('<strong>')) {
    console.error(`[ERROR] Unrendered HTML tags found in: ${relativePath}`);
    errors++;
  }
  
  // 2. Check for broken image links (empty src or missing alt)
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    const alt = $(el).attr('alt');
    if (!src || src.trim() === '') {
      console.error(`[ERROR] Empty image src found in: ${relativePath}`);
      errors++;
    }
    if (alt === undefined) {
      console.error(`[WARNING] Missing alt attribute on image in: ${relativePath}`);
    }
  });
  
  // 3. Check SEO tags
  const title = $('title').text();
  if (!title || title.trim() === '') {
    console.error(`[ERROR] Missing <title> in: ${relativePath}`);
    errors++;
  }
  
  const metaDesc = $('meta[name="description"]').attr('content');
  if (!metaDesc || metaDesc.trim() === '') {
    console.error(`[ERROR] Missing meta description in: ${relativePath}`);
    errors++;
  }
  
  const canonical = $('link[rel="canonical"]').attr('href');
  if (!canonical || canonical.trim() === '') {
    console.error(`[ERROR] Missing canonical URL in: ${relativePath}`);
    errors++;
  }
  
  // 4. Check Schema.org data
  let hasSchema = false;
  $('script[type="application/ld+json"]').each((i, el) => {
    try {
      JSON.parse($(el).html());
      hasSchema = true;
    } catch (e) {
      console.error(`[ERROR] Invalid JSON-LD schema in: ${relativePath}`);
      errors++;
    }
  });
  
  if (!hasSchema && relativePath.includes('blog/')) {
    console.error(`[ERROR] Missing Schema.org data in blog post: ${relativePath}`);
    errors++;
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith('.html') && !filePath.includes('google')) {
      checkFile(filePath);
    }
  }
}

console.log('Starting comprehensive HTML check...');
walkDir(distDir);
console.log(`Check completed with ${errors} errors.`);
if (errors > 0) process.exit(1);
