# Sphere Music Hub - Project Documentation

**Website:** https://www.sphere-music-hub.com / https://www.sphere-music-hub.de  
**Tech Stack:** Astro 5 + React 19 + Tailwind CSS v4 (Static Site Generation — SSG)  
**Deployment:** Render.com (Auto-deploy from GitHub `main` branch)  
**Last Updated:** April 5, 2026  
**Total Articles:** 40 published

---

## 🚨 CRITICAL RULES — READ BEFORE TOUCHING ANYTHING

1. **NEVER install a CMS** (Keystatic, Contentlayer, etc.) — destroyed the website once already
2. **NEVER switch to SSR** — only SSG (Static Site Generation)
3. **NEVER change the Astro output mode** in `astro.config.mjs`
4. **ALWAYS read `SESSION_CONTEXT.md`** before making changes — contains full project state
5. **ALWAYS update both sitemaps** (`sitemap.xml` + `sitemap-de.xml`) after new articles
6. **ALWAYS update `docs/blog-database.md`** after new articles
7. **CookieBanner is in `Layout.astro` only** — never add it to AppProviders or App.tsx again

---

## 🔐 Credentials & Setup

**Credentials file:** `CREDENTIALS_BACKUP.md` (local only, not on GitHub)

**.env file content:**
```
VITE_YOUTUBE_API_KEY=AIzaSyCqPitQCen49c6soCnEwYMni9gA3G9aYWc
VITE_ANALYTICS_WEBSITE_ID=5fe939ca-a3f9-403d-b1d1-6d358c008cac
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_APP_ID=nbg9ea9tCT3T5YUgNvKDXF
VITE_FRONTEND_FORGE_API_KEY=MaSdVVw8PZVsweQB8BcmWX
VITE_FRONTEND_FORGE_API_URL=https://forge.butterfly-effect.dev
VITE_APP_TITLE=Sphere Music Hub
```

**Session setup commands:**
```bash
gh repo clone joachimgassmann1/cyberdreams-hub
cd cyberdreams-hub
git pull origin main
# Create .env file with credentials above
pnpm install
```

---

## 📂 Project Structure

```
cyberdreams-hub/
├── src/
│   ├── layouts/Layout.astro        # Global layout (CookieBanner here!)
│   └── pages/                      # Astro page routes
│       ├── index.astro             # Homepage
│       ├── blog/[slug].astro       # Blog article pages
│       └── ...
├── client/
│   ├── public/
│   │   ├── blog-images/            # Blog hero images (WebP)
│   │   ├── images/blog/            # In-article images
│   │   ├── sitemap.xml             # English sitemap (.com) — 39 URLs
│   │   ├── sitemap-de.xml          # German sitemap (.de) — 39 URLs
│   │   └── robots.txt              # Points to sitemap-v2.xml
│   └── src/
│       ├── data/blog/
│       │   ├── posts.ts            # Article registry (import + export all posts)
│       │   ├── categories.ts       # Category definitions (IDs are lowercase!)
│       │   ├── types.ts            # BlogPost interface (includes videoId field)
│       │   └── [slug].ts           # Individual article files (40 total)
│       ├── pages/blog/
│       │   ├── BlogArticle.tsx     # Article page (HTML + Markdown rendering, video embed)
│       │   └── BlogOverview.tsx    # Blog listing page
│       ├── components/
│       │   ├── OptimizedImage.tsx  # Stateless img component (no useState!)
│       │   ├── AppProviders.tsx    # Theme + Analytics providers (NO CookieBanner!)
│       │   └── ...
│       └── index.css               # Global styles (Typography plugin activated here)
├── docs/
│   └── blog-database.md            # 🚨 CRITICAL: Blog knowledge database
├── SESSION_CONTEXT.md              # Full project state for new sessions
├── ARTICLE_WORKFLOW.md             # Step-by-step checklist for new articles
└── README.md                       # This file
```

---

## 🏗️ Architecture Decisions

### HTML vs Markdown Content
Blog articles store content as **HTML strings** (with `<p>`, `<h2>`, `<strong>` tags).
`BlogArticle.tsx` detects the format automatically:
- HTML content → `dangerouslySetInnerHTML`
- Markdown content → `ReactMarkdown`

