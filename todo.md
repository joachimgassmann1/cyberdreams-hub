# Sphere Music Hub - TODO

## Design & Styling
- [x] Dunkles Theme mit atmosphärischem Design konfigurieren
- [x] Farbpalette mit warmen Akzenten einrichten
- [x] Google Fonts für moderne Typografie integrieren
- [x] Globale CSS-Variablen und Tailwind-Konfiguration anpassen

## Hero-Bereich
- [x] Eindrucksvoller Hero-Bereich mit Hintergrund-Visuals
- [x] Hauptbotschaft und Tagline
- [x] Call-to-Action Buttons (Subscribe, Explore)

## Navigation
- [x] Responsive Navigation mit Logo
- [x] Menü-Links (Home, Channels, About, Contact)
- [x] Mobile Navigation (Hamburger Menu)

## Kanal-Übersicht
- [x] Grid-Layout für alle YouTube-Kanäle
- [x] Kanal-Karten mit Logo, Name, Beschreibung
- [x] Links zu YouTube-Kanälen
- [x] Deep Focus Sphere Kanal-Karte
- [x] Chillout Sphere Kanal-Karte
- [x] Cyber Dreams Kanal-Karte
- [x] JazzSphere Radio Kanal-Karte
- [x] Guitarsphere Radio Kanal-Karte
- [x] Pianosphere Radio Kanal-Karte

## Video-Einbettungen
- [x] Featured Videos Sektion
- [x] YouTube Video Embeds
- [x] Playlist-Übersicht

## Über-Bereich
- [x] "Über uns" Sektion mit Mission Statement
- [x] Beschreibung der Musik-Philosophie
- [x] Social Media Links

## Footer
- [x] Copyright Information
- [x] Social Media Icons
- [x] Kontakt-Links
- [x] Impressum/Datenschutz Platzhalter

## Responsive Design
- [x] Mobile-optimierte Layouts
- [x] Tablet-Ansicht testen
- [x] Desktop-Ansicht optimieren

## Assets
- [x] Logo-Grafiken generieren
- [x] Hintergrund-Bilder für Hero-Bereich
- [x] Kanal-Icons/Avatare

## Testing & Deployment
- [x] Browser-Tests durchführen
- [x] Performance optimieren
- [x] Checkpoint erstellen

## Video-Updates
- [x] Echte Video-IDs von YouTube-Kanälen sammeln
- [x] FeaturedVideos-Komponente mit korrekten Video-IDs aktualisieren

## Hero-Bereich Optimierung
- [x] Hintergrundbild sichtbarer machen (Overlay reduzieren)
- [x] Überschrift einfarbig weiß gestalten (keine bunten Farben)

## Design-Anpassungen
- [x] Statistiken (6+, 100+, 4K+) einfarbig gestalten
- [x] Neue thematisch passende Kanal-Bilder generieren
- [x] Kanal-Bilder in Website integrieren

## Featured Videos Update
- [x] Aktuelle View-Zahlen von YouTube abrufen
- [x] View-Zahlen in FeaturedVideos-Komponente aktualisieren

## Bildoptimierung
- [x] Kanal-Bilder aufhellen (Overlay reduzieren)

## YouTube API Integration
- [x] YouTube API-Schlüssel als Secret speichern
- [x] View-Zahlen automatisch abrufen
- [x] Subscriber-Counts automatisch abrufen
- [x] Frontend-Komponenten für dynamische Daten anpassen
- [x] YouTube API Helper-Funktionen erstellen
- [x] Dynamische Daten-Integration testen

## Channel-ID Fixes
- [x] Channel-IDs für alle Kanäle ermitteln
- [x] Channels-Komponente mit festen Channel-IDs aktualisieren

## Navigation Fix
- [x] Verschachtelte Links in Navigation beheben

## Dynamische Hero-Statistiken
- [x] YouTube API-Funktionen für Gesamtstatistiken erweitern
- [x] Channels-Anzahl dynamisch berechnen
- [x] Gesamte Subscriber-Counts aller Kanäle aggregieren
- [x] Hours of Music aus allen Videos berechnen
- [x] Hero-Komponente mit dynamischen Werten aktualisieren

## API-Optimierung
- [x] YouTube API-Aufrufe reduzieren um 403-Fehler zu vermeiden
- [x] Effizientere Statistik-Berechnung implementieren

## Total Views Ergänzung
- [x] YouTube API um Total Views erweitern
- [x] Hero-Komponente mit 4-Spalten-Grid aktualisieren
- [x] Total Views als vierte Statistik anzeigen

