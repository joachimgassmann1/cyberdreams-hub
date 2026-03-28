import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'client/src/data/blog');

const replacements = {
  'coding-in-the-matrix.ts': '/blog-images/cyberpunk-futuristic-soundscapes-hero.webp',
  'harvard-study-music.ts': '/blog-images/focus-music-productivity-hero.webp',
  'jazz-brain-focus.ts': '/blog-images/jazz-atmosphere-warm-acoustic-hero.webp',
  'jazz-sleep-science.ts': '/blog-images/jazz-atmosphere-warm-acoustic-hero.webp',
  'jazz-vs-classical-stress-relief.ts': '/blog-images/jazz-atmosphere-warm-acoustic-hero.webp',
  'night-shift-mind.ts': '/blog-images/ambient-soundscapes-hero.webp',
  'perfect-focus-playlist.ts': '/blog-images/ultimate-guide-focus-music-hero.webp'
};

for (const [file, newImage] of Object.entries(replacements)) {
  const filePath = path.join(blogDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/heroImage:\s*['"]https:\/\/d2xsxph8kpxj0f\.cloudfront\.net[^'"]+['"]/, `heroImage: '${newImage}'`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
