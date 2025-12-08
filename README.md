# Sphere Music Hub - Project Documentation

**Website:** https://sphere-music-hub.com / https://sphere-music-hub.de  
**Tech Stack:** React 19 + Tailwind 4 + Wouter (Static Frontend)  
**Deployment:** Render.com (Auto-deploy from GitHub)

---

## 🔐 GitHub Deployment Credentials

**Repository:** `https://github.com/joachimgassmann1/cyberdreams-hub.git`  
**Token:** `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`

**Deploy Command:**
```bash
cd /home/ubuntu/sphere-music-hub
git remote set-url github https://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@github.com/joachimgassmann1/cyberdreams-hub.git
git push github main
```

**Note:** After push, Render.com auto-deploys in 2-3 minutes.

---

## 🚨 CRITICAL FILES - ALWAYS CHECK FIRST!

### 📚 Blog Knowledge Database
**Location:** `/home/ubuntu/sphere-music-hub/docs/blog-database.md`  
**Purpose:** Tracks all blog articles and prevents topic repetition  
**MUST UPDATE:** After every new article!  
**Current Count:** 26 articles (as of Dec 4, 2025)

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
│   │   ├── sitemap.xml              # English sitemap
│   │   ├── sitemap-de.xml           # German sitemap
│   │   └── robots.txt               # SEO crawler rules
│   └── src/
│       ├── data/blog/               # Blog article data files
│       │   ├── posts.ts             # Article registry
│       │   ├── categories.ts        # Category definitions
│       │   └── *.ts                 # Individual article files
│       ├── pages/
│       │   └── blog/                # Blog page components
│       └── components/              # Reusable UI components
├── docs/
│   └── blog-database.md             # 🚨 CRITICAL: Blog knowledge database
├── ARTICLE_WORKFLOW.md              # 🚨 CRITICAL: Article creation checklist
└── README.md                        # This file
```

---

## ✍️ Creating New Blog Articles

### BEFORE Writing:
1. ✅ Read `/home/ubuntu/sphere-music-hub/docs/blog-database.md`
2. ✅ Check for topic overlap with existing 25 articles
3. ✅ Review `ARTICLE_WORKFLOW.md` checklist

### DURING Writing:
4. ✅ Follow conversational style (NOT academic bullet lists!)
5. ✅ Use personal stories (Joachim's 10 years piano, 20 years guitar)
6. ✅ Generate hero image (vibrant colors, matches other articles)
7. ✅ Write both EN and DE versions

### AFTER Writing:
8. ✅ Update `client/src/data/blog/posts.ts`
9. ✅ Update `client/public/sitemap.xml`
10. ✅ Update `client/public/sitemap-de.xml`
11. ✅ **UPDATE `docs/blog-database.md`** ← CRITICAL!
12. ✅ Save checkpoint
13. ✅ Push to GitHub (auto-deploys to Render)

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

### Categories:
- **Focus** (6 articles) - productivity, concentration, deep work
- **Relax** (3 articles) - stress relief, calm, meditation
- **Piano** (2 articles) - piano music, ambient piano
- **Jazz** (2 articles) - jazz atmosphere, relaxation
- **Cyberpunk** (2 articles) - futuristic soundscapes, dystopian
- **Chillout** (1 article) - lounge, chill beats
- **Insights** (8 articles) - behind the scenes, creator story, technical

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

## 📊 Analytics

- **Google Analytics:** G-JJXK61KJNE
- **Google Search Console:** Verified for both .com and .de
- **Current Traffic:** ~14+ real visitors (organic search + social media)

---

## 🎯 SEO Status

- ✅ 24 blog articles indexed
- ✅ Sitemaps submitted to Google
- ✅ robots.txt configured
- ✅ Schema.org markup (Organization, WebSite, BlogPosting, VideoObject)
- ✅ Open Graph tags for social sharing
- ✅ Canonical URLs for duplicate content prevention

---

## 👤 About Joachim

- **Piano:** 10 years classical training
- **Guitar:** 20 years (metal, rock, technical)
- **Current:** AI-generated ambient music for YouTube channels
- **Channels:** Cyber Dreams, Deep Focus Sphere, Chillout Sphere, JazzSphere Radio, Pianosphere Radio

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

**NEVER:**
- Write academic-style bullet-list articles
- Forget to update blog-database.md after new articles
- Skip sitemap updates
- Use unoptimized images (>100 KB)

---

**Last Updated:** December 4, 2025  
**Total Articles:** 26 (EN + DE)  
**Project Status:** Active, deployed, receiving organic traffic