## API 403-Fehler Behebung
- [ ] LocalStorage-Caching für YouTube-Daten implementieren (10 Minuten TTL)
- [ ] API-Aufrufe konsolidieren und Batch-Requests nutzen
- [ ] Parallele API-Aufrufe reduzieren
- [ ] Fehlerbehandlung mit Fallback-Werten verbessern

## API-Schlüssel Update
- [ ] Neuen YouTube API-Schlüssel in Secrets aktualisieren
- [ ] API-Funktionalität mit neuem Schlüssel testen

## Hero-Hintergrundbild Optimierung
- [x] Hero-Overlay weiter reduzieren für bessere Sichtbarkeit des Hintergrundbildes

## Dynamische Featured Videos
- [x] YouTube API-Funktion erstellen um neueste Videos von allen Kanälen abzurufen
- [x] Logik implementieren um 3 Videos von 3 unterschiedlichen Kanälen auszuwählen
- [x] FeaturedVideos-Komponente auf dynamische Auswahl umstellen

## Fallback für Featured Videos
- [x] Fallback-Videos definieren für den Fall dass API nicht erreichbar ist
- [x] FeaturedVideos-Komponente mit Fallback-Logik erweitern

## Kontakt E-Mail Update
- [x] E-Mail-Adresse im Footer auf stillcybervisions@gmail.com aktualisieren

## Impressum und Datenschutz
- [x] Gewerbeanmeldung lesen und Daten extrahieren
- [x] Impressums-Seite erstellen
- [x] Impressum in Navigation und Footer verlinken
- [x] Datenschutz-Seite erstellen
- [x] Datenschutz in Footer verlinken

## Deployment
- [x] GitHub Repository konfigurieren
- [x] Code zu GitHub pushen
- [x] Build-Konfiguration für Render optimieren
- [x] Deployment-Anleitung für Render.com erstellen

## Bugfixes
- [x] Browser-Tab-Titel zeigt %VITE_APP_TITLE% statt echten Titel - beheben
- [x] SPA-Routing für Render.com konfigurieren (Impressum/Datenschutz zeigen "Not Found")
- [x] _redirects funktioniert nicht auf Render - alternative Lösung mit render.yaml routes implementieren
- [x] Von Static Site auf Web Service mit Express-Server upgraden
- [x] Express-Server für SPA-Routing implementieren
- [x] Render.yaml für Web Service anpassen
- [x] Hero-Überschrift und Beschreibung optimieren (Jazz, Chillout, Deep Focus erwähnen)
- [x] Hero-Überschrift zu "Sphere Music Hub – Focus, Chill & Ambient Vibes" ändern
- [x] Facebook-Bilder aus Projekt entfernen (wurden versehentlich deployed)
- [ ] Facebook-Logo wird immer noch angezeigt - komplett aus Projekt entfernen
- [x] Hero-Titel zu "Sphere Music Hub – Focus, Chill & Ambient Music Vibes" ändern (Music vor Vibes)
- [x] Hero-Untertitel ändern zu "Relaxing chillout beats, ambient vibes, and deep focus soundscapes..."
- [x] About-Sektion Text ersetzen mit neuem Text über immersive audio experiences
- [x] Alle 4 Feature-Karten-Beschreibungen in About-Sektion aktualisieren
- [x] Feature-Karten-Texte wurden falsch übernommen - mit exakten Benutzer-Texten ersetzen
- [x] Our Mission Text mit SEO-optimiertem Text ersetzen (focus music, chill music, ambient music)
- [x] SEO Meta-Tags implementieren (Meta Description, Open Graph, Twitter Cards)
- [x] OG Image für Social Media Sharing erstellen
- [x] robots.txt erstellen
- [x] sitemap.xml generieren
- [x] Schema.org JSON-LD Markup implementieren (Organization, WebSite, MusicGroup)
- [x] Google Search Console Verifizierungsdatei hinzufügen- [x] Express-Server Fix: Statische Dateien (robots.txt, sitemap.xml, Google-Verifizierung) korrekt ausliefern
- [x] Google Search Console Verifizierung mit HTML Meta-Tag Methode implementieren
- [x] Google Verifizierungscode korrigieren (3PbH73ha_XaY8ORDUyz5GCq_qc-MRvZFpE0GjLmyE8Q)
- [ ] Pre-Rendering implementieren für Google-Indexierung (SSG/SSR)
- [x] KRITISCH: Leere weiße Seite beim ersten Laden beheben
- [x] YouTube API-Aufrufe aus initialem Rendering entfernen
- [x] Statische Fallback-Werte für schnelles Laden einbauen
- [x] PageSpeed-Performance optimieren

