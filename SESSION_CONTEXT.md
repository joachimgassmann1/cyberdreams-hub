# SESSION_CONTEXT.md — Sphere Music Hub
**Letzte Aktualisierung:** 27. Mai 2026  
**Repository:** `https://github.com/joachimgassmann1/cyberdreams-hub.git`  
**Live-Website:** `https://www.sphere-music-hub.com` (EN) + `https://www.sphere-music-hub.de` (DE)

---

## ⚡ SOFORT-SETUP FÜR JEDE NEUE SESSION

```bash
# 1. Repository klonen
gh repo clone joachimgassmann1/cyberdreams-hub
cd cyberdreams-hub
git pull origin main

# 2. .env Datei erstellen (IMMER nötig — steht nicht im Repo!)
cat > .env << 'EOF'
VITE_YOUTUBE_API_KEY=AIzaSyCqPitQCen49c6soCnEwYMni9gA3G9aYWc
VITE_ANALYTICS_WEBSITE_ID=5fe939ca-a3f9-403d-b1d1-6d358c008cac
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_APP_ID=nbg9ea9tCT3T5YUgNvKDXF
VITE_FRONTEND_FORGE_API_KEY=MaSdVVw8PZVsweQB8BcmWX
VITE_FRONTEND_FORGE_API_URL=https://forge.butterfly-effect.dev
VITE_APP_TITLE=Sphere Music Hub
EOF

# 3. Abhängigkeiten installieren
pnpm install

# 4. Dokumentation lesen
# README.md → Übersicht
# SESSION_CONTEXT.md → Diese Datei (vollständiger Projektstand)
# ARTICLE_WORKFLOW.md → Nur wenn neue Artikel erstellt werden
# docs/blog-database.md → Nur wenn neue Artikel erstellt werden
```

---

## 🚨 ABSOLUTE VERBOTE — NIEMALS MACHEN

1. **NIEMALS ein CMS einrichten** (Keystatic, Contentlayer, Sanity, Strapi etc.) — hat die Website bereits einmal komplett zerstört!
2. **NIEMALS SSR aktivieren** — nur SSG (`output: 'static'` in astro.config.mjs). Niemals ändern!
3. **NIEMALS den Astro output mode ändern** in astro.config.mjs
4. **NIEMALS force-push** (`git push --force`) ohne vorherige Absprache
5. **NIEMALS CookieBanner in AppProviders.tsx oder App.tsx** — nur in `src/layouts/Layout.astro`
6. **NIEMALS `pnpm run build` überspringen** — immer vor dem Push testen!
7. **NIEMALS neue npm/pnpm Pakete ohne Absprache installieren** — kann Build brechen

---

## 🏗️ Tech Stack & Architektur

| Bereich | Technologie | Version |
|---|---|---|
| Framework | Astro (SSG) | 5.x |
| Frontend | React + TypeScript | 19.x |
| Styling | Tailwind CSS v4 + shadcn/ui | 4.x |
| Build Tool | Vite | — |
| Package Manager | pnpm | — |
| Deployment | Render.com (Auto-deploy bei Push auf `main`) | — |
| Fonts | Inter + Poppins (Google Fonts, lazy loaded) | — |

**Deployment-Flow:** Push auf `main` → GitHub → Render.com baut automatisch → Live in 2-3 Min.

**Build-Befehl auf Render:** `pnpm run build`  
**Publish Directory:** `dist`

---

## 📂 Projektstruktur (vollständig)

