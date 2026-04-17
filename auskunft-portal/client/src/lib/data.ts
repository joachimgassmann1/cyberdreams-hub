// ============================================================
// AUSKUNFT.DE – Mock Data
// ============================================================

export interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  zip: string;
  phone: string;
  email?: string;
  website?: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  gallery?: string[];
  verified: boolean;
  premium: boolean;
  openNow?: boolean;
  hours?: { day: string; open: string; close: string }[];
  priceRange?: string;
  features?: string[];
  lat?: number;
  lng?: number;
  menu?: { name: string; description: string; price: string }[];
  reviews?: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  helpful?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
  gradient: string;
}

export const categories: Category[] = [
  { id: "restaurants", name: "Restaurants", icon: "🍽️", count: 2847, color: "#F97316", gradient: "from-orange-400 to-red-500" },
  { id: "handwerker", name: "Handwerker", icon: "🔧", count: 1923, color: "#6366F1", gradient: "from-indigo-400 to-violet-500" },
  { id: "aerzte", name: "Ärzte", icon: "⚕️", count: 3104, color: "#10B981", gradient: "from-emerald-400 to-teal-500" },
  { id: "rechtsanwaelte", name: "Rechtsanwälte", icon: "⚖️", count: 876, color: "#8B5CF6", gradient: "from-violet-400 to-purple-600" },
  { id: "beauty", name: "Beauty & Wellness", icon: "💆", count: 1456, color: "#EC4899", gradient: "from-pink-400 to-rose-500" },
  { id: "immobilien", name: "Immobilien", icon: "🏠", count: 654, color: "#14B8A6", gradient: "from-teal-400 to-cyan-500" },
  { id: "shopping", name: "Shopping", icon: "🛍️", count: 2103, color: "#F59E0B", gradient: "from-amber-400 to-yellow-500" },
  { id: "finanzen", name: "Finanzen", icon: "💼", count: 543, color: "#3B82F6", gradient: "from-blue-400 to-indigo-500" },
  { id: "bildung", name: "Bildung", icon: "📚", count: 789, color: "#84CC16", gradient: "from-lime-400 to-green-500" },
  { id: "auto", name: "Auto & KFZ", icon: "🚗", count: 1234, color: "#6B7280", gradient: "from-gray-400 to-slate-500" },
  { id: "gesundheit", name: "Gesundheit", icon: "🏥", count: 987, color: "#EF4444", gradient: "from-red-400 to-rose-500" },
  { id: "sport", name: "Sport & Freizeit", icon: "⚽", count: 678, color: "#22C55E", gradient: "from-green-400 to-emerald-500" },
];