## NEUE STRATEGIE: Realistische statische Daten + Background API Updates
- [x] Aktuelle echte YouTube-Daten abrufen (Subscriber-Zahlen, Videos)
  * Deep Focus Sphere: 2740 Subscriber
  * Chillout Sphere: 82 Subscriber
  * Cyber Dreams: 173 Subscriber
  * JazzSphere Radio: 1160 Subscriber
  * Guitarsphere Radio: 0 Subscriber (leerer Kanal)
  * Pianosphere Radio: 2 Subscriber
- [x] Realistische statische Fallback-Werte einbauen
- [x] Background API-Loading implementieren (nicht blockierend)
- [x] Smooth Updates ohne Flackern
- [x] Featured Videos: Statische Auswahl + API-Nachladen
- [x] Cache TTL auf 24 Stunden erhöht
- [x] Lokal testen - alle Fallback-Werte werden korrekt angezeigt
- [x] Zu GitHub pushen und auf Render deployen

## API komplett entfernen - nur statische Werte
- [x] Hero.tsx: useEffect und API-Imports entfernen
- [x] Channels.tsx: useEffect und API-Imports entfernen
- [x] FeaturedVideos.tsx: useEffect und API-Imports entfernen
- [x] Statische Werte als permanente Daten behalten
- [x] Testen und deployen

## KRITISCH: Build-Fehler auf Render
- [x] JavaScript-Asset nicht gefunden (index-BzrFjHni.js 404)
- [x] Umami Analytics Variable nicht ersetzt (%VITE_ANALYTICS_ENDPOINT%)
- [x] index.html prüfen - Umami-Script entfernt (funktioniert nicht in HTML)
- [x] Build lokal testen - funktioniert
- [x] Zu Render deployen

## KRITISCH: Fehlende Assets und ungeparste Variablen
- [x] %VITE_APP_LOGO% in index.html durch statischen Pfad ersetzen
- [x] Prüfen ob alle Channel-Bilder im public-Ordner existieren - alle da
- [x] logo.png prüfen - existiert
- [x] Deployen und testen

## Farbüberlagerungen von Channel-Bildern entfernen
- [x] Channels.tsx: Color-Overlay entfernen
- [x] Bilder wieder im Original-Look anzeigen
- [x] Deployen

## Bildoptimierung für PageSpeed (13 MB Einsparung)
- [x] Channel-Bilder zu WebP konvertieren und auf 800x450 resizen
- [x] Logo zu WebP konvertieren und auf 96x96 resizen (1.2 MB → 2.3 KB!)
- [x] Hero Background zu WebP konvertieren (1.3 MB → 74 KB!)
- [x] Bild-Referenzen in Komponenten aktualisieren (.jpg → .webp)
- [x] Deployen - Render buildet automatisch

## Logo-Klick scrollt nach oben
- [x] Navigation.tsx: Scroll-to-top beim Logo-Klick hinzufügen
- [x] Deployen

## Hero-Headline Farbmuster anpassen
- [x] Hero.tsx: Headline von weiß zu Cyan-Gold Gradient ändern
- [x] Deployen
- [x] Hero.tsx: Korrekten 4-Farben-Gradient (Cyan → Weiß → Beige/Gold → Orange) einbauen
- [x] Deployen

## Weißanteil im Hero-Gradient erhöhen
- [x] Hero.tsx: Weißanteil im mittleren Bereich des Gradienten verstärken (via-gray-200 → via-white)
- [x] Deployen

## E-Mail-Adresse im Footer aktualisieren
- [x] Footer.tsx: E-Mail von stillcybervisions@gmail.com zu info@sphere-music-hub.com ändern
- [x] Impressum.tsx: E-Mail aktualisiert
- [x] Datenschutz.tsx: E-Mail aktualisiert
- [x] Deployen

## Favicon hinzufügen für Google Search Results
- [x] Favicon aus Logo erstellen (32x32, 16x16 für .ico)
- [x] favicon.ico in /public ablegen (5.6 KB)
- [x] apple-touch-icon.png erstellen (180x180, 50 KB)
- [x] Zusätzliche Größen erstellt (192x192, 512x512 für PWA)
- [x] Favicon-Links in index.html aktualisiert
- [x] Schema.org JSON-LD E-Mail zu info@sphere-music-hub.com aktualisiert
- [x] Deployen und in Browser/Google testen