```
cyberdreams-hub/
├── src/                              # Astro-Seiten und Layouts
│   ├── layouts/
│   │   └── Layout.astro              # ⚠️ CookieBanner NUR HIER! Globales Layout.
│   └── pages/
│       ├── index.astro               # Homepage
│       ├── blog/
│       │   └── [slug].astro          # Dynamische Blog-Artikel-Seiten
│       ├── impressum.astro           # Impressum (URL: /impressum — NICHT /imprint!)
│       └── datenschutz.astro         # Datenschutz (URL: /datenschutz — NICHT /privacy!)
├── client/                           # React-Anwendung
│   ├── src/
│   │   ├── components/               # React-Komponenten
│   │   │   ├── Navigation.tsx        # Navbar mit Theme-Toggle
│   │   │   ├── Hero.tsx              # Homepage Hero-Section
│   │   │   ├── Channels.tsx          # Kanal-Karten (inkl. "Coming Soon" Badge)
│   │   │   ├── FeaturedVideos.tsx    # 6 Featured Videos auf Homepage
│   │   │   ├── BlogTeaser.tsx        # Blog-Vorschau auf Homepage
│   │   │   ├── Footer.tsx            # Footer
│   │   │   ├── CookieBanner.tsx      # Cookie-Banner (wird in Layout.astro eingebunden)
│   │   │   ├── AppProviders.tsx      # ⚠️ Theme + Analytics — KEIN CookieBanner hier!
│   │   │   └── OptimizedImage.tsx    # ⚠️ Stateless! Kein useState/useEffect!
│   │   ├── pages/
│   │   │   └── blog/
│   │   │       ├── BlogArticle.tsx   # Einzelner Artikel (HTML+Markdown, Video-Embed)
│   │   │       └── BlogOverview.tsx  # Blog-Übersicht mit Suche + Kategorie-Filter
│   │   ├── data/
│   │   │   └── blog/
│   │   │       ├── types.ts          # BlogPost Interface
│   │   │       ├── categories.ts     # Kategorien (IDs IMMER kleingeschrieben!)
│   │   │       ├── posts.ts          # Alle Artikel importiert + exportiert
│   │   │       └── *.ts              # Einzelne Artikel-Dateien (36 Stück)
│   │   ├── contexts/                 # React Contexts (Theme, MusicPlayer)
│   │   └── index.css                 # ⚠️ Tailwind + Typography Plugin (@plugin "@tailwindcss/typography")
│   └── public/
│       ├── sitemap.xml               # EN Sitemap (.com) — 40 URLs
│       ├── sitemap-v2.xml            # EN Sitemap v2 (identisch, für GSC eingereicht)
│       ├── sitemap-de.xml            # DE Sitemap (.de) — 40 URLs
│       ├── sitemap-de-v2.xml         # DE Sitemap v2 (identisch, für GSC eingereicht)
│       ├── robots.txt                # Verweist auf sitemap-v2.xml + sitemap-de-v2.xml
│       ├── blog-images/              # Lokale Blog-Hero-Bilder (WebP)
│       ├── channel-*.webp            # Kanal-Bilder (400w + 700w Varianten)
│       ├── hero-bg.webp              # Homepage Hero-Hintergrundbild
│       ├── logo-48.webp              # Logo
│       └── favicon.ico + *.png       # Favicons
├── public/                           # Astro Public Assets (root-level)
├── astro.config.mjs                  # ⚠️ NIEMALS output mode ändern!
├── render.yaml                       # Render.com Deployment-Konfiguration
├── .env                              # ⚠️ NICHT im Repo! Muss jede Session neu erstellt werden
├── CREDENTIALS_BACKUP.md             # ⚠️ NICHT im Repo! Lokal in Sandbox
├── SESSION_CONTEXT.md                # Diese Datei
├── ARTICLE_WORKFLOW.md               # Workflow für neue Blog-Artikel
├── README.md                         # Projekt-Übersicht
└── docs/
    └── blog-database.md              # ⚠️ KRITISCH: Blog-Datenbank (bei neuen Artikeln updaten!)
```

---

## 🔑 Credentials & API-Keys

**.env Inhalt (muss jede Session neu erstellt werden):**
```
VITE_YOUTUBE_API_KEY=AIzaSyCqPitQCen49c6soCnEwYMni9gA3G9aYWc
VITE_ANALYTICS_WEBSITE_ID=5fe939ca-a3f9-403d-b1d1-6d358c008cac
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_APP_ID=nbg9ea9tCT3T5YUgNvKDXF
VITE_FRONTEND_FORGE_API_KEY=MaSdVVw8PZVsweQB8BcmWX
VITE_FRONTEND_FORGE_API_URL=https://forge.butterfly-effect.dev
VITE_APP_TITLE=Sphere Music Hub
```

**Google Analytics:** `G-JJXK61KJNE` (in Layout.astro, lazy loaded)  
**Google Search Console Verification:** `q1xeuuYyjgx3E35Apdhy2uqvTixkPHzKN97sYpE0X7M`  
**Kontakt-E-Mail:** `stillcybervisions@gmail.com`

---

## 🎬 YouTube-Kanäle (vollständig)

| Kanal | Handle | Channel-ID | Abonnenten | Status |
|---|---|---|---|---|
| Deep Focus Sphere | @DeepFocusSphere67 | UCWJCgh3eJ_mILLwZ4--snpA | 2.7K | ✅ Aktiv |
| Chillout Sphere | @ChilloutSphere67 | UCuQPvy0FcB8EG5kKpvZfUjw | 869 | ✅ Aktiv |
| Cyber Dreams | @CyberDreams-x9p | UCnLlBi5GoE7YFQHB-KmKe2Q | 173 | ✅ Aktiv |
| JazzSphere Radio | @JazzSphereRadio | UC7JVkI8IrHqYxg4LB9jPVhg | 1.2K | ✅ Aktiv |
| Pianosphere Radio | @PianosphereRadio | UCZlHnzC_oYrU9zJGxJQYbSw | 2 | ✅ Aktiv |
| Guitarsphere Radio | @GuitarsphereRadio | UCiN4bH-VKz1YMvvYnRJXwOw | 0 | ⚠️ Leer — "Coming Soon" Badge |

