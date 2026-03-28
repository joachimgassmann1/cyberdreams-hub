# Sphere Music Hub - Project Documentation

**Website:** https://sphere-music-hub.com / https://sphere-music-hub.de  
**Tech Stack:** React 19 + Tailwind 4 + Wouter (Static Frontend)  
**Deployment:** Render.com (Auto-deploy from GitHub)

---

## 🔐 GitHub Deployment Credentials

**Repository:** `https://github.com/joachimgassmann1/cyberdreams-hub.git`  
**Token:** `<YOUR_GITHUB_TOKEN>`

**Deploy Command:**
```bash
cd /home/ubuntu/sphere-music-hub
git remote set-url github https://<YOUR_GITHUB_TOKEN>@github.com/joachimgassmann1/cyberdreams-hub.git
git push github main
```

**Note:** After push, Render.com auto-deploys in 2-3 minutes.

---

## 🚨 CRITICAL FILES - ALWAYS CHECK FIRST!

### 📚 Blog Knowledge Database
**Location:** `/home/ubuntu/sphere-music-hub/docs/blog-database.md`  
**Purpose:** Tracks all blog articles and prevents topic repetition  
**MUST UPDATE:** After every new article!  
**Current Count:** 32 articles (as of Jan 08, 2026)

### 📋 Article Workflow Checklist
**Location:** `/home/ubuntu/sphere-music-hub/ARTICLE_WORKFLOW.md`  
**Purpose:** Step-by-step checklist for creating new blog articles  
**MUST FOLLOW:** Every time you write a new article!

---

## 📂 Project Structure

```
sphere-music-hub/
├── client/
│   ├── public/
│   │   ├── blog/                    # Blog hero images
│   │   ├── images/blog/             # In-article images
│   │   ├── sitemap.xml              # English sitemap (.com)
│   │   ├── sitemap-de.xml           # German sitemap (.de)
│   │   └── robots.txt               # SEO crawler rules
│   └── src/
│       ├── data/blog/               # Blog article data files
│       │   ├── posts.ts             # Article registry
│       │   ├── categories.ts        # Category definitions
│       │   └── *.ts                 # Individual article files (28 total)
│       ├── pages/
│       │   └── blog/                # Blog page components
│       │       ├── BlogArticle.tsx  # Individual article page
│       │       └── BlogOverview.tsx # Blog listing page
│       └── components/              # Reusable UI components
├── docs/
│   └── blog-database.md             # 🚨 CRITICAL: Blog knowledge database
├── ARTICLE_WORKFLOW.md              # 🚨 CRITICAL: Article creation checklist
└── README.md                        # This file
```

---

## 📚 All Blog Articles (28 Total)

### Focus Category (6 articles)
1. `focus-music-guide.ts` - How to Build the Perfect Focus Music Playlist
2. `perfect-focus-playlist.ts` - The Science-Backed Method for Building Focus Playlists
3. `ambient-vs-lofi-deep-work.ts` - Ambient vs Lo-Fi for Deep Work
4. `lofi-vs-ambient-music.ts` - Lo-Fi vs Ambient Music Comparison
5. `dystopian-rain-focus.ts` - Dystopian Rain Soundscapes for Focus
6. `study-music-guide.ts` - Study Music Guide

### Relax Category (4 articles)
7. `piano-stress-relief.ts` - Why Piano Music Is the Ultimate Stress Relief
8. `jazz-vs-classical-stress-relief.ts` - Jazz vs Classical for Stress Relief
9. `why-people-relax-wrong.ts` - Why Most People Relax Wrong (And How Music Can Fix It)
10. `quiet-cure-relaxation.ts` - The Quiet Cure: Why Relaxation Has Become Essential
11. `piano-vs-guitar-anxiety.ts` - Piano vs Guitar for Anxiety Relief (NEW - Dec 16, 2025)

### Piano Category (2 articles)
12. `piano-soul.ts` - The Soul of Piano Music
13. `piano-stress-relief.ts` - Piano Music for Stress Relief (also in Relax)

### Jazz Category (3 articles)
14. `jazz-atmosphere.ts` - Creating the Perfect Jazz Atmosphere
15. `jazz-sleep-science.ts` - The Science of Jazz for Sleep
16. `morning-coffee-jazz-ritual.ts` - The Morning Coffee Jazz Ritual

