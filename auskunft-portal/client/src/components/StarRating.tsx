import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  reviewCount?: number;
}

export default function StarRating({ rating, size = "md", showNumber = false, reviewCount }: StarRatingProps) {
  const sizes = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
  const textSizes = { sm: "text-xs", md: "text-sm", lg: "text-base" };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizes[size]} ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : star - 0.5 <= rating
                ? "fill-amber-200 text-amber-400"
                : "fill-gray-100 text-gray-300"
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`font-semibold text-slate-800 ${textSizes[size]}`}>{rating.toFixed(1)}</span>
      )}
      {reviewCount !== undefined && (
        <span className={`text-slate-500 ${textSizes[size]}`}>({reviewCount})</span>
      )}
    </div>
  );
}
