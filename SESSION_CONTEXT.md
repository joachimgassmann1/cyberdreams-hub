# SESSION_CONTEXT.md — Sphere Music Hub
**Letzte Aktualisierung:** 05. April 2026  
**Repository:** `https://github.com/joachimgassmann1/cyberdreams-hub.git`  
**Live-Website:** `https://www.sphere-music-hub.com` (COM) + `https://www.sphere-music-hub.de` (DE)

---

## 1. Erste Schritte für jede neue Session

```bash
# 1. Repository klonen (falls nicht vorhanden)
gh repo clone joachimgassmann1/cyberdreams-hub
cd cyberdreams-hub

# 2. Auf neuesten Stand bringen
git pull origin main

# 3. .env Datei erstellen (Credentials aus CREDENTIALS_BACKUP.md lesen)
# VITE_YOUTUBE_API_KEY, VITE_ANALYTICS_WEBSITE_ID, VITE_APP_ID, etc.

# 4. Abhängigkeiten installieren
pnpm install

# 5. Dokumentation lesen
# README.md, docs/blog-database.md, ARTICLE_WORKFLOW.md, SESSION_CONTEXT.md (diese Datei)
```

---

## 2. Tech Stack

| Bereich | Technologie |
|---|---|
| Framework | **Astro 5** (SSG — Static Site Generation) |
| Frontend | **React 19** + TypeScript |
| Styling | **Tailwind CSS v4** + shadcn/ui |
| Build Tool | Vite |
| Package Manager | pnpm |
| Deployment | **Render.com** (Auto-deploy bei Push auf `main`) |
| Hosting | Render.com (Static Site) |

**WICHTIG:** Die Website ist eine **vollständige SSG** — kein Server-Side Rendering, kein CMS, kein Keystatic. Jeder Versuch ein CMS einzurichten hat die Website zerstört. Niemals ein CMS einrichten!

---

## 3. Projektstruktur

```
cyberdreams-hub/
├── src/                          # Astro-Seiten und Layouts
│   ├── layouts/Layout.astro      # Globales Layout (enthält CookieBanner!)
│   ├── pages/                    # Astro-Seiten (.astro Dateien)
│   └── components/               # Astro-Komponenten
├── client/                       # React-Anwendung
│   ├── src/
│   │   ├── components/           # React-Komponenten
│   │   ├── pages/                # React-Seiten-Komponenten
│   │   │   └── blog/
│   │   │       ├── BlogArticle.tsx   # Einzelner Blog-Artikel
│   │   │       └── BlogOverview.tsx  # Blog-Übersicht
│   │   ├── data/
│   │   │   └── blog/
│   │   │       ├── types.ts          # BlogPost Interface
│   │   │       ├── posts.ts          # Alle Blog-Posts importiert
│   │   │       └── *.ts              # Einzelne Blog-Artikel-Dateien
│   │   ├── contexts/             # React Contexts (ThemeContext etc.)
│   │   ├── index.css             # Globales CSS + Tailwind + Typography Plugin
│   │   └── AppProviders.tsx      # React Provider (KEIN CookieBanner hier!)
│   └── public/
│       ├── sitemap.xml           # COM Sitemap (39 URLs)
│       ├── sitemap-de.xml        # DE Sitemap (39 URLs)
│       ├── robots.txt            # Verweist auf sitemap-v2.xml
│       └── blog-images/          # Lokale Blog-Bilder
├── public/                       # Astro Public Assets
│   └── hero-bg.webp              # Homepage Hero-Bild
├── astro.config.mjs              # Astro-Konfiguration
├── render.yaml                   # Render.com Deployment-Konfiguration
├── CREDENTIALS_BACKUP.md         # API-Keys (NICHT auf GitHub!)
├── ARTICLE_WORKFLOW.md           # Workflow für neue Blog-Artikel
└── docs/
    └── blog-database.md          # Blog-Datenbank-Dokumentation
```

---

## 4. Kritische Architektur-Entscheidungen

### CookieBanner — NUR in Layout.astro!
```
Layout.astro → CookieBanner (einzige Instanz)
AppProviders.tsx → KEIN CookieBanner (wurde entfernt, da es sonst doppelt erscheint)
```

### Blog-Content-Rendering
Blog-Artikel können HTML oder Markdown enthalten. `BlogArticle.tsx` erkennt das automatisch:
```tsx
{displayContent.trimStart().startsWith('<') ? (
  <div dangerouslySetInnerHTML={{ __html: displayContent }} />
) : (
  <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayContent}</ReactMarkdown>
)}
```

### Tailwind Typography Plugin
Aktiviert in `client/src/index.css`:
```css
@plugin "@tailwindcss/typography";
```
Ohne diesen Eintrag haben Überschriften und Absätze in Blog-Artikeln keine Abstände!