export const featuredBusinesses: Business[] = [
  {
    id: "1",
    name: "The Monochrome Kitchen",
    category: "Restaurants",
    subcategory: "Gehobene Küche",
    rating: 4.9,
    reviewCount: 312,
    address: "Torstraße 140",
    city: "Berlin",
    zip: "10119",
    phone: "+49 30 123 456 78",
    email: "hello@monochrome-kitchen.de",
    website: "https://monochrome-kitchen.de",
    description: "Saisonal. Regional. Kompromisslos modern. Ausgezeichnete Küche im Herzen Berlins.",
    longDescription: "Im Monochrome Kitchen reduzieren wir das kulinarische Erlebnis auf sein Wesentliches. Unsere Küche ist eine Hommage an die Brandenburger Landwirtschaft, interpretiert durch die Linse moderner deutscher Gastronomie. Wir arbeiten ausschließlich mit Produzenten zusammen, die unsere Leidenschaft für Qualität und Nachhaltigkeit teilen. Jedes Gericht ist ein kuratiertes Kunstwerk aus Textur, Temperatur und Geschmack.",
    tags: ["Fine Dining", "Saisonal", "Regional", "Weinbar"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/100777620/iNpFAWmmdxoGCdRVQVkPGq/detail-restaurant-2GFFp8B4g7byybTkHLzgGQ.webp",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600",
    ],
    verified: true,
    premium: true,
    openNow: true,
    priceRange: "€€€€",
    hours: [
      { day: "Mo–Fr", open: "18:00", close: "23:00" },
      { day: "Sa–So", open: "17:00", close: "00:00" },
    ],
    features: ["Reservierung empfohlen", "Weinbegleitung", "Vegetarische Optionen", "Privater Raum"],
    menu: [
      { name: "Fermentierter Kohlrabi", description: "Mit geräuchertem Eigelb, Schnittlauch-Öl und knuspriger Buchweizen-Textur", price: "24 €" },
      { name: "Müritz-Zander", description: "Kross gebraten, auf Beelitzer Spargel-Variationen und Beurre Blanc mit Holunderblüte", price: "38 €" },
      { name: "Brandenburger Reh", description: "Rosa Rücken, Sellerie-Püree, fermentierte Brombeeren und Fichtennadel-Jus", price: "46 €" },
      { name: "Dunkle Schokolade & Rote Bete", description: "72% Grand Cru, Rote-Bete-Sorbet, Erde aus Kakaobohnen und Meersalz", price: "18 €" },
    ],
    reviews: [
      { id: "r1", author: "Maximilian K.", rating: 5, date: "15. März 2025", text: "Ein absolutes Highlight in Berlin. Die Reduktion auf das Wesentliche schmeckt man in jedem Detail. Die Weinbegleitung war grandios.", helpful: 24 },
      { id: "r2", author: "Sophie L.", rating: 5, date: "2. April 2025", text: "Modernes Design trifft auf herzliche Gastfreundschaft. Das Reh war das beste Fleischgericht, das ich seit Jahren gegessen habe.", helpful: 18 },
      { id: "r3", author: "Thomas B.", rating: 4, date: "20. März 2025", text: "Außergewöhnliche Küche, sehr guter Service. Einziger Kritikpunkt: die Wartezeit zwischen den Gängen war etwas lang.", helpful: 7 },
    ],
  },
  {
    id: "2",
    name: "Studio Architektura",
    category: "Handwerker",
    subcategory: "Architektur & Planung",
    rating: 4.9,
    reviewCount: 124,
    address: "Friedrichstraße 120",
    city: "Berlin",
    zip: "10117",
    phone: "+49 30 1234 5678",
    email: "hello@architektura.de",
    website: "https://architektura.de",
    description: "Preisgekröntes Architekturbüro mit Fokus auf nachhaltiges Bauen und zeitloses Design.",
    longDescription: "Studio Architektura wurde 2010 gegründet und hat sich als eines der führenden Architekturbüros in Berlin etabliert. Wir verbinden ästhetisches Gespür mit technischer Präzision und schaffen Räume, die Menschen inspirieren. Nachhaltigkeit ist dabei kein Kompromiss, sondern Grundprinzip unserer Arbeit.",
    tags: ["Neubau", "Sanierung", "Nachhaltigkeit", "Innenarchitektur"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/100777620/iNpFAWmmdxoGCdRVQVkPGq/detail-handwerk-K9TmGZNa2qK5BWNfryUc9i.webp",
    gallery: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600",
    ],
    verified: true,
    premium: true,
    openNow: false,
    priceRange: "€€€",
    hours: [
      { day: "Mo–Fr", open: "09:00", close: "18:00" },
      { day: "Sa", open: "10:00", close: "14:00" },
    ],
    features: ["Kostenlose Erstberatung", "3D-Visualisierung", "Projektmanagement", "Zertifiziert"],
    reviews: [
      { id: "r4", author: "Klaus M.", rating: 5, date: "10. Feb 2025", text: "Hervorragende Arbeit, pünktliche Lieferung und das Ergebnis hat alle Erwartungen übertroffen.", helpful: 15 },
      { id: "r5", author: "Anna W.", rating: 5, date: "5. Jan 2025", text: "Professionell, kreativ und immer erreichbar. Unser Traumhaus wurde Wirklichkeit.", helpful: 12 },
    ],
  },
  {
    id: "3",
    name: "Praxis Dr. Müller-Schmidt",
    category: "Ärzte",
    subcategory: "Allgemeinmedizin",
    rating: 4.7,
    reviewCount: 89,
    address: "Kurfürstendamm 45",
    city: "Berlin",
    zip: "10707",
    phone: "+49 30 987 654 32",
    email: "info@praxis-mueller-schmidt.de",
    description: "Moderne Allgemeinarztpraxis mit umfassendem Leistungsspektrum und kurzen Wartezeiten.",
    longDescription: "Die Praxis Dr. Müller-Schmidt bietet eine umfassende medizinische Versorgung für die ganze Familie. Mit modernster Diagnostik und einem einfühlsamen Team stehen wir für Ihre Gesundheit ein.",
    tags: ["Kassenarzt", "Privatarzt", "Vorsorge", "Hausbesuche"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    verified: true,
    premium: false,
    openNow: true,
    priceRange: "€€",
    hours: [
      { day: "Mo, Mi, Fr", open: "08:00", close: "13:00" },
      { day: "Di, Do", open: "15:00", close: "18:00" },
    ],
    features: ["Online-Terminbuchung", "Kassenarzt", "Hausbesuche", "Impfungen"],
    reviews: [
      { id: "r6", author: "Maria S.", rating: 5, date: "1. April 2025", text: "Sehr freundliches Personal, kurze Wartezeiten und Dr. Müller-Schmidt nimmt sich wirklich Zeit.", helpful: 9 },
    ],
  },
  {
    id: "4",
    name: "Meisterwerkstatt Bauer",
    category: "Handwerker",
    subcategory: "Tischlerei",
    rating: 4.8,
    reviewCount: 67,
    address: "Handwerkerstraße 12",
    city: "München",
    zip: "80331",
    phone: "+49 89 456 789 01",
    email: "info@tischlerei-bauer.de",
    description: "Traditionelle Tischlerei mit modernem Anspruch. Maßmöbel und Innenausbau seit 1987.",
    longDescription: "Die Meisterwerkstatt Bauer steht seit über 35 Jahren für handwerkliche Exzellenz. Wir fertigen Maßmöbel, Küchen und Innenausbauten nach Ihren Wünschen – mit Liebe zum Detail und nachhaltigen Materialien.",
    tags: ["Maßmöbel", "Küchen", "Innenausbau", "Restaurierung"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/100777620/iNpFAWmmdxoGCdRVQVkPGq/detail-handwerk-K9TmGZNa2qK5BWNfryUc9i.webp",
    verified: true,
    premium: false,
    openNow: true,
    priceRange: "€€€",
    hours: [
      { day: "Mo–Fr", open: "07:30", close: "17:00" },
      { day: "Sa", open: "09:00", close: "13:00" },
    ],
    features: ["Kostenloser Aufmaß", "Eigene Fertigung", "Montageservice", "Garantie"],
    reviews: [
      { id: "r7", author: "Peter H.", rating: 5, date: "20. März 2025", text: "Unsere neue Küche ist ein Traum. Perfekte Verarbeitung und super freundliches Team.", helpful: 11 },
    ],
  },
  {
    id: "5",
    name: "Kanzlei Hoffmann & Partner",
    category: "Rechtsanwälte",
    subcategory: "Arbeitsrecht",
    rating: 4.6,
    reviewCount: 43,
    address: "Maximilianstraße 22",
    city: "München",
    zip: "80539",
    phone: "+49 89 123 456 78",
    email: "kontakt@hoffmann-partner.de",
    website: "https://hoffmann-partner.de",
    description: "Spezialisierte Rechtsanwaltskanzlei für Arbeits-, Miet- und Familienrecht.",
    longDescription: "Die Kanzlei Hoffmann & Partner berät und vertritt Mandanten in allen Bereichen des Zivil- und Wirtschaftsrechts. Unser Team aus erfahrenen Anwälten steht Ihnen mit fundiertem Fachwissen und persönlichem Engagement zur Seite.",
    tags: ["Arbeitsrecht", "Mietrecht", "Familienrecht", "Erstberatung"],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    verified: true,
    premium: true,
    openNow: false,
    priceRange: "€€€",
    hours: [
      { day: "Mo–Do", open: "09:00", close: "17:30" },
      { day: "Fr", open: "09:00", close: "15:00" },
    ],
    features: ["Erstberatung 30 Min. kostenlos", "Online-Beratung", "Notfalltermine", "Mehrsprachig"],
    reviews: [
      { id: "r8", author: "Sandra K.", rating: 5, date: "8. April 2025", text: "Kompetente und einfühlsame Beratung in einer schwierigen Situation. Sehr empfehlenswert.", helpful: 8 },
    ],
  },
  {
    id: "6",
    name: "Bella Vita Ristorante",
    category: "Restaurants",
    subcategory: "Italienisch",
    rating: 4.5,
    reviewCount: 198,
    address: "Schillerstraße 8",
    city: "Frankfurt",
    zip: "60313",
    phone: "+49 69 234 567 89",
    email: "info@bellavita-ffm.de",
    description: "Authentische italienische Küche mit frischen Zutaten direkt aus Italien.",
    longDescription: "Das Bella Vita bringt das echte Italien nach Frankfurt. Unsere Küche basiert auf Rezepten, die seit Generationen in der Familie weitergegeben werden. Frische Pasta, Pizzen aus dem Holzofen und erlesene Weine aus allen Regionen Italiens.",
    tags: ["Pasta", "Pizza", "Weinbar", "Familienfreundlich"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    verified: true,
    premium: false,
    openNow: true,
    priceRange: "€€",
    hours: [
      { day: "Di–So", open: "12:00", close: "23:00" },
    ],
    features: ["Reservierung möglich", "Terrasse", "Kinderstühle", "Takeaway"],
    reviews: [
      { id: "r9", author: "Julia M.", rating: 5, date: "12. April 2025", text: "Die beste Pasta in Frankfurt! Authentisch, frisch und das Personal ist herzlich.", helpful: 14 },
    ],
  },
];

export const recentReviews = [
  { business: "Trend Renovierung", rating: 5, text: "Die Arbeiten wurden pünktlich, zuverlässig, exakt und sauber durchgeführt...", author: "K. Bauer" },
  { business: "Goldankauf4u", rating: 5, text: "Sehr freundlicher Empfang auch ohne Termin. Seriöse und faire Bewertung...", author: "M. Fischer" },
  { business: "Dr. Andrea Struwe", rating: 5, text: "Einfach die beste Anwältin. Empfehle ich sehr weiter!", author: "T. Hoffmann" },
];

export const stats = [
  { value: "48.293", label: "Einträge" },
  { value: "127.841", label: "Bewertungen" },
  { value: "2.1 Mio.", label: "Nutzer/Monat" },
  { value: "98%", label: "Zufriedenheit" },
];