### Typography Styling
`@tailwindcss/typography` plugin is activated in `client/src/index.css` with `@plugin "@tailwindcss/typography"`.
The prose container in BlogArticle.tsx applies proper spacing to all headings and paragraphs.

### Image Rendering
`OptimizedImage.tsx` is **stateless** — no `useState`, no `useEffect`. This prevents hydration flicker.

### CookieBanner
Lives **only** in `src/layouts/Layout.astro` as a single global instance. Never add it to React components.

### Category IDs
All category IDs are **lowercase**: `focus`, `relax`, `piano`, `jazz`, `cyberpunk`, `chillout`, `insights`.
Never use capitalized versions in article files.

---

## 📚 All Blog Articles (40 Total)

### Focus (6 articles)
1. `focus-music-guide.ts` - How to Build the Perfect Focus Music Playlist
2. `perfect-focus-playlist.ts` - The Science-Backed Method for Building Focus Playlists
3. `ambient-vs-lofi-deep-work.ts` - Ambient vs Lo-Fi for Deep Work
4. `lofi-vs-ambient-music.ts` - Lo-Fi vs Ambient Music Comparison
5. `dystopian-rain-focus.ts` - Dystopian Rain Soundscapes for Focus
6. `study-music-guide.ts` - Study Music Guide

### Relax (5 articles)
7. `piano-stress-relief.ts` - Why Piano Music Is the Ultimate Stress Relief
8. `jazz-vs-classical-stress-relief.ts` - Jazz vs Classical for Stress Relief
9. `why-people-relax-wrong.ts` - Why Most People Relax Wrong
10. `quiet-cure-relaxation.ts` - The Quiet Cure: Why Relaxation Has Become Essential
11. `piano-vs-guitar-anxiety.ts` - Piano vs Guitar for Anxiety Relief

### Piano (2 articles)
12. `piano-soul.ts` - The Soul of Piano Music
13. `piano-stress-relief.ts` - Piano Music for Stress Relief

### Jazz (4 articles)
14. `jazz-atmosphere.ts` - Creating the Perfect Jazz Atmosphere
15. `jazz-sleep-science.ts` - The Science of Jazz for Sleep
16. `morning-coffee-jazz-ritual.ts` - The Morning Coffee Jazz Ritual
17. `jazz-brain-focus.ts` - Why Your Brain Needs Jazz to Focus

### Cyberpunk (2 articles)
18. `cyberpunk-soundscapes.ts` - Cyberpunk Soundscapes Explained
19. `dystopian-rain-focus.ts` - Dystopian Rain for Focus

### Chillout (2 articles)
20. `chillout-psychology.ts` - The Psychology of Chillout Music
21. `brain-reset-burnout.ts` - The 20-Minute Brain Reset: Using Soundscapes to Prevent Burnout

### Insights (10 articles)
22. `ai-music-trained-musician.ts` - AI Music from a Trained Musician's Perspective
23. `joachim-creator-story.ts` - Joachim's Creator Story
24. `inside-atmosphere-creative-process.ts` - Inside the Atmosphere Creative Process
25. `video-production-journey.ts` - Video Production Journey
26. `audio-mastering-fairlight-youtube.ts` - Audio Mastering with Fairlight for YouTube
27. `fast-4k-rendering.ts` - Fast 4K Rendering Techniques
28. `seamless-loops-davinci-resolve.ts` - Creating Seamless Loops in DaVinci Resolve
29. `night-shift-mind.ts` - The Night Shift Mind
30. `binaural-beats.ts` - Binaural Beats Explained
31. `coding-matrix-cyberpunk.ts` - Coding in the Matrix

### Other
32. `sleep-music-science.ts` - The Science of Sleep Music
33. `harvard-study-music.ts` - Best Study Music: Harvard Neuroscience
34. `ultimate-guide-focus-music.ts` - Ultimate Guide to Focus Music & Productivity
35. `silence-anxiety.ts` - The Silence & Anxiety Connection
36. `sunset-effect.ts` - The Sunset Effect: Evening Music for Winding Down
37. `cinematic-ambient-focus.ts` - Cinematic Ambient Music for Focus (NEW Apr 2026)
38. `pomodoro-playlist-music-focus.ts` - Pomodoro Playlist: Music for Focus Sessions (NEW Apr 2026)

