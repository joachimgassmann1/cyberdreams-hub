# Blog Article Creation Workflow - CHECKLIST

**Purpose:** Ensure consistent quality and prevent missing steps when creating new blog articles  
**MUST FOLLOW:** Every single time you write a new article!

---

## ✅ BEFORE Writing (Planning Phase)

### 1. Check Blog Database
- [ ] Read `/home/ubuntu/sphere-music-hub/docs/blog-database.md`
- [ ] Verify topic is NOT already covered (check all 22 existing articles)
- [ ] Identify which category needs more content (Relax, Piano, Jazz have fewer articles)
- [ ] Check "Bereits verwendete Konzepte" section to avoid repetition

### 2. Plan Article Structure
- [ ] Choose article title (descriptive, SEO-friendly)
- [ ] Define slug (lowercase-with-dashes)
- [ ] Select category (focus, relax, piano, jazz, cyberpunk, chillout, insights)
- [ ] List 5-7 tags (SEO keywords)
- [ ] Outline 3-5 main sections (H2 headings)
- [ ] Identify personal story angle (Joachim's 10 years piano, 20 years guitar, etc.)

### 3. Generate Hero Image
- [ ] Use `generate` tool to create vibrant hero image
- [ ] Colors: cyan/purple/pink/blue lighting (matches existing blog aesthetic)
- [ ] Aspect ratio: 4:3 or 16:9 (NO black bars!)
- [ ] Save as WebP format
- [ ] Optimize to <100 KB file size
- [ ] Save to `/home/ubuntu/sphere-music-hub/client/public/blog/[slug]-hero.webp`

---

## ✍️ DURING Writing (Content Creation)

### 4. Write English Version
- [ ] **Conversational tone** - like talking to a friend, NOT academic!
- [ ] **Personal stories** - use Joachim's background (piano, guitar, creator journey)
- [ ] **Flowing paragraphs** - NO bullet lists in main content!
- [ ] **Scientific but readable** - explain concepts simply
- [ ] **1500-2000 words** (8-10 minutes reading time)
- [ ] Strong opening (personal anecdote or surprising statement)
- [ ] 3-5 main sections with H2 headings
- [ ] Practical tips or actionable advice
- [ ] Strong conclusion (reflection or call-to-action)
- [ ] Save to `/home/ubuntu/sphere-music-hub/[slug]-en.md` (temporary)

### 5. Write German Version
- [ ] Translate English version to German
- [ ] Maintain conversational tone in German
- [ ] Adapt idioms and cultural references for German audience
- [ ] Keep same structure and length
- [ ] Save to `/home/ubuntu/sphere-music-hub/[slug]-de.md` (temporary)

### 6. Create Article Data File
- [ ] Create `/home/ubuntu/sphere-music-hub/client/src/data/blog/[slug].ts`
- [ ] Use existing article files as template (e.g., `piano-stress-relief.ts`)
- [ ] Fill in all fields:
  - `id` (unique, lowercase-with-dashes)
  - `title` (English)
  - `titleDe` (German)
  - `slug`
  - `category` (lowercase: 'focus', 'relax', 'piano', 'jazz', etc.)
  - `excerpt` (2-3 sentences, English)
  - `excerptDe` (2-3 sentences, German)
  - `content` (full English markdown)
  - `contentDe` (full German markdown)
  - `heroImage` (path to WebP image)
  - `date` (YYYY-MM-DD format)
  - `readingTime` (calculate: word count ÷ 200 words/min)
  - `tags` (array of 5-7 keywords)
- [ ] Verify category matches `categories.ts` (case-sensitive!)

---

## 📝 AFTER Writing (Integration & Deployment)

### 7. Update Article Registry
- [ ] Open `/home/ubuntu/sphere-music-hub/client/src/data/blog/posts.ts`
- [ ] Import new article: `import { [slug] } from './[slug]';`
- [ ] Add to `allPosts` array (at the top for newest first)
- [ ] Verify no syntax errors

### 8. Update Sitemaps
- [ ] Open `/home/ubuntu/sphere-music-hub/client/public/sitemap.xml`
- [ ] Add new `<url>` entry for English article
- [ ] Include:
  - `<loc>https://sphere-music-hub.com/blog/[slug]</loc>`
  - `<lastmod>[YYYY-MM-DD]</lastmod>`
  - `<xhtml:link rel="alternate" hreflang="de" href="https://sphere-music-hub.de/blog/[slug]"/>`
  - `<xhtml:link rel="alternate" hreflang="en" href="https://sphere-music-hub.com/blog/[slug]"/>`
- [ ] Open `/home/ubuntu/sphere-music-hub/client/public/sitemap-de.xml`
- [ ] Add new `<url>` entry for German article
- [ ] Include:
  - `<loc>https://sphere-music-hub.de/blog/[slug]</loc>`
  - `<lastmod>[YYYY-MM-DD]</lastmod>`
  - `<xhtml:link rel="alternate" hreflang="en" href="https://sphere-music-hub.com/blog/[slug]"/>`
  - `<xhtml:link rel="alternate" hreflang="de" href="https://sphere-music-hub.de/blog/[slug]"/>`

### 9. 🚨 UPDATE BLOG DATABASE (CRITICAL!)
- [ ] Open `/home/ubuntu/sphere-music-hub/docs/blog-database.md`
- [ ] Add new article entry with:
  - Article number (sequential)
  - Title
  - Slug
  - Datei (filename)
  - Datum (date)
  - Tags
  - Kernthemen (core themes)
  - Unique angles or personal elements
- [ ] Update "Stand" date (current date)
- [ ] Update "Artikel" count (increment by 1)
- [ ] Add new concepts to "Bereits verwendete Konzepte" section
- [ ] Update category distribution statistics
- [ ] Save file

### 10. Save Checkpoint
- [ ] Use `webdev_save_checkpoint` tool
- [ ] Descriptive message: "Add article #[number]: [title]"
- [ ] Include key details in description (category, main theme, personal elements)

### 11. Deploy to Production
- [ ] Commit to Git: `git add -A && git commit -m "Add article: [title]"`
- [ ] Push to GitHub: `git push github main`
- [ ] Wait 2-3 minutes for Render auto-deployment
- [ ] Verify article appears on live website

---

## 🎯 Quality Checklist (Before Publishing)

### Content Quality:
- [ ] No bullet lists in main content (only in practical tips sections if needed)
- [ ] Conversational, not academic tone
- [ ] Personal stories included (Joachim's background)
- [ ] Scientific concepts explained simply
- [ ] 1500-2000 words (8-10 min reading time)
- [ ] Both EN and DE versions complete

### Technical Quality:
- [ ] Hero image optimized (<100 KB WebP)
- [ ] No black bars on images
- [ ] Category matches `categories.ts` exactly (case-sensitive!)
- [ ] All links work (YouTube videos, internal links)
- [ ] Reading time calculated correctly
- [ ] Date in YYYY-MM-DD format

### SEO Quality:
- [ ] Title is descriptive and keyword-rich
- [ ] Slug is SEO-friendly (lowercase-with-dashes)
- [ ] 5-7 relevant tags included
- [ ] Excerpt is compelling (2-3 sentences)
- [ ] Sitemaps updated for both languages

### Database Quality:
- [ ] Blog database updated with new article
- [ ] "Bereits verwendete Konzepte" section updated
- [ ] Category distribution statistics updated
- [ ] No topic repetition with existing articles

---

## 🚫 Common Mistakes to Avoid

- ❌ **Forgetting to update blog database** (most common mistake!)
- ❌ Writing academic-style bullet-list articles
- ❌ Using unoptimized images (>100 KB)
- ❌ Case mismatch in category (e.g., "Focus" vs. "focus")
- ❌ Forgetting to update sitemaps
- ❌ Not including personal stories
- ❌ Repeating topics already covered
- ❌ Skipping German translation
- ❌ Black bars on images
- ❌ Not saving checkpoint before deployment

---

## 📊 Article Count by Category (Current: 22 total)

- **Focus:** 6 articles ✅
- **Insights:** 8 articles ✅
- **Relax:** 2 articles ⚠️ (needs more!)
- **Piano:** 2 articles ⚠️ (needs more!)
- **Jazz:** 1 article ⚠️ (needs more!)
- **Cyberpunk:** 2 articles ✅
- **Chillout:** 1 article ⚠️

**Priority:** Write next article for Relax, Piano, or Jazz category!

---

## 🎯 Recommended Next Articles

1. **"Evening Wind-Down Routine with Chillout Music"** (Relax) - High SEO potential
2. **"Classical Piano vs. Ambient Piano for Focus"** (Piano) - Uses Joachim's expertise
3. **"Sunday Morning Jazz: Why Slow Mornings Need Smooth Music"** (Jazz) - Complements Morning Coffee article

---

**Last Updated:** November 30, 2025  
**Next Article:** TBD