### Dark Mode
- Standard: Dark Mode (Klasse `dark` auf `<html>`)
- `--primary-foreground` im Dark Mode: `oklch(0.98 0 0)` (Weiss) — für lesbare Button-Texte
- Theme-Toggle in der Navigation

---

## 5. Blog-System

### BlogPost Interface (types.ts)
```typescript
interface BlogPost {
  slug: string;
  title: string;
  titleDe?: string;
  description: string;
  descriptionDe?: string;
  content: string;           // HTML oder Markdown
  contentDe?: string;
  heroImage: string;         // URL (CloudFront oder /blog-images/...)
  category: string;          // KLEINBUCHSTABEN: 'focus', 'relax', 'jazz', 'piano', 'cyberpunk', 'insights'
  tags: string[];
  tagsDe?: string[];
  author: string;
  publishDate: string;       // 'YYYY-MM-DD'
  readingTime: number;
  featured?: boolean;
  videoId?: string;          // YouTube Video-ID (optional)
  videoTitle?: string;
  videoChannel?: string;
}
```

**WICHTIG:** `category` muss **kleingeschrieben** sein! Falsche Schreibweise (`'Jazz'` statt `'jazz'`) führt dazu dass der Kategorie-Badge nicht angezeigt wird.

### Neuen Artikel hinzufügen
1. Neue Datei in `client/src/data/blog/mein-artikel.ts` erstellen
2. In `client/src/data/blog/posts.ts` importieren und zum `blogPosts`-Array hinzufügen
3. In `client/public/sitemap.xml` und `client/public/sitemap-de.xml` eintragen
4. Build testen: `pnpm run build`
5. Pushen: `git add -A && git commit -m "feat: add blog article" && git push origin main`

---

## 6. YouTube-Videos

### Kanal-Übersicht
| Kanal | Handle | Thema |
|---|---|---|
| Deep Focus Sphere | @DeepFocusSphere | Fokusmusik, Ambient für Arbeit/Studium |
| Chillout Sphere | @ChilloutSphere | Entspannung, Lounge, Relax |
| Cyber Dreams | @CyberDreams | Cyberpunk, Dark Ambient, Coding |
| JazzSphere Radio | @JazzSphereRadio | Jazz, Soul, Smooth Jazz |
| Pianosphere Radio | @PianosphereRadio | Piano, Klassik, Akustik |

### Video-Embed in Blog-Artikeln
Videos werden am Ende des Artikels (vor den Tags) als "🎧 Listen While You Read"-Sektion eingebettet.

**Format in der Artikel-Datei:**
```typescript
videoId: 'VIDEO_ID_HIER',
videoTitle: 'Vollständiger Video-Titel',
videoChannel: 'Kanal-Name',
```

### Artikel mit Video (28 von 40)
| Slug | Video-ID | Kanal |
|---|---|---|
| ultimate-guide-focus-music-productivity | P6trWTSjOTQ | Deep Focus Sphere |
| best-study-music-harvard-neuroscience | eAiDX4hSThE | Deep Focus Sphere |
| study-music-guide-what-science-says-works | uw6H-ZpniqA | Deep Focus Sphere |
| how-to-build-perfect-focus-music-playlist-science-backed-method | ADZvL5c3ME8 | Deep Focus Sphere |
| lofi-vs-ambient-music-focus-study | xPjrkMmZElw | Deep Focus Sphere |
| binaural-beats-science-focus-meditation | bobz8Xt8Ua0 | Deep Focus Sphere |
| night-shift-mind-late-evening-focus-creativity | jBkCFxaKxGw | Deep Focus Sphere |
| why-ambient-music-works-better-than-lofi-for-deep-work | 37apvxW6nh8 | Deep Focus Sphere |
| pomodoro-playlist-music-focus | Si2N3kzW-w8 | Deep Focus Sphere |
| 20-minute-brain-reset-soundscapes-prevent-burnout | mrYA_C4mRIg | Chillout Sphere |
| psychology-chillout-music-calm-soundscapes-stress-reduction | xX_6Afj7LKE | Chillout Sphere |
| quiet-cure-why-relaxation-essential-skill-modern-life | nZzteuCoYn0 | Chillout Sphere |
| sunset-effect-why-chillout-music-feels-better-at-dusk | sI3pGdr2dmk | Chillout Sphere |
| why-most-people-relax-wrong-how-music-can-fix-it | Tw_odHzPML0 | Chillout Sphere |
| soul-of-piano-soft-ambience-heals-mind-mood | Tx6LKwnhHUQ | Pianosphere Radio |
| why-piano-music-ultimate-stress-relief-trained-pianist | 0T4XDHO7pfA | Pianosphere Radio |
| piano-vs-guitar-anxiety-relief-trained-pianist-verdict | cV3fm4Mi5qg | Pianosphere Radio |
| silence-anxiety-sleep | XLm9OxhczEg | Pianosphere Radio |
| sleep-music-science-ambient-soundscapes-deep-rest | dRc4Fi1YKUM | Pianosphere Radio |
| jazz-atmosphere-warm-acoustic-spaces-calm-mind | nVgywnu7znI | JazzSphere Radio |
| why-your-brain-needs-jazz-to-focus-white-noise-fails | QrphP6lfD7Y | JazzSphere Radio |
| science-jazz-sleep-smooth-jazz-better-white-noise | Q3as1J9PXg0 | JazzSphere Radio |
| why-jazz-works-better-than-classical-stress-relief-trained-pianist | EnL1AHG09wY | JazzSphere Radio |
| morning-coffee-jazz-ritual-metal-guitarist-stress-relief | ZaxoVb4Y9h8 | JazzSphere Radio |
| coding-in-the-matrix | HTg3cwUZjGY | Cyber Dreams |
| cyberpunk-futuristic-soundscapes-creativity-focus-flow | cdbdqx60K2Y | Cyber Dreams |
| dystopian-rain-sounds-deep-focus-cyberpunk | cre-smGaoEs | Cyber Dreams |
| cinematic-ambient-focus | TKgSbDoaB9I | Cyber Dreams |

