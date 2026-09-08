import {
  ArrowUpRight,
  Box,
  Heart,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  currency,
  formatCategory,
} from "../../utils/formatters";

import RatingStars from "./RatingStars";
import StockBadge from "./StockBadge";

export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-white/7 bg-[#0a1710]/82 transition duration-300 hover:-translate-y-1 hover:border-[#066839]/35 hover:shadow-[0_22px_60px_rgba(0,0,0,0.28)]">
      <Link
        to={`/products/${product.id}`}
        className="block"
      >
        <div className="relative m-2.5 overflow-hidden rounded-[20px] border border-white/6 bg-gradient-to-br from-[#11231a] to-[#09130e]">
          <div className="absolute left-3 top-3 z-10 rounded-full border border-white/8 bg-[#06100b]/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.11em] text-[#a0b3a9] backdrop-blur-md">
            {formatCategory(product.category)}
          </div>

          <button
            type="button"
            className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full border border-white/8 bg-[#06100b]/70 text-[#718a7d] backdrop-blur-md transition hover:text-[#f0b84b]"
            aria-label={`Save ${product.title}`}
            onClick={(event) => event.preventDefault()}
          >
            <Heart className="size-4" />
          </button>

          <div className="aspect-[1.25/1] p-5">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </Link>

      <div className="p-4 pt-2.5 sm:p-5 sm:pt-3">
        <div className="flex items-center justify-between gap-3">
          <span className="truncate text-[11px] font-medium uppercase tracking-[0.13em] text-[#617b6d]">
            {product.brand || "Unbranded"}
          </span>

          <RatingStars
            rating={product.rating}
            compact
          />
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-2 block"
        >
          <h3 className="line-clamp-2 min-h-[48px] text-[15px] font-semibold leading-6 text-[#edf4ef] transition group-hover:text-white">
            {product.title}
          </h3>
        </Link>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/6 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#5e7669]">
              Unit price
            </p>

            <p className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white">
              {currency.format(product.price)}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <StockBadge stock={product.stock} />

            <Link
              to={`/products/${product.id}`}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#58cf8c] transition hover:text-[#79e3a6]"
            >
              Inspect

              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/[0.025] px-3 py-2 text-[11px] text-[#70877b]">
          <Box className="size-3.5 text-[#5f9d78]" />

          SKU {product.sku || `PRD-${product.id}`}
        </div>
      </div>
    </article>
  );
}