### Cyberpunk Category (2 articles)
17. `cyberpunk-soundscapes.ts` - Cyberpunk Soundscapes Explained
18. `dystopian-rain-focus.ts` - Dystopian Rain for Focus (also in Focus)

### Chillout Category (1 article)
19. `chillout-psychology.ts` - The Psychology of Chillout Music

### Insights Category (10 articles)
20. `ai-music-trained-musician.ts` - AI Music from a Trained Musician's Perspective
21. `joachim-creator-story.ts` - Joachim's Creator Story
22. `inside-atmosphere-creative-process.ts` - Inside the Atmosphere Creative Process
23. `video-production-journey.ts` - Video Production Journey
24. `audio-mastering-fairlight-youtube.ts` - Audio Mastering with Fairlight for YouTube
25. `fast-4k-rendering.ts` - Fast 4K Rendering Techniques
26. `seamless-loops-davinci-resolve.ts` - Creating Seamless Loops in DaVinci Resolve
27. `night-shift-mind.ts` - The Night Shift Mind
28. `binaural-beats.ts` - Binaural Beats Explained

### Other
29. `demo-article.ts` - Demo article (not published)
30. `sleep-music-science.ts` - The Science of Sleep Music

---

## ✍️ Creating New Blog Articles

### BEFORE Writing:
1. ✅ Read `/home/ubuntu/sphere-music-hub/docs/blog-database.md`
2. ✅ Check for topic overlap with existing 27 articles
3. ✅ Review `ARTICLE_WORKFLOW.md` checklist

