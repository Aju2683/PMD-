import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function FilterToolbar({
  search,
  setSearch,

  category,
  setCategory,
  categories,

  minPrice,
  setMinPrice,

  maxPrice,
  setMaxPrice,

  sort,
  setSort,

  resultCount,
  totalCount,

  onReset,
}) {
  const hasFilters =
    search ||
    category !== "all" ||
    minPrice ||
    maxPrice ||
    sort !== "default";

  return (
    <section className="rounded-[26px] border border-white/7 bg-[#0a1710]/82 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/6 pb-4">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-[#066839]/12 text-[#55d08b]">
            <SlidersHorizontal className="size-4" />
          </span>

          <div>
            <h2 className="text-sm font-semibold text-white">
              Product explorer
            </h2>

            <p className="mt-0.5 text-[11px] text-[#678071]">
              {resultCount} of {totalCount} products visible
            </p>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-3 text-xs font-medium text-[#8da197] transition hover:border-[#f0b84b]/25 hover:text-[#f0c66f]"
          >
            <RotateCcw className="size-3.5" />

            Reset filters
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.35fr_1fr_0.75fr_0.75fr_1fr]">
        <label className="flex h-11 items-center gap-2.5 rounded-2xl border border-white/8 bg-[#07120d] px-3.5 transition focus-within:border-[#0d8a4c]/60">
          <Search className="size-4 text-[#678071]" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search product name..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#4f675a]"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-[#61796c] hover:text-white"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </label>

        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          className="h-11 rounded-2xl border border-white/8 bg-[#07120d] px-3.5 text-sm text-[#d6e2db] outline-none transition focus:border-[#0d8a4c]/60"
        >
          <option value="all">
            All categories
          </option>

          {categories.map((item) => (
            <option
              key={item.slug}
              value={item.slug}
            >
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          value={minPrice}
          onChange={(event) =>
            setMinPrice(event.target.value)
          }
          placeholder="Min price"
          className="h-11 rounded-2xl border border-white/8 bg-[#07120d] px-3.5 text-sm text-white outline-none placeholder:text-[#4f675a] focus:border-[#0d8a4c]/60"
        />

        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(event) =>
            setMaxPrice(event.target.value)
          }
          placeholder="Max price"
          className="h-11 rounded-2xl border border-white/8 bg-[#07120d] px-3.5 text-sm text-white outline-none placeholder:text-[#4f675a] focus:border-[#0d8a4c]/60"
        />

        <select
          value={sort}
          onChange={(event) =>
            setSort(event.target.value)
          }
          className="h-11 rounded-2xl border border-white/8 bg-[#07120d] px-3.5 text-sm text-[#d6e2db] outline-none transition focus:border-[#0d8a4c]/60"
        >
          <option value="default">
            Sort: Recommended
          </option>

          <option value="price-asc">
            Price: Low to High
          </option>

          <option value="price-desc">
            Price: High to Low
          </option>

          <option value="rating-desc">
            Rating: High to Low
          </option>

          <option value="rating-asc">
            Rating: Low to High
          </option>
        </select>
      </div>
    </section>
  );
}