**Guitarsphere Radio:** Hat noch keine Videos. Zeigt "Coming Soon" Badge auf der Channels-Seite. Badge entfernen wenn Kanal live geht: `comingSoon: true` in `Channels.tsx` löschen.

---

## 🎥 Featured Videos auf der Homepage (FeaturedVideos.tsx)

Aktueller Stand (27. Mai 2026):

| Video-ID | Titel | Kanal |
|---|---|---|
| `ZLV_qi22E40` | Post-Apocalyptic Cyborg \| Immersive Dystopian Atmosphere for Coding | Cyber Dreams |
| `XCh88UzbssA` | Chill Piano Escapes – Cozy Melodies to Unwind | Pianosphere Radio |
| `0SoN3A2wi8Q` | Beach Bar Chillout Music \| Smooth Tropical Lounge Music for Sunset Vibes | Chillout Sphere |
| `WrUw5iL2J3A` | Deep Work Soundscape – Stay Focused for Hours with Cozy Office Vibes | Deep Focus Sphere |
| `xPjrkMmZElw` | Deep Focus Vibes: The Ultimate Study Music Mix | Deep Focus Sphere |
| `P1TYNvGsFeY` | Soulful Jazz in a Midnight Palace \| A Candlelit Performance | JazzSphere Radio |

**Videos tauschen:** In `client/src/components/FeaturedVideos.tsx` die `id` und `title` im `FEATURED_VIDEOS`-Array ändern.

---

## 📚 Blog-Artikel (36 Stück — Stand 2. Juni 2026)

### 36. The Evening Wind-Down Routine: How to Tell Your Brain the Workday Is Over (Relax)
- **Slug:** `evening-wind-down-routine-brain-workday-over`
- **Datei:** `client/src/data/blog/evening-wind-down-routine.ts`
- **Datum:** 2026-06-02
- **Fokus:** Praktische Abendroutine zum Herunterfahren nach der Arbeit mit Chillout Sphere, optional Pianosphere Radio und JazzSphere Radio.
- **Stil:** Nützlich, humorvoll, alltagsnah; keine reine Faktenliste, sondern konkrete Relax-Anwendung mit natürlicher Kanal-Verbindung.

### Kategorien-Übersicht
| Kategorie | Anzahl | Status |
|---|---|---|
| focus | 9 | ✅ |
| insights | 8 | ✅ |
| jazz | 4 | ✅ |
| relax | 5 | ✅ |
| cyberpunk | 3 | ✅ |
| chillout | 2 | ⚠️ Braucht mehr Content |
| piano | 2 | ⚠️ Braucht mehr Content |

### Vollständige Artikel-Liste