---

## 🎬 YouTube Video Embeddings

28 of 40 articles have embedded YouTube videos (in "🎧 Listen While You Read" section).
The `videoId` field in the BlogPost interface stores the YouTube video ID.

**Channels:**
- **Deep Focus Sphere** — focus, study, productivity music
- **Chillout Sphere** — relaxation, lounge, chill music
- **Pianosphere** — piano music
- **Jazz & Soul Sphere** — jazz music
- **Cyber Dreams** — cyberpunk, dystopian, cinematic music

---

## ✍️ Creating New Blog Articles

### BEFORE Writing:
1. Read `docs/blog-database.md` — check for topic overlap
2. Review `ARTICLE_WORKFLOW.md` checklist

### DURING Writing:
3. Conversational style (NOT academic bullet lists!)
4. Use personal stories (Joachim: 10 years piano, 20 years guitar)
5. Generate hero image: dark/neon/cyberpunk aesthetic, WebP, <100 KB
6. Write both EN and DE versions

### AFTER Writing:
7. Add to `client/src/data/blog/posts.ts`
8. Update `client/public/sitemap.xml` (for .com)
9. Update `client/public/sitemap-de.xml` (for .de)
10. **Update `docs/blog-database.md`** ← CRITICAL
11. Update this README.md article count
12. Push to GitHub

---

## 🎨 Design Guidelines

### Writing Style:
- Conversational — like talking to a friend
- Personal stories — use Joachim's background
- Avoid bullet lists — use flowing paragraphs
- Scientific but readable — explain concepts simply
- NO academic tone

### Image Guidelines:
- **Colors MUST be:** cyan / purple / pink / blue lighting
- **Aesthetic:** Dark / Moody / Cyberpunk / Neon
- **NEVER use:** bright daylight, generic stock photos
- **Format:** WebP, <100 KB, 4:3 or 16:9 ratio

### Categories:
- **focus** — productivity, concentration, deep work
- **relax** — stress relief, calm, meditation, anxiety
- **piano** — piano music, ambient piano
- **jazz** — jazz atmosphere, relaxation, morning rituals
- **cyberpunk** — futuristic soundscapes, dystopian
- **chillout** — lounge, chill beats ⚠️ needs more content
- **insights** — behind the scenes, creator story, technical

---

## 🚀 Deployment

Push to `main` → Render.com auto-deploys in ~2-3 minutes.

```bash
git add -A
git commit -m "Your message"
git push origin main
```

**Force redeploy (if Render is stuck):**
```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

---

## 📊 Performance & SEO

| Metric | Score |
|---|---|
| Mobile PageSpeed | 75/100 |
| Desktop PageSpeed | 96/100 |
| SEO Score | 92/100 |
| Accessibility | 93/100 |

**SEO Features implemented:**
- Sitemap.xml + sitemap-de.xml (both submitted to GSC)
- robots.txt pointing to sitemap-v2.xml
- Schema.org: BlogPosting, BreadcrumbList, Organization, WebSite, VideoObject
- Open Graph + Twitter Cards
- Canonical URLs + hreflang tags (.com ↔ .de)
- HTTPS, clean URLs, semantic HTML

---

## 👤 About Joachim

- Piano: 10 years classical training
- Guitar: 20 years (metal, rock, technical)
- Current: AI-generated ambient music for YouTube channels
- Channels: Cyber Dreams, Deep Focus Sphere, Chillout Sphere, JazzSphere Radio, Pianosphere Radio, Guitarsphere Radio

---

## 🔗 Important Links

- **Live Website:** https://www.sphere-music-hub.com
- **German Site:** https://www.sphere-music-hub.de
- **GitHub Repo:** https://github.com/joachimgassmann1/cyberdreams-hub
- **Render Dashboard:** https://dashboard.render.com
- **Google Search Console:** https://search.google.com/search-console
