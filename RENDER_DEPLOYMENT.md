# Deployment-Anleitung für Render.com

## Sphere Music Hub auf Render.com deployen

Diese Anleitung führt Sie Schritt für Schritt durch den Deployment-Prozess Ihrer **Sphere Music Hub** Website auf Render.com. Die Website wird als statische Seite gehostet und ist nach dem Deployment weltweit verfügbar.

---

## Voraussetzungen

Bevor Sie beginnen, stellen Sie sicher, dass Sie Folgendes haben:

- **GitHub Repository**: Ihr Code ist bereits im privaten Repository `https://github.com/joachimgassmann1/cyberdreams-hub` gespeichert
- **Render.com Account**: Erstellen Sie einen kostenlosen Account auf [render.com](https://render.com) falls noch nicht vorhanden
- **YouTube API-Schlüssel**: Ihr API-Schlüssel `AIzaSyA9SNuXHiReryhzz_GqRcd9eBNUju3vkwU` für die dynamischen YouTube-Daten

---

## Schritt 1: Render.com Account erstellen

Falls Sie noch keinen Render.com Account haben:

1. Besuchen Sie [https://render.com](https://render.com)
2. Klicken Sie auf **"Get Started"** oder **"Sign Up"**
3. Registrieren Sie sich mit Ihrer E-Mail-Adresse oder verbinden Sie Ihren GitHub-Account
4. Bestätigen Sie Ihre E-Mail-Adresse

**Empfehlung**: Verbinden Sie Ihren GitHub-Account direkt, um den Deployment-Prozess zu vereinfachen.

---

## Schritt 2: Neuen Static Site Service erstellen

Nach dem Login in Ihrem Render Dashboard:

1. Klicken Sie auf **"New +"** in der oberen rechten Ecke
2. Wählen Sie **"Static Site"** aus dem Dropdown-Menü
3. Sie werden zur Repository-Auswahl weitergeleitet

---

## Schritt 3: GitHub Repository verbinden

### Option A: GitHub bereits verbunden

Wenn Sie sich mit GitHub angemeldet haben:

1. Suchen Sie in der Repository-Liste nach **`cyberdreams-hub`**
2. Klicken Sie auf **"Connect"** neben dem Repository

### Option B: GitHub noch nicht verbunden

Falls Ihr GitHub-Account noch nicht verbunden ist:

1. Klicken Sie auf **"Connect GitHub"**
2. Autorisieren Sie Render.com, auf Ihre GitHub-Repositories zuzugreifen
3. Wählen Sie **"Only select repositories"** und fügen Sie `joachimgassmann1/cyberdreams-hub` hinzu
4. Klicken Sie auf **"Install & Authorize"**
5. Zurück in Render, klicken Sie auf **"Connect"** neben Ihrem Repository

---

## Schritt 4: Build-Einstellungen konfigurieren

Nachdem Sie das Repository verbunden haben, konfigurieren Sie die folgenden Einstellungen:

### Grundeinstellungen

| Feld | Wert |
|------|------|
| **Name** | `sphere-music-hub` (oder ein beliebiger Name) |
| **Branch** | `main` |
| **Root Directory** | *(leer lassen)* |

### Build-Einstellungen

| Feld | Wert |
|------|------|
| **Build Command** | `pnpm install && pnpm run build` |
| **Publish Directory** | `dist/public` |

**Wichtig**: Stellen Sie sicher, dass die Build Command und das Publish Directory exakt wie oben angegeben eingetragen werden.

---

## Schritt 5: Environment Variables (Umgebungsvariablen) hinzufügen

Ihre Website benötigt den YouTube API-Schlüssel als Umgebungsvariable:

1. Scrollen Sie nach unten zum Abschnitt **"Environment Variables"**
2. Klicken Sie auf **"Add Environment Variable"**
3. Fügen Sie folgende Variable hinzu:

| Key | Value |
|-----|-------|
| `VITE_YOUTUBE_API_KEY` | `AIzaSyA9SNuXHiReryhzz_GqRcd9eBNUju3vkwU` |

4. Optional können Sie auch `NODE_VERSION` hinzufügen (empfohlen):

| Key | Value |
|-----|-------|
| `NODE_VERSION` | `22.13.0` |

**Hinweis**: Die `VITE_` Prefix ist wichtig, damit Vite die Variable während des Build-Prozesses einbindet.

---

## Schritt 6: Deployment starten

Nachdem alle Einstellungen konfiguriert sind:

1. Scrollen Sie nach unten und klicken Sie auf **"Create Static Site"**
2. Render beginnt automatisch mit dem Build-Prozess
3. Sie werden zum Dashboard Ihrer neuen Static Site weitergeleitet

Der Build-Prozess dauert in der Regel **3-5 Minuten**. Sie können den Fortschritt im **"Logs"**-Tab verfolgen.

---

## Schritt 7: Deployment überprüfen

Sobald der Build erfolgreich abgeschlossen ist:

1. Im Dashboard sehen Sie den Status **"Live"** in grüner Farbe
2. Ihre Website-URL wird angezeigt, z.B. `https://sphere-music-hub.onrender.com`
3. Klicken Sie auf die URL, um Ihre Website zu öffnen

**Überprüfen Sie folgende Funktionen**:

- ✅ Hero-Bereich mit dynamischen Statistiken (Channels, Hours of Music, Total Views, Subscribers)
- ✅ 6 Kanal-Karten mit Live-Subscriber-Counts
- ✅ Featured Videos Sektion mit den 3 neuesten Videos
- ✅ About-Bereich und Footer
- ✅ Impressum und Datenschutz-Seiten
- ✅ Responsive Design auf verschiedenen Geräten

---

## Schritt 8: Custom Domain einrichten (Optional)

Wenn Sie eine eigene Domain verwenden möchten:

1. Gehen Sie in Ihrem Render Dashboard zu Ihrer Static Site
2. Klicken Sie auf den Tab **"Settings"**
3. Scrollen Sie zu **"Custom Domains"**
4. Klicken Sie auf **"Add Custom Domain"**
5. Geben Sie Ihre Domain ein (z.B. `www.spheremusichub.com`)
6. Folgen Sie den Anweisungen, um DNS-Einträge bei Ihrem Domain-Provider hinzuzufügen

**DNS-Konfiguration** (Beispiel):

| Type | Name | Value |
|------|------|-------|
| CNAME | www | `sphere-music-hub.onrender.com` |

Render stellt automatisch ein kostenloses SSL-Zertifikat über Let's Encrypt bereit.

---

## Automatische Deployments

Render ist so konfiguriert, dass bei jedem Push zu Ihrem GitHub Repository automatisch ein neues Deployment gestartet wird:

1. Machen Sie Änderungen in Ihrem lokalen Code
2. Committen und pushen Sie zu GitHub:
   ```bash
   git add .
   git commit -m "Beschreibung der Änderungen"
   git push github main
   ```
3. Render erkennt den Push automatisch und startet einen neuen Build
4. Nach 3-5 Minuten sind Ihre Änderungen live

---

## Wichtige Hinweise zur YouTube API

### API-Quota Management

Die YouTube Data API v3 hat ein tägliches Quota-Limit. Ihre Website verwendet **localStorage-Caching** mit 10-minütiger Gültigkeitsdauer, um API-Aufrufe zu minimieren:

- **Erste Besucher**: API-Daten werden abgerufen und im Browser gespeichert
- **Wiederholte Besuche**: Gecachte Daten werden verwendet (10 Minuten gültig)
- **Nach 10 Minuten**: Neue API-Anfrage wird gestellt

### Fallback-System

Falls die API-Quota erschöpft ist oder die API nicht erreichbar ist:

- **Featured Videos**: Zeigt 3 vordefinierte Fallback-Videos
- **Statistiken**: Zeigt statische Fallback-Werte
- **Subscriber-Counts**: Zeigt "N/A" oder letzte gecachte Werte

Das Quota wird täglich um Mitternacht (Pacific Time) zurückgesetzt.

---

## Troubleshooting

### Build schlägt fehl

**Problem**: Der Build-Prozess bricht mit Fehlern ab.

**Lösung**:
1. Überprüfen Sie die Build-Logs im Render Dashboard
2. Stellen Sie sicher, dass die Build Command korrekt ist: `pnpm install && pnpm run build`
3. Überprüfen Sie, ob alle Dependencies in der `package.json` korrekt sind

### Website zeigt keine Daten

**Problem**: Die Website lädt, aber YouTube-Daten werden nicht angezeigt.

**Lösung**:
1. Überprüfen Sie, ob die Environment Variable `VITE_YOUTUBE_API_KEY` korrekt gesetzt ist
2. Öffnen Sie die Browser-Konsole (F12) und prüfen Sie auf Fehler
3. Möglicherweise ist das API-Quota erschöpft – warten Sie bis zum nächsten Tag

### 404-Fehler bei Unterseiten

**Problem**: Direkter Aufruf von `/impressum` oder `/datenschutz` führt zu 404-Fehler.

**Lösung**:
1. Gehen Sie zu Render Dashboard → Settings
2. Fügen Sie unter **"Redirects/Rewrites"** folgende Regel hinzu:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`

Dies stellt sicher, dass alle Routen an die React-App weitergeleitet werden.

---

## Kosten

Render.com bietet einen **kostenlosen Plan** für Static Sites mit folgenden Features:

- ✅ Unbegrenzte Bandbreite
- ✅ Automatische SSL-Zertifikate
- ✅ Automatische Deployments von GitHub
- ✅ Custom Domains
- ✅ 100 GB Bandbreite pro Monat (danach gedrosselt, nicht gesperrt)

Für höhere Anforderungen gibt es kostenpflichtige Pläne ab $7/Monat.

---

## Support und weitere Ressourcen

- **Render Dokumentation**: [https://render.com/docs/static-sites](https://render.com/docs/static-sites)
- **YouTube API Dokumentation**: [https://developers.google.com/youtube/v3](https://developers.google.com/youtube/v3)
- **GitHub Repository**: [https://github.com/joachimgassmann1/cyberdreams-hub](https://github.com/joachimgassmann1/cyberdreams-hub)

Bei Fragen oder Problemen können Sie sich an den Render Support wenden oder die Community-Foren nutzen.

---

## Zusammenfassung

Sie haben erfolgreich Ihre **Sphere Music Hub** Website auf Render.com deployed! Die Website ist jetzt:

- ✅ Weltweit verfügbar über eine öffentliche URL
- ✅ Automatisch aktualisiert bei jedem GitHub Push
- ✅ Mit SSL-Verschlüsselung gesichert
- ✅ Optimiert für Performance und SEO
- ✅ Rechtlich konform mit Impressum und Datenschutzerklärung

**Nächste Schritte**:

1. Testen Sie die Website auf verschiedenen Geräten
2. Richten Sie eine Custom Domain ein (optional)
3. Teilen Sie die URL mit Ihrer Community
4. Überwachen Sie die YouTube API-Nutzung im Google Cloud Console

Viel Erfolg mit Ihrer Website! 🎵
