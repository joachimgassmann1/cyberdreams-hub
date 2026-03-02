# Design-Ideen: Historische Gesellschaft Köln

## Kontext
Die Historische Gesellschaft Köln e.V. gibt die wissenschaftliche Kölner Stadtgeschichte in 13 Bänden heraus.
CI der Originalseite: Rot (#c0392b / Karminrot), Grau, Weiß, Serifenschriften, historische Kunstwerke als Bildmaterial.

---

<response>
<text>
## Idee 1: Archivum Nobile – Klassizistisch-Editorial

**Design Movement:** Klassizistischer Editorialismus, inspiriert von historischen Buchverlagen und Archiven

**Core Principles:**
- Strenge vertikale Typographie-Hierarchie mit Serifenschriften
- Asymmetrische Layouts mit breiten Textblöcken und schmalen Bildstreifen
- Papier-Textur als Hintergrundmotiv (subtil, nicht kitschig)
- Rotes CI-Akzentrot als einzige Farbe neben Schwarz/Weiß/Grau

**Color Philosophy:**
- Hintergrund: Warmes Off-White (#FAF7F2) – wie altes Büttenpapier
- Text: Tiefes Tintenschwarz (#1A1008)
- Akzent: Historisches Karminrot (#B5281C) – identisch mit CI
- Sekundär: Warmes Mittelgrau (#8A7E72)
- Trennlinien: Goldbraun (#C9A96E) – wie Buchbindung

**Layout Paradigm:**
- Zweispaltig-asymmetrisch: 65% Inhalt, 35% Bild/Navigation
- Horizontale Trennlinien als Kapitelmarker
- Großzügige Ränder wie in Kunstbüchern
- Sticky-Navigation links, Inhalt scrollt rechts

**Signature Elements:**
- Ornamentale Trennlinien (einfache Linien mit kleinen Rauten)
- Bandnummern als große, transparente Hintergrundtypographie
- Historische Initialen (Drop Caps) bei Kapitelbeginn

**Interaction Philosophy:**
- Hover-Effekte: Unterstreichungen wachsen von links nach rechts
- Buch-Karten klappen auf (Flip-Animation)
- Scroll-basierte Einblendungen

**Animation:**
- Seiten-Übergänge: Fade mit leichtem vertikalem Versatz
- Karten: Sanftes Anheben beim Hover (2px translate-y, Schatten)
- Keine überladenen Animationen – Würde durch Zurückhaltung

**Typography System:**
- Display: Playfair Display (Serif, für Überschriften)
- Body: Source Serif 4 (Lesbarkeit für lange Texte)
- Labels/Navigation: Cormorant Garamond Small Caps
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Idee 2: Monumentum – Architektonisch-Minimalistisch

**Design Movement:** Architektonischer Minimalismus, inspiriert von Kölner Romanik und modernen Museen

**Core Principles:**
- Maximale Weißfläche mit präzisen Typographie-Momenten
- Monumentale Überschriften, die den Raum dominieren
- Raster-Struktur wie Grundrisse historischer Gebäude
- Farbe als Bedeutungsträger, nicht als Dekoration

**Color Philosophy:**
- Hintergrund: Reines Weiß (#FFFFFF)
- Text: Anthrazit (#2C2C2C)
- Primär-Akzent: Kölner Rot (#C0392B) – CI-konform
- Sekundär: Steingrau (#9E9E9E)
- Highlight: Goldocker (#D4A843) – für Jahreszahlen/Daten

**Layout Paradigm:**
- Breite Hero-Bereiche mit historischen Kunstwerken als Vollbild
- Karten-Grid für die 13 Bände (3×4 + 1 Neuerscheinung)
- Sticky-Header mit transparentem Hintergrund der beim Scrollen weiß wird
- Große Zitate als visuelle Trenner zwischen Sektionen

**Signature Elements:**
- Jahreszahlen als monumentale Hintergrundtypographie (sehr hell)
- Horizontale rote Akzentlinie unter Hauptüberschriften
- Buchcover-Kacheln mit Hover-Zoom-Effekt

**Interaction Philosophy:**
- Klare, direkte Interaktionen ohne Überraschungen
- Hover: Rote Linie wächst unter Links
- Aktive Seite: Roter Punkt vor dem Navigationseintrag

**Animation:**
- Einblendung: Elemente gleiten von unten (20px) mit Opacity
- Parallax: Historische Bilder scrollen leicht langsamer
- Karten: Schatten-Intensivierung beim Hover

**Typography System:**
- Display: Libre Baskerville (klassisch, würdevoll)
- Body: Lora (lesbar, elegant)
- Navigation: Montserrat (modern, klar)
</text>
<probability>0.07</probability>
</response>

<response>
<text>
## Idee 3: Scriptorium – Mittelalterlich-Digital

**Design Movement:** Digitaler Historismus – mittelalterliche Skriptorium-Ästhetik trifft modernes Webdesign

**Core Principles:**
- Pergament-Textur als subtiler Hintergrund
- Illuminierte Handschriften als Inspiration für Dekorelemente
- Schwere Serifenschriften mit historischem Charakter
- Rotes CI als Rubrizierung (wie in mittelalterlichen Handschriften)

**Color Philosophy:**
- Hintergrund: Pergamentgelb (#F5EDD6) – warm und historisch
- Text: Tintenschwarz (#1C1008)
- Akzent: Rubrizierungsrot (#A8200D) – wie historische Rubrizierung
- Sekundär: Oxidiertes Grün (#4A6741) – wie Bucheinbände
- Gold: (#C9A96E) – für Ornamente und Trennlinien

**Layout Paradigm:**
- Zweispaltige Textsätze wie in Manuskripten
- Breite Ränder mit Marginalien (Zusatzinfos am Rand)
- Bandnummern als römische Ziffern in Großformat
- Kapitelmarker mit Ornamentik

**Signature Elements:**
- Ornamentale Initialen bei Abschnitten
- Horizontale Trennlinien mit mittelalterlichem Muster
- Bandkarten mit Pergament-Textur

**Interaction Philosophy:**
- Seiten-Metapher: Hover auf Buch-Karten lässt Seite "umblättern"
- Navigationslinks mit Rubrizierungs-Unterstreichung
- Zitate in Schriftrolle-Optik

**Animation:**
- Umblätter-Effekt für Buchkarten (CSS 3D-Transform)
- Tinte-Schreib-Animation für Überschriften beim ersten Laden
- Sanfte Sepia-Filter-Übergänge

**Typography System:**
- Display: IM Fell English (historisch, authentisch)
- Body: Crimson Text (gut lesbar, historisch)
- Akzente: UnifrakturMaguntia (für spezielle Elemente)
</text>
<probability>0.06</probability>
</response>

---

## Gewählter Ansatz: **Monumentum** (Idee 2)

Architektonischer Minimalismus mit historischem Charakter. Klare Strukturen, würdevolle Typographie, das CI-Rot als starkes Akzent. Moderne Lesbarkeit bei gleichzeitiger Respektierung des historischen Charakters der Institution.
