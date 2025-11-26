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
- [ ] Deployen
