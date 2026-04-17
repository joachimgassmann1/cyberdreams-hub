import { Link } from "wouter";
import { MapPin, Phone, Globe, Clock, CheckCircle2, Crown, ChevronRight } from "lucide-react";
import { Business } from "@/lib/data";
import StarRating from "./StarRating";
import { Badge } from "@/components/ui/badge";

interface BusinessCardProps {
  business: Business;
  layout?: "list" | "grid";
}

export default function BusinessCard({ business, layout = "list" }: BusinessCardProps) {
  if (layout === "grid") {
    return (
      <Link href={`/eintrag/${business.id}`}>
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm card-hover group cursor-pointer">
          <div className="relative h-48 overflow-hidden">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {business.premium && (
              <div className="absolute top-3 left-3">
                <span className="badge-verified flex items-center gap-1">
                  <Crown className="w-3 h-3" /> Premium
                </span>
              </div>
            )}
            {business.openNow !== undefined && (
              <div className="absolute top-3 right-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${business.openNow ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-200"}`}>
                  {business.openNow ? "Jetzt geöffnet" : "Geschlossen"}
                </span>
              </div>
            )}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>{business.name}</p>
              <p className="text-white/80 text-xs">{business.category}</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <StarRating rating={business.rating} size="sm" showNumber reviewCount={business.reviewCount} />
              {business.priceRange && <span className="text-sm text-slate-500 font-medium">{business.priceRange}</span>}
            </div>
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">{business.description}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{business.address}, {business.city}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm card-hover overflow-hidden">
      <div className="flex gap-0">
        {/* Image */}
        <Link href={`/eintrag/${business.id}`} className="flex-shrink-0 w-40 md:w-52 relative overflow-hidden group">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[160px]"
          />
          {business.premium && (
            <div className="absolute top-2 left-2">
              <span className="badge-verified flex items-center gap-1">
                <Crown className="w-3 h-3" /> Premium
              </span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 p-5 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link href={`/eintrag/${business.id}`}>
                  <h3 className="font-bold text-slate-900 text-lg hover:text-indigo-600 transition-colors truncate" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {business.name}
                  </h3>
                </Link>
                {business.verified && (
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {business.category}
                </span>
                {business.subcategory && (
                  <span className="text-xs text-slate-500">{business.subcategory}</span>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <StarRating rating={business.rating} size="sm" showNumber reviewCount={business.reviewCount} />
              {business.priceRange && (
                <p className="text-sm text-slate-500 mt-1 font-medium">{business.priceRange}</p>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{business.description}</p>

          <div className="flex flex-wrap gap-1 mb-3">
            {business.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="w-3 h-3" />
                {business.address}, {business.city}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Phone className="w-3 h-3" />
                {business.phone}
              </span>
              {business.openNow !== undefined && (
                <span className={`flex items-center gap-1 text-xs font-medium ${business.openNow ? "text-emerald-600" : "text-slate-400"}`}>
                  <Clock className="w-3 h-3" />
                  {business.openNow ? "Jetzt geöffnet" : "Geschlossen"}
                </span>
              )}
            </div>
            <Link href={`/eintrag/${business.id}`}>
              <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Mehr Infos <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