| Datei | Kategorie | Video-ID | Kanal |
|---|---|---|---|
| ai-music-trained-musician | insights | — | — |
| ambient-vs-lofi-deep-work | focus | 37apvxW6nh8 | Deep Focus Sphere |
| audio-mastering-fairlight-youtube | insights | — | — |
| binaural-beats | focus | bobz8Xt8Ua0 | Deep Focus Sphere |
| brain-reset-burnout | relax | mrYA_C4mRIg | Chillout Sphere |
| chillout-psychology | chillout | xX_6Afj7LKE | Chillout Sphere |
| cinematic-ambient-focus | focus | TKgSbDoaB9I | Cyber Dreams |
| coding-in-the-matrix | cyberpunk | HTg3cwUZjGY | Cyber Dreams |
| cyberpunk-soundscapes | cyberpunk | cdbdqx60K2Y | Cyber Dreams |
| dystopian-rain-focus | cyberpunk | cre-smGaoEs | Cyber Dreams |
| fast-4k-rendering | insights | — | — |
| focus-music-guide | focus | P6trWTSjOTQ | Deep Focus Sphere |
| harvard-study-music | focus | eAiDX4hSThE | Deep Focus Sphere |
| inside-atmosphere-creative-process | insights | — | — |
| jazz-atmosphere | jazz | nVgywnu7znI | JazzSphere Radio |
| jazz-brain-focus | jazz | QrphP6lfD7Y | JazzSphere Radio |
| jazz-sleep-science | jazz | Q3as1J9PXg0 | JazzSphere Radio |
| jazz-vs-classical-stress-relief | jazz | EnL1AHG09wY | JazzSphere Radio |
| joachim-creator-story | insights | — | — |
| lofi-vs-ambient-music | focus | xPjrkMmZElw | Deep Focus Sphere |
| morning-coffee-jazz-ritual | insights | ZaxoVb4Y9h8 | JazzSphere Radio |
| night-shift-mind | focus | jBkCFxaKxGw | Deep Focus Sphere |
| perfect-focus-playlist | focus | ADZvL5c3ME8 | Deep Focus Sphere |
| piano-soul | piano | Tx6LKwnhHUQ | Pianosphere Radio |
| piano-stress-relief | piano | 0T4XDHO7pfA | Pianosphere Radio |
| piano-vs-guitar-anxiety | relax | cV3fm4Mi5qg | Pianosphere Radio |
| pomodoro-playlist-music | focus | Si2N3kzW-w8 | Deep Focus Sphere |
| quiet-cure-relaxation | relax | nZzteuCoYn0 | Chillout Sphere |
| seamless-loops-davinci-resolve | insights | — | — |
| silence-anxiety | insights | XLm9OxhczEg | Pianosphere Radio |
| sleep-music-science | relax | dRc4Fi1YKUM | Pianosphere Radio |
| study-music-guide | focus | uw6H-ZpniqA | Deep Focus Sphere |
| sunset-effect-chillout | chillout | sI3pGdr2dmk | Chillout Sphere |
| video-production-journey | insights | — | — |
| why-people-relax-wrong | relax | Tw_odHzPML0 | Chillout Sphere |

---

## 🖼️ Bilder & Design-Richtlinien

### Hero-Bilder für Blog-Artikel
- **Format:** WebP
- **Größe:** UNTER 100 KB (kritisch!)
- **Farben:** Cyan / Purple / Pink / Blue Lighting
- **Stil:** Dark / Moody / Cyberpunk / Neon
- **NIEMALS:** Helles Tageslicht, generische Stock-Fotos, bunte Farben
- **Seitenverhältnis:** 4:3 oder 16:9 (keine schwarzen Balken!)
- **Speicherort:** `client/public/blog-images/[slug]-hero.webp`

### Lokale Blog-Bilder (in /blog-images/)
```
ambient-soundscapes-hero.webp         (Blog-Hero-Hintergrund)
cyberpunk-futuristic-soundscapes-hero.webp
fast-4k-rendering-davinci-resolve-hero.webp
focus-music-productivity-hero.webp
inside-atmosphere-creative-process-hero.webp
jazz-atmosphere-warm-acoustic-hero.webp
joachim-creator-story-hero.webp
productivity-hacks-hero.webp
psychology-chillout-music-hero.webp
quiet-cure-relaxation-essential-skill-hero.webp
soul-of-piano-ambience-hero.webp
ultimate-guide-focus-music-hero.webp
```

### Kanal-Bilder (in /public/)
Jeder Kanal hat 3 Varianten: `channel-[name]-new.webp`, `channel-[name]-new-400.webp`, `channel-[name]-new-700.webp`

---

## 🔍 SEO-Konfiguration

### Sitemaps
| Datei | Domain | URLs | Status |
|---|---|---|---|
| `sitemap.xml` | sphere-music-hub.com | 40 | ✅ Live |
| `sitemap-v2.xml` | sphere-music-hub.com | 40 | ✅ Live (in GSC eingereicht) |
| `sitemap-de.xml` | sphere-music-hub.de | 40 | ✅ Live |
| `sitemap-de-v2.xml` | sphere-music-hub.de | 40 | ✅ Live (in GSC eingereicht) |

**robots.txt** verweist auf `sitemap-v2.xml` und `sitemap-de-v2.xml` — diese sind live und erreichbar.

### Wichtige URLs
- `/impressum` (NICHT `/imprint`)
- `/datenschutz` (NICHT `/privacy`)

### Schema.org
Implementiert: `BlogPosting`, `BreadcrumbList`, `Organization`, `WebSite`, `VideoObject`

### Open Graph & Twitter Cards
Implementiert in `Layout.astro` und `BlogArticle.tsx`

### Google Analytics
ID: `G-JJXK61KJNE` — lazy loaded nach `window.load` Event (Performance-Optimierung)

### hreflang
Implementiert in Sitemaps. `.com` = EN, `.de` = DE.

---

## 🎨 Design-System

### Farben (Dark Mode Standard)
- **Primary:** Cyan/Teal (`--primary`)
- **Accent:** Lila/Purple (`--accent`)
- **Background:** Sehr dunkles Blau-Schwarz
- **Foreground:** Fast Weiß
- **⚠️ `--primary-foreground` im Dark Mode = Weiß** — nicht ändern! (Button-Text)

