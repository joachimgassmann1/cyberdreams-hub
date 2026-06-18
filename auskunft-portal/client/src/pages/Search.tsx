import { useState, useMemo, useEffect } from "react";
import { BotLoader } from "@/components/BotLoader";
import { useLocation } from "wouter";
import { SlidersHorizontal, Grid3X3, List, MapPin, ChevronDown, X, Star, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import BusinessCard from "@/components/BusinessCard";
import { featuredBusinesses, categories } from "@/lib/data";

export default function Search() {
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const wasParam = params.get("was") || "";
  const woParam = params.get("wo") || "";

  const [layout, setLayout] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("relevanz");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Bot-Ladeanimation beim ersten Laden und bei neuen Suchen
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [wasParam, woParam]);

  const filtered = useMemo(() => {
    let results = [...featuredBusinesses];
    if (wasParam) {
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(wasParam.toLowerCase()) ||
          b.category.toLowerCase().includes(wasParam.toLowerCase()) ||
          b.tags.some((t) => t.toLowerCase().includes(wasParam.toLowerCase()))
      );
    }
    if (woParam) {
      results = results.filter((b) => b.city.toLowerCase().includes(woParam.toLowerCase()));
    }
    if (selectedCategory) {
      results = results.filter((b) => b.category === selectedCategory);
    }
    if (minRating > 0) {
      results = results.filter((b) => b.rating >= minRating);
    }
    if (onlyOpen) {
      results = results.filter((b) => b.openNow === true);
    }
    if (onlyVerified) {
      results = results.filter((b) => b.verified);
    }
    if (sortBy === "bewertung") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "bewertungen") {
      results.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return results;
  }, [wasParam, woParam, selectedCategory, minRating, onlyOpen, onlyVerified, sortBy]);

  // Show all if no filter matches, fallback to all businesses
  const displayResults = filtered.length > 0 ? filtered : featuredBusinesses;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <BotLoader open={isLoading} />
      <Navbar />

      {/* Search header */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="container py-5">
          <SearchBar initialWas={wasParam} initialWo={woParam} size="compact" />
        </div>
      </div>

      <div className="container py-8 flex-1">
        <div className="flex gap-6">
          {/* ── SIDEBAR FILTERS ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Filter
                </h3>
                <button
                  onClick={() => { setSelectedCategory(null); setMinRating(0); setOnlyOpen(false); setOnlyVerified(false); }}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Zurücksetzen
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Branche</p>
                <div className="space-y-1.5">
                  {categories.slice(0, 8).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat.name
                          ? "bg-indigo-50 text-indigo-700 font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.name}
                      </span>
                      <span className="text-xs text-slate-400">{cat.count.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Min Rating */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Mindestbewertung</p>
                <div className="space-y-1.5">
                  {[0, 3, 4, 4.5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        minRating === r ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${minRating === r ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                      {r === 0 ? "Alle" : `Ab ${r} Sterne`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setOnlyOpen(!onlyOpen)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      onlyOpen ? "bg-indigo-600 border-indigo-600" : "border-slate-300 group-hover:border-indigo-400"
                    }`}
                  >
                    {onlyOpen && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className="text-sm text-slate-700">Jetzt geöffnet</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    onClick={() => setOnlyVerified(!onlyVerified)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      onlyVerified ? "bg-indigo-600 border-indigo-600" : "border-slate-300 group-hover:border-indigo-400"
                    }`}
                  >
                    {onlyVerified && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className="text-sm text-slate-700">Nur verifizierte</span>
                </label>
              </div>
            </div>
          </aside>

          {/* ── RESULTS ── */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <h1 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {wasParam ? `"${wasParam}"` : "Alle Einträge"}
                  {woParam && <span className="text-slate-500 font-normal"> in {woParam}</span>}
                </h1>
                <p className="text-sm text-slate-500">{displayResults.length} Ergebnisse gefunden</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="relevanz">Relevanz</option>
                    <option value="bewertung">Beste Bewertung</option>
                    <option value="bewertungen">Meiste Bewertungen</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {/* Layout toggle */}
                <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setLayout("list")}
                    className={`p-2 transition-colors ${layout === "list" ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout("grid")}
                    className={`p-2 transition-colors ${layout === "grid" ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filters */}
            {(selectedCategory || minRating > 0 || onlyOpen || onlyVerified) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory && (
                  <span className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-100">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-100">
                    Ab {minRating} ★
                    <button onClick={() => setMinRating(0)}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {onlyOpen && (
                  <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full border border-emerald-100">
                    Jetzt geöffnet
                    <button onClick={() => setOnlyOpen(false)}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
            )}

            {/* Results */}
            {layout === "list" ? (
              <div className="space-y-4">
                {displayResults.map((biz) => (
                  <BusinessCard key={biz.id} business={biz} layout="list" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {displayResults.map((biz) => (
                  <BusinessCard key={biz.id} business={biz} layout="grid" />
                ))}
              </div>
            )}

            {/* Load more */}
            <div className="text-center mt-10">
              <button className="bg-white border border-slate-200 text-slate-700 font-semibold px-8 py-3 rounded-xl hover:bg-slate-50 hover:border-indigo-300 transition-colors shadow-sm">
                Weitere Ergebnisse laden
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
