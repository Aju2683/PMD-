import { Star } from "lucide-react";

export default function RatingStars({
  rating,
  compact = false,
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Star
        className={`${
          compact ? "size-3.5" : "size-4"
        } fill-[#f0b84b] text-[#f0b84b]`}
      />

      <span
        className={`${
          compact ? "text-xs" : "text-sm"
        } font-semibold text-[#e9efe9]`}
      >
        {Number(rating || 0).toFixed(2)}
      </span>
    </div>
  );
}