## Subscribe Button Hintergrundfarbe fehlt
- [x] Hero.tsx: Subscribe on YouTube Button mit bg-card/80 backdrop-blur-sm versehen (funktioniert nicht - outline variant hat transparent bg)
- [x] Deployen
- [x] Hero.tsx: Button von variant="outline" zu variant="secondary" geändert
- [x] Deployen

## Subscribe Button - Explizite Hintergrundfarbe
- [x] Hero.tsx: Gold/Orange Farbe (bg-amber-500 hover:bg-amber-600) implementiert
- [x] Deployen und testen

## Hero Buttons Symmetrie
- [x] Beide Buttons exakt gleiche Größe
- [x] Gleiche Schriftgröße
- [x] Play-Icon zu beiden Buttons hinzugefügt
- [x] Schwarze Schrift in beiden Buttons
- [x] Mittige Ausrichtung für perfekte Symmetrie
- [x] Beide Buttons in gleicher grüner/cyan Farbe (bg-primary)
- [x] Deployen

## Buttons exakt gleiche Breite
- [x] Hero.tsx: Feste Breite für beide Buttons gesetzt (w-full sm:w-72)
- [x] Deployen

## Featured Videos von 3 auf 6 erweitern
- [x] FeaturedVideos.tsx: 6 Videos implementiert (2x Deep Focus, 1x Chillout, 1x Cyber Dreams, 1x Jazz, 1x Piano)
- [x] Video-IDs hinzugefügt
- [x] Beschreibungstext aktualisiert
- [x] Deployen

## Video-IDs korrigieren
- [x] Pianosphere Radio Video-ID ersetzt (xPjrkMmZElw)
- [x] Deep Focus Sphere Video-IDs aktualisiert (bA1JhbZD8UM, XCh88UzbssA)
- [x] Deployen

## View-Angaben aus Featured Videos entfernen
- [x] FeaturedVideos.tsx: viewCount aus Daten-Array entfernt
- [x] FeaturedVideos.tsx: View-Anzeige aus UI entfernt
- [x] Deployen

## Video-IDs neu zuordnen (Thumbnails passen nicht)
- [x] Korrekte Reihenfolge basierend auf YouTube-Screenshots festgelegt
- [x] Video-IDs in FeaturedVideos.tsx neu angeordnet
- [x] Titel mit echten YouTube-Titeln aktualisiert
- [x] Deployen

## Thumbnails zu Titeln zuordnen (finale Korrektur)
- [x] Video-IDs neu zugeordnet: Cyberpunk, Jazz, Chillout, Piano, Deep Focus, Deep Focus
- [x] Deployen

## Einzelne Titel-Korrekturen
- [x] Video 1: CYBERPUNK CITYRAIN (Q2NIq7Qwogc)
- [x] Video 2: Deep Focus Vol. 7 (bA1JhbZD8UM)
- [x] Video 3: Midnight Glow Terrace (RJIdAEvb_dY)
- [x] Video 4: Deep Focus Vibes (XCh88UzbssA)
- [x] Video 5: Smooth Vocal Jazz (uDbTU2pLCRs)
- [x] Video 6: Chill Piano Escapes (xPjrkMmZElw)
- [x] Alle Titel aktualisiert
- [x] Deployen

## FINALE KORREKTE Video-Zuordnung
- [x] Q2NIq7Qwogc = CYBERPUNK CITYRAIN
- [x] XCh88UzbssA = Chill Piano Escapes
- [x] RJIdAEvb_dY = Midnight Glow Terrace
- [x] uDbTU2pLCRs = Deep Focus | Calm Ambient Music
- [x] xPjrkMmZElw = Deep Focus Vibes
- [x] bA1JhbZD8UM = Smooth Vocal Jazz
- [x] Code aktualisiert
- [x] Deployen

## Domain-Update auf .com
- [x] robots.txt: Sitemap-URL auf .com geändert
- [x] sitemap.xml: Alle URLs auf .com geändert (15 Ersetzungen)
- [x] index.html: Schema.org URLs auf .com geändert
- [x] index.html: Open Graph og:url auf .com geändert
- [x] index.html: Twitter Card URLs auf .com geändert
- [x] index.html: Canonical URL auf .com geändert
- [x] Deployen

