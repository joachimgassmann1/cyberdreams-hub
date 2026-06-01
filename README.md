# Sphere Music Hub

**Live:** [sphere-music-hub.com](https://www.sphere-music-hub.com) (EN) | [sphere-music-hub.de](https://www.sphere-music-hub.de) (DE)  
**Repo:** https://github.com/joachimgassmann1/cyberdreams-hub  
**Stack:** Astro 5 + React 19 + Tailwind CSS v4 (SSG — Static Site Generation)  
**Deploy:** Render.com (Auto-deploy bei Push auf `main`)

---

## Quick Start (neue Session)

```bash
gh repo clone joachimgassmann1/cyberdreams-hub
cd cyberdreams-hub
git pull origin main

# .env erstellen (PFLICHT — steht nicht im Repo)
cat > .env << 'ENVEOF'
VITE_YOUTUBE_API_KEY=AIzaSyCqPitQCen49c6soCnEwYMni9gA3G9aYWc
VITE_ANALYTICS_WEBSITE_ID=5fe939ca-a3f9-403d-b1d1-6d358c008cac
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_APP_ID=nbg9ea9tCT3T5YUgNvKDXF
VITE_FRONTEND_FORGE_API_KEY=MaSdVVw8PZVsweQB8BcmWX
VITE_FRONTEND_FORGE_API_URL=https://forge.butterfly-effect.dev
VITE_APP_TITLE=Sphere Music Hub
ENVEOF

pnpm install

# Dann SESSION_CONTEXT.md lesen — enthält alles!
```

---

## Projektstand (27. Mai 2026)

| Metrik | Wert |
|---|---|
| Blog-Artikel | **35** veröffentlicht |
| YouTube-Kanäle | **6** (5 aktiv, 1 Coming Soon) |
| Featured Videos | **6** auf der Homepage |
| Sitemaps | 4 Dateien (v1 + v2, COM + DE) |
| Mobile PageSpeed | 75/100 |
| Desktop PageSpeed | 96/100 |
| SEO Score | 92/100 |

---

## Kritische Regeln

1. **NIEMALS ein CMS einrichten** — hat die Website bereits einmal zerstört!
2. **NIEMALS SSR aktivieren** — nur SSG (`output: 'static'`)
3. **IMMER** `pnpm run build` testen vor dem Push
4. **IMMER** beide Sitemaps updaten bei neuen Artikeln (sitemap.xml + sitemap-v2.xml + DE-Versionen)
5. **`category`** in Blog-Artikeln immer **kleingeschrieben**: `'jazz'` nicht `'Jazz'`
6. **CookieBanner** nur in `src/layouts/Layout.astro` — nicht in AppProviders.tsx!

---

## Dokumentation

- **`SESSION_CONTEXT.md`** — Vollständiger Projektstand, alle Credentials, alle Artikel, alle Regeln
- **`ARTICLE_WORKFLOW.md`** — Schritt-für-Schritt Checkliste für neue Blog-Artikel
- **`docs/blog-database.md`** — Alle Artikel mit Themen, Tags, Konzepten (bei neuen Artikeln updaten!)

---

## YouTube-Kanäle

| Kanal | Handle | Abonnenten |
|---|---|---|
| Deep Focus Sphere | @DeepFocusSphere67 | 2.7K |
| Chillout Sphere | @ChilloutSphere67 | 869 |
| Cyber Dreams | @CyberDreams-x9p | 173 |
| JazzSphere Radio | @JazzSphereRadio | 1.2K |
| Pianosphere Radio | @PianosphereRadio | 2 |
| Guitarsphere Radio | @GuitarsphereRadio | 0 (Coming Soon) |

---

## Deployment

```bash
pnpm run build          # Build testen
git add -A
git commit -m "feat: Beschreibung"
git push origin main    # Render deployed automatisch in 2-3 Min
```