### Fonts
- **Headings:** Poppins (600, 700, 800)
- **Body:** Inter (300, 400, 500, 600, 700, 800)

### Blog-Hero Overlay (BlogOverview.tsx)
- Primärer Overlay: `bg-background/50` (50% — aufgehellt am 5. April 2026)
- Gradient: `from-background/20 via-transparent to-background`

---

## 📝 Blog-Artikel erstellen (Kurzanleitung)

1. `docs/blog-database.md` lesen — Themen-Überschneidungen prüfen
2. `ARTICLE_WORKFLOW.md` lesen — vollständige Checkliste
3. Artikel-Datei erstellen: `client/src/data/blog/[slug].ts`
4. In `client/src/data/blog/posts.ts` importieren
5. Beide Sitemaps updaten: `sitemap.xml` + `sitemap-de.xml` (und v2-Versionen!)
6. `docs/blog-database.md` updaten
7. `README.md` Artikel-Zähler updaten
8. `pnpm run build` testen
9. Pushen

**BlogPost Interface (types.ts):**
```typescript
{
  slug: string;           // lowercase-with-dashes
  title: string;          // EN
  titleDe?: string;       // DE
  description: string;    // EN (max 155 Zeichen für SEO!)
  descriptionDe?: string; // DE
  content: string;        // HTML oder Markdown (automatisch erkannt)
  contentDe?: string;
  heroImage: string;      // URL oder /blog-images/...
  category: string;       // ⚠️ IMMER kleingeschrieben: 'focus','relax','jazz','piano','cyberpunk','chillout','insights'
  tags: string[];
  tagsDe?: string[];
  author: string;
  publishDate: string;    // 'YYYY-MM-DD'
  readingTime: number;
  featured?: boolean;
  videoId?: string;       // YouTube Video-ID (optional)
  videoTitle?: string;
  videoChannel?: string;
}
```

---

## 🚀 Deployment-Workflow

```bash
# Standard
pnpm run build          # IMMER zuerst testen!
git add -A
git commit -m "feat/fix/chore: Beschreibung"
git push origin main    # Render deployed automatisch in 2-3 Min

# Deployment erzwingen (falls Render hängt)
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

---

## 👤 Über Joachim (für Blog-Artikel-Stil)

- **Piano:** 10 Jahre klassisches Training
- **Gitarre:** 20 Jahre (Metal, Rock, Technical)
- **Aktuell:** KI-generierte Ambient-Musik für YouTube-Kanäle
- **Schreibstil:** Konversationell — wie mit einem Freund reden, NICHT akademisch
- **Persönliche Geschichten:** Immer einbauen (Piano-Hintergrund, Gitarren-Erfahrung, Creator-Journey)
- **Keine Bullet-Listen** im Haupttext — fließende Absätze

---

## 📊 Performance-Werte (Stand April 2026)

| Metrik | Score |
|---|---|
| Mobile PageSpeed | 75/100 |
| Desktop PageSpeed | 96/100 |
| SEO Score | 92/100 |
| Accessibility | 93/100 |

---

## 🔗 Wichtige Links

| Link | URL |
|---|---|
| Live-Website EN | https://www.sphere-music-hub.com |
| Live-Website DE | https://www.sphere-music-hub.de |
| GitHub Repository | https://github.com/joachimgassmann1/cyberdreams-hub |
| Render Dashboard | https://dashboard.render.com |
| Google Search Console | https://search.google.com/search-console |
| Google Analytics | https://analytics.google.com |

---

## 📋 Bekannte Probleme & Lösungen

| Problem | Ursache | Lösung |
|---|---|---|
| Blog-Bilder flackern | useState in OptimizedImage | `OptimizedImage.tsx` ist stateless — NICHT ändern! |
| HTML-Tags im Blog sichtbar | Falsches Rendering | BlogArticle.tsx erkennt automatisch HTML vs Markdown |
| Kategorie-Badge fehlt | Großschreibung in `category` | `category` IMMER kleingeschrieben: `'jazz'` nicht `'Jazz'` |
| Button-Text unsichtbar | Dark Mode CSS | `--primary-foreground` = Weiß im Dark Mode — nicht ändern! |
| Doppeltes Cookie-Banner | CookieBanner in AppProviders | CookieBanner NUR in `Layout.astro` |
| Render deployed nicht | Push ohne Änderung | Leeren Commit pushen: `git commit --allow-empty` |
| Build schlägt fehl | Fehlende .env | `.env` Datei neu erstellen (Credentials oben) |