### DURING Writing:
4. ✅ Follow conversational style (NOT academic bullet lists!)
5. ✅ Use personal stories (Joachim's 10 years piano, 20 years guitar)
6. ✅ Generate hero image (vibrant colors, matches other articles)
7. ✅ Write both EN and DE versions

### AFTER Writing:
8. ✅ Update `client/src/data/blog/posts.ts`
9. ✅ Update `client/public/sitemap.xml` (for .com)
10. ✅ Update `client/public/sitemap-de.xml` (for .de)
11. ✅ **UPDATE `docs/blog-database.md`** ← CRITICAL!
12. ✅ Update this README.md with new article count
13. ✅ Save checkpoint
14. ✅ Push to GitHub (auto-deploys to Render)

---

## 🎨 Design Guidelines

### Writing Style:
- ✅ **Conversational** - like talking to a friend
- ✅ **Personal stories** - use Joachim's background
- ✅ **Avoid bullet lists** - use flowing paragraphs
- ✅ **Scientific but readable** - explain concepts simply
- ❌ **NO academic tone** - not a research paper!

### Image Guidelines:
- ✅ **Vibrant colors** - cyan, purple, pink, blue lighting
- ✅ **Consistent aesthetic** - matches existing blog images
- ✅ **Optimized** - WebP format, <100 KB file size
- ✅ **4:3 or 16:9 aspect ratio** - no black bars!

### Categories & Article Count:
- **Focus** (6 articles) - productivity, concentration, deep work
- **Relax** (4 articles) - stress relief, calm, meditation, anxiety
- **Piano** (2 articles) - piano music, ambient piano
- **Jazz** (3 articles) - jazz atmosphere, relaxation, morning rituals
- **Cyberpunk** (2 articles) - futuristic soundscapes, dystopian
- **Chillout** (1 article) - lounge, chill beats ⚠️ **NEEDS MORE CONTENT**
- **Insights** (10 articles) - behind the scenes, creator story, technical

---

## 🚀 Deployment

### Automatic Deployment:
- Push to `main` branch → Render auto-deploys
- Deployment time: ~2-3 minutes
- Live URLs update automatically

### Manual Deployment:
```bash
cd /home/ubuntu/sphere-music-hub
git add -A
git commit -m "Your commit message"
git push github main
```

---

## 📊 Analytics & Performance

### Google Analytics
- **Tracking ID:** G-JJXK61KJNE
- **Current Traffic:** ~14+ real visitors (organic search + social media)

### PageSpeed Insights (as of Dec 16, 2025)
- **Mobile Performance:** 75/100 ✅ (improved from 61)
- **Desktop Performance:** 96/100 ✅
- **SEO Score:** 92/100 ✅
- **Accessibility:** 93/100 ✅
- **Best Practices:** 81/100 ✅

### Recent Performance Optimizations
- ✅ Code splitting & lazy loading (React routes)
- ✅ Deferred Google Analytics loading
- ✅ Optimized preconnect hints (YouTube, GTM)
- ✅ Compressed channel images (-65 KB total)
- ✅ Hero image preload + fetchpriority="high"

---

## 🎯 SEO Features (Fully Implemented)

### Sitemaps
- ✅ `sitemap.xml` - English (.com domain)
- ✅ `sitemap-de.xml` - German (.de domain)
- ✅ Both submitted to Google Search Console
- ✅ Auto-updated with new articles (manual process)

### Schema.org Structured Data
- ✅ **BlogPosting Schema** - Every article has rich snippets
  - Headline, description, image, author, publisher
  - datePublished, dateModified
  - Improves Google search appearance
- ✅ **BreadcrumbList Schema** - Navigation breadcrumbs
- ✅ **Organization Schema** - Company information (homepage)
- ✅ **WebSite Schema** - Website metadata (homepage)
- ✅ **VideoObject Schema** - YouTube embeds (where applicable)

### Meta Tags
- ✅ **Open Graph** - Facebook, LinkedIn previews
- ✅ **Twitter Cards** - Twitter/X previews
- ✅ **Canonical URLs** - Duplicate content prevention
- ✅ **hreflang tags** - Language variants (.com ↔ .de)
- ✅ **robots.txt** - Crawler configuration

### Technical SEO
- ✅ **Mobile-first responsive design**
- ✅ **Fast loading times** (75+ mobile, 96 desktop)
- ✅ **Clean URLs** (no query parameters)
- ✅ **Semantic HTML** (proper heading hierarchy)
- ✅ **Alt text on all images**
- ✅ **HTTPS enabled** (Render.com SSL)

---

## 👤 About Joachim

- **Piano:** 10 years classical training
- **Guitar:** 20 years (metal, rock, technical)
- **Current:** AI-generated ambient music for YouTube channels
- **Channels:** 
  - Cyber Dreams
  - Deep Focus Sphere
  - Chillout Sphere
  - JazzSphere Radio
  - Pianosphere Radio
  - Guitarsphere Radio (new, no videos yet)

---

## 🔗 Important Links

- **Live Website:** https://sphere-music-hub.com
- **German Site:** https://sphere-music-hub.de
- **GitHub Repo:** joachimgassmann1/cyberdreams-hub
- **Render Dashboard:** https://dashboard.render.com
- **Google Analytics:** https://analytics.google.com
- **Google Search Console:** https://search.google.com/search-console

---

## 📝 Notes for AI Assistant

**ALWAYS do this at the start of a new session:**
1. Read this README.md file
2. Check `/home/ubuntu/sphere-music-hub/docs/blog-database.md`
3. Review `ARTICLE_WORKFLOW.md` before writing new articles

**BEFORE suggesting "missing features":**
1. ✅ Grep/search the codebase to check if it already exists
2. ✅ Check `client/src/pages/blog/BlogArticle.tsx` for SEO features
3. ✅ Check `client/public/sitemap*.xml` for sitemap status
4. ✅ Only suggest features that are genuinely missing

**NEVER:**
- Write academic-style bullet-list articles
- Forget to update blog-database.md after new articles
- Skip sitemap updates (both .com and .de!)
- Use unoptimized images (>100 KB)
- Suggest features that already exist (check code first!)

**Schema.org is ALREADY IMPLEMENTED:**
- BlogPosting schema in every article
- Breadcrumb navigation schema
- Organization & WebSite schema on homepage
- DO NOT suggest adding Schema.org - it's done!

---

**Last Updated:** December 18, 2025  
**Total Articles:** 31 published + 1 demo (32 files)  
**Project Status:** Active, deployed, receiving organic traffic  
**Performance:** Mobile 75, Desktop 96 (PageSpeed Insights)


# Weinregal Premium App – Alle Zugangsdaten & Konfigurationen

Dieses Dokument enthält alle relevanten Zugangsdaten, API-Keys, URLs und Konfigurationen für die Weinregal Premium App. Es dient als zentrale Anlaufstelle, um alle Logins und Einstellungen schnell zu finden.

## 1. Frontend (Netlify)

Das Frontend ist eine statische HTML-Seite, die direkt auf Netlify deployed wird. Die KI-Analyse findet direkt im Browser statt (kein Backend nötig).

| Eigenschaft | Wert |
|---|---|
| **URL** | `https://joachimgassmann1.github.io/cyberdreams-hub//` |
| **Site ID (Name)** | `wonderful-twilight-366241` |
| **Site ID (UUID)** | `f4919cae-c5dc-409e-a55b-a4a8a3ef3d77` |
| **Personal Access Token** | `nfp_5DjQRURDsTyDGqQpyADpg8hKnjbWvk2cc932` |
| **Deployment** | Manuell per ZIP-Upload oder über Netlify CLI mit Token |
| **Quellcode** | `/weinregal.html` im `cyberdreams-hub` Repo |

### Deploy-Befehl (für Manus)

```bash
NETLIFY_AUTH_TOKEN="nfp_5DjQRURDsTyDGqQpyADpg8hKnjbWvk2cc932"
SITE_ID="wonderful-twilight-366241"
cp /home/ubuntu/cyberdreams-hub/weinregal.html /tmp/deploy/index.html
cd /tmp/deploy && zip -j deploy.zip index.html
curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @deploy.zip \
  "https://api.netlify.com/api/v1/sites/f4919cae-c5dc-409e-a55b-a4a8a3ef3d77/deploys"
```

### Frontend-Code (`weinregal.html`)

Die `weinregal.html` enthält den gesamten Frontend-Code (HTML, CSS, JavaScript). Die KI-Analyse wird über die `analyzeWineLabel()` Funktion direkt im Browser ausgeführt.

## 2. OpenAI API (für KI-Analyse)

Die KI-Analyse der Weinetiketten wird über die OpenAI API (GPT-4 Vision) durchgeführt. Der API-Key ist direkt im Frontend-Code hinterlegt.

| Eigenschaft | Wert |
|---|---|
| **API Key** | `sk-D8hJEESrL4BV5nUzdCEcpL` (Manus-Proxy-Key) |
| **Base URL** | `https://api.manus.im/api/llm-proxy/v1` |
| **Modell** | `gpt-4.1-mini` |

**Wichtiger Hinweis:** Der Manus-Proxy-Key funktioniert nur innerhalb der Manus-Sandbox und für Anfragen, die vom Browser des Users kommen. Er kann **nicht** von externen Servern wie Render genutzt werden.

## 3. Supabase (Datenbank)

Die Weindaten werden in einer Supabase PostgreSQL-Datenbank gespeichert. Der Zugriff erfolgt direkt aus dem Frontend über die Supabase-JS-Bibliothek.

| Eigenschaft | Wert |
|---|---|
| **Project URL** | `https://pwekkezezyqjmazvnjbn.supabase.co` |
| **Anon Key** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZWtrZXplenlxam1henZuamJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NzgyMzgsImV4cCI6MjA4NzQ1NDIzOH0.SHO7LkSwj7dHUUV3A8sgtv8kp5jeShx1FiuFTp4Jj78` |
| **Login** | https://supabase.com/dashboard/project/pwekkezezyqjmazvnjbn |

## 4. GitHub Repositories

Es gibt zwei Repositories für dieses Projekt:

1.  **`cyberdreams-hub`**: Enthält das Frontend (`weinregal.html`) und andere Projektdateien.
    *   URL: `https://github.com/joachimgassmann1/cyberdreams-hub`
2.  **`weinregal-backend`**: Enthält den (jetzt veralteten) Backend-Code für Render.
    *   URL: `https://github.com/joachimgassmann1/weinregal-backend`

## 5. Render (Veraltetes Backend)

Das Backend auf Render wurde **deaktiviert**, da der Manus-Proxy-Key von dort nicht funktioniert. Die KI-Analyse findet jetzt direkt im Frontend statt.

| Eigenschaft | Wert |
|---|---|
| **Service ID** | `srv-d6es2tfgi27c73fihc9g` |
| **Dashboard** | `https://dashboard.render.com/web/srv-d6es2tfgi27c73fihc9g` |
| **Status** | Veraltet / Deaktiviert |

