import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'client/src/data/blog');

const replacements = {
  'brain-reset-burnout.ts': 'https://d2xsxph8kpxj0f.cloudfront.net/100777620/nbg9ea9tCT3T5YUgNvKDXF/brain-reset-burnout-hero-oJaZyU49vgquHqktYJVCpJ.webp',
  'coding-in-the-matrix.ts': 'https://d2xsxph8kpxj0f.cloudfront.net/100777620/nbg9ea9tCT3T5YUgNvKDXF/coding-in-the-matrix-hero-j9hNJnTDMNxNE4kbrBhT5T.webp',
  'harvard-study-music.ts': 'https://d2xsxph8kpxj0f.cloudfront.net/100777620/nbg9ea9tCT3T5YUgNvKDXF/harvard-study-music-hero-BCQaNkP3qVDoNbpBpssNio.webp',
  'jazz-brain-focus.ts': 'https://d2xsxph8kpxj0f.cloudfront.net/100777620/nbg9ea9tCT3T5YUgNvKDXF/jazz-brain-focus-hero-DotRzbgWQu5yvNApPCfzpm.webp',
  'jazz-sleep-science.ts': 'https://d2xsxph8kpxj0f.cloudfront.net/100777620/nbg9ea9tCT3T5YUgNvKDXF/jazz-sleep-science-hero-J7L7hBDBkgJ7T2KWbNe7HA.webp',
  'jazz-vs-classical-stress-relief.ts': 'https://d2xsxph8kpxj0f.cloudfront.net/100777620/nbg9ea9tCT3T5YUgNvKDXF/jazz-vs-classical-hero-Bq7RMje6WgX6UqBnQhRpzs.webp',
  'night-shift-mind.ts': 'https://d2xsxph8kpxj0f.cloudfront.net/100777620/nbg9ea9tCT3T5YUgNvKDXF/night-shift-mind-hero-ens2rBNDVqBBjbEQCDjQsh.webp',
  'perfect-focus-playlist.ts': 'https://d2xsxph8kpxj0f.cloudfront.net/100777620/nbg9ea9tCT3T5YUgNvKDXF/perfect-focus-playlist-hero-gnY4sJ8Hzf5qJAXh6KwFFm.webp'
};

for (const [file, newImage] of Object.entries(replacements)) {
  const filePath = path.join(blogDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Replace the heroImage line
    content = content.replace(/heroImage:\s*['"][^'"]+['"]/, `heroImage: '${newImage}'`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
}