### Artikel OHNE Video (bewusst)
- ai-music-trained-pianist-guitarist-suno-udio-topmedi
- audio-mastering-davinci-resolve-fairlight-youtube-lufs
- fast-4k-rendering-davinci-resolve-studio-workflow
- inside-atmosphere-how-joachim-creates-emotional-worlds-sphere-music-hub
- mind-behind-atmospheres-joachim-creator-sphere-music-hub
- perfect-seamless-loops-davinci-resolve-long-form-videos
- video-production-journey-10-hour-workflow
- jazz-brain-focus (kein passendes Video gefunden)

---

## 7. SEO-Status

### Sitemaps
- `client/public/sitemap.xml` → COM-Version (39 URLs, `https://www.sphere-music-hub.com/...`)
- `client/public/sitemap-de.xml` → DE-Version (39 URLs, `https://www.sphere-music-hub.de/...`)
- `robots.txt` verweist auf `sitemap-v2.xml` (in GSC eingereicht)
- In Google Search Console eingereicht: `https://www.sphere-music-hub.com/sitemap-v2.xml`

### Legal-URLs (korrekt!)
- `/impressum` (NICHT `/imprint`)
- `/datenschutz` (NICHT `/privacy`)

### Bekannte SEO-Situation
- Google hat bisher nur ~2 Seiten indexiert (Stand 05.04.2026)
- Die Astro SSG-Migration wurde am 30. März 2026 abgeschlossen
- Google braucht Zeit — die Sitemap ist korrekt eingereicht

---

## 8. Bekannte Probleme & Lösungen

| Problem | Lösung |
|---|---|
| Blog-Bilder flackern | `OptimizedImage.tsx` ist stateless (kein useState) — nicht ändern! |
| Blog-Content zeigt HTML-Tags | Automatische Erkennung in BlogArticle.tsx — HTML → dangerouslySetInnerHTML, Markdown → ReactMarkdown |
| Kategorie-Badge fehlt | `category`-Feld muss kleingeschrieben sein: `'jazz'` nicht `'Jazz'` |
| Button-Text unsichtbar | `--primary-foreground` im Dark Mode ist Weiss — nicht ändern! |
| Doppeltes Cookie-Banner | CookieBanner NUR in Layout.astro, NICHT in AppProviders.tsx |
| Videos nicht auf Live-Site | Render.com-Deployment abwarten (3-5 Min) oder leeren Commit pushen |

---

## 9. Deployment-Workflow

```bash
# Standard-Workflow für Änderungen:
pnpm run build          # Build testen (muss ohne Fehler durchlaufen)
git add -A
git commit -m "feat/fix/chore: Beschreibung"
git push origin main    # Render.com deployed automatisch

# Deployment erzwingen (falls Render hängt):
git commit --allow-empty -m "chore: trigger deployment"
git push origin main
```

**Render.com Build-Befehl:** `pnpm run build`  
**Publish Directory:** `dist`

---

## 10. Wichtige Regeln

1. **NIEMALS ein CMS einrichten** — die Website ist SSG, kein CMS nötig
2. **NIEMALS SSR aktivieren** — nur SSG (`output: 'static'` in astro.config.mjs)
3. **NIEMALS force-push** ohne vorherigen Backup-Commit
4. **IMMER** `pnpm run build` testen vor dem Push
5. **IMMER** beide Sitemaps aktualisieren wenn neue Artikel hinzugefügt werden
6. **IMMER** `category` kleingeschrieben in Blog-Artikeln
7. **CookieBanner** nur in `Layout.astro` — nicht in `AppProviders.tsx`