## Google Search Console Verifizierung für .com
- [x] Neuen Verifizierungs-Code von Google erhalten (q1xeuuYyjgx3E35Apdhy2uqvTixkPHzKN97sYpE0X7M)
- [x] Meta-Tag in index.html aktualisiert
- [x] Deployen - Live auf sphere-music-hub.com
- [ ] In Google Search Console bestätigen

## Google Fonts lokal hosten (Performance-Optimierung)
- [x] Google Fonts (Inter & Poppins) heruntergeladen (2,4 MB total)
- [x] Font-Dateien in /public/fonts abgelegt
- [x] index.html: Google Fonts CDN-Link entfernt
- [x] fonts.css: @font-face Regeln für lokale Fonts erstellt
- [x] Getestet - Fonts laden korrekt
- [x] Zu GitHub gepusht (Commit c628790)
- [x] Render Deployment abgeschlossen - Fonts sind live!
- [ ] PageSpeed Score erneut messen (Ziel: 90+)


## URGENT: Mobile Performance Regression beheben
- [x] Problem analysiert: 2,4 MB Fonts blockieren Mobile Rendering
- [x] Lokale Fonts entfernt
- [x] Google Fonts CDN wiederhergestellt
- [x] Zu GitHub gepusht (Commit a50cdca)
- [x] Render Deployment abgeschlossen - Google Fonts CDN ist wieder live!
- [ ] Mobile Score prüfen (sollte wieder bei 83 sein)

**Fazit:** Lokale Fonts waren kontraproduktiv für Mobile. Google CDN ist besser optimiert.


## Premium Blog System entwickeln
- [x] Blog-Datenstruktur definiert (TypeScript interfaces)
- [x] Blog-Übersichtsseite mit Grid-Layout erstellt
- [x] Pagination implementiert (12 Artikel pro Seite)
- [x] Artikel-Detailseite mit Rich-Formatting
- [x] Navigation erweitert (Blog-Link im Header)
- [x] Kategorien & Tags System (5 Kategorien)
- [x] Lesedauer-Anzeige
- [x] Related Articles (ähnliche Artikel)
- [x] Demo-Artikel mit KI-generierten Bildern erstellt
- [x] Zu GitHub gepusht (Commit 8e28de9)
- [ ] Render Deployment abwarten
- [ ] Live-Test durchführen

**Features:**
- Statisches System (Markdown-basiert)
- Premium Design (Grid, Hover-Effekte, Gradients)
- SEO-optimiert (Rich Snippets, Open Graph)
- Schnell & Performance-optimiert
- Kategorien, Tags, Suchfunktion
- Responsive Design


## Blog Navigation Fix
- [x] Navigation-Komponente zu Blog-Seiten hinzugefügt
- [x] Footer zu Blog-Seiten hinzugefügt
- [x] Link-Routing in Navigation korrigiert (wouter Link statt <a>)
- [ ] Lokal testen
- [ ] Deployen


## Blog-Kategorien anpassen
- [x] Kategorien auf 1-Wort-Begriffe geändert (All, Focus, Chillout, Cyberpunk, Jazz, Guitar, Piano, Relax, Insights)
- [x] Erklärungssatz unter Untertitel eingefügt
- [x] whitespace-nowrap zu Buttons hinzugefügt (kein Umbruch)
- [ ] Lokal testen
- [ ] Deployen


## Blog SEO-Optimierung
- [x] Blog-URLs zu sitemap.xml hinzugefügt (/blog + Artikel)
- [x] Schema.org BlogPosting JSON-LD zu BlogArticle hinzugefügt
- [x] Meta Tags (title, description) dynamisch aktualisiert
- [ ] Deployen
- [ ] Sitemap in Google Search Console einreichen


## Neuer Artikel: "Ultimate Guide to Focus Music"
- [x] Hero-Bild generiert (Professionelles Workspace-Foto mit Kopfhörern)
- [x] Artikel formatiert und zu posts.ts hinzugefügt
- [x] Sitemap bereits aktuell
- [x] Zu GitHub gepusht (Commit 1107643)
- [ ] Render Deployment abwarten


## Hero-Bild schärfer machen
- [x] Neues Bild mit weniger Bokeh generiert (scharfe City-Skyline)
- [x] Altes Bild ersetzt
- [ ] Deployen


## Hero-Overlay reduzieren
- [x] Overlay-Opazität von 80% auf 40% reduziert
- [ ] Deployen
