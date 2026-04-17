import { useState } from "react";
import { useLocation } from "wouter";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  initialWas?: string;
  initialWo?: string;
  size?: "hero" | "compact";
}

const popularSearches = ["Restaurants", "Friseur", "Zahnarzt", "Elektriker", "Physiotherapie"];
const popularCities = ["Berlin", "München", "Hamburg", "Köln", "Frankfurt", "Stuttgart"];

export default function SearchBar({ initialWas = "", initialWo = "", size = "hero" }: SearchBarProps) {
  const [was, setWas] = useState(initialWas);
  const [wo, setWo] = useState(initialWo);
  const [, navigate] = useLocation();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (was) params.set("was", was);
    if (wo) params.set("wo", wo);
    navigate(`/suche?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  if (size === "compact") {
    return (
      <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 shadow-sm p-1.5">
        <div className="flex items-center gap-2 flex-1 px-3">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={was}
            onChange={(e) => setWas(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Was suchen Sie?"
            className="flex-1 text-sm outline-none bg-transparent text-slate-800 placeholder-slate-400 min-w-0"
          />
        </div>
        <div className="w-px h-6 bg-slate-200" />
        <div className="flex items-center gap-2 flex-1 px-3">
          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={wo}
            onChange={(e) => setWo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Wo? Stadt oder PLZ"
            className="flex-1 text-sm outline-none bg-transparent text-slate-800 placeholder-slate-400 min-w-0"
          />
        </div>
        <Button
          onClick={handleSearch}
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 flex-shrink-0"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main search bar */}
      <div className="flex items-stretch bg-white rounded-2xl shadow-2xl shadow-indigo-900/20 overflow-hidden border border-white/50">
        {/* Was */}
        <div className="flex-1 flex items-center gap-3 px-5 py-4 group">
          <Search className="w-5 h-5 text-indigo-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-indigo-600 mb-0.5 uppercase tracking-wide">Was</label>
            <input
              type="text"
              value={was}
              onChange={(e) => setWas(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Branche, Unternehmen, Dienstleistung..."
              className="w-full text-base text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-slate-100 my-3" />

        {/* Wo */}
        <div className="flex-1 flex items-center gap-3 px-5 py-4 group">
          <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label className="block text-xs font-semibold text-orange-500 mb-0.5 uppercase tracking-wide">Wo</label>
            <input
              type="text"
              value={wo}
              onChange={(e) => setWo(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Stadt, Stadtteil oder PLZ..."
              className="w-full text-base text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium"
            />
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-8 flex items-center gap-2 font-semibold text-base transition-colors flex-shrink-0"
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline">Suchen</span>
        </button>
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
        <span className="text-white/70 text-sm">Beliebt:</span>
        {popularSearches.map((term) => (
          <button
            key={term}
            onClick={() => { setWas(term); }}
            className="text-sm text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full transition-colors border border-white/20"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
