import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const visiblePages = pages.filter((page) => {
    if (totalPages <= 7) {
      return true;
    }

    if (page === 1 || page === totalPages) {
      return true;
    }

    return Math.abs(page - currentPage) <= 1;
  });

  const items = [];

  visiblePages.forEach((page, index) => {
    const previous =
      visiblePages[index - 1];

    if (
      previous &&
      page - previous > 1
    ) {
      items.push(`ellipsis-${page}`);
    }

    items.push(page);
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-white/7 bg-[#0a1710]/72 p-3">
      <p className="px-2 text-xs text-[#6d8478]">
        Page{" "}
        <span className="font-semibold text-[#cbd8d0]">
          {currentPage}
        </span>{" "}
        of {totalPages}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="grid size-9 place-items-center rounded-xl border border-white/8 text-[#8ea398] transition hover:border-[#066839]/40 hover:bg-[#066839]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>

        {items.map((item) =>
          typeof item === "string" ? (
            <span
              key={item}
              className="grid size-9 place-items-center text-xs text-[#587064]"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() =>
                onPageChange(item)
              }
              className={`grid size-9 place-items-center rounded-xl text-xs font-semibold transition ${
                item === currentPage
                  ? "bg-[#066839] text-white shadow-[0_8px_20px_rgba(6,104,57,0.28)]"
                  : "border border-white/8 text-[#8ea398] hover:border-[#066839]/40 hover:bg-[#066839]/10 hover:text-white"
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="grid size-9 place-items-center rounded-xl border border-white/8 text-[#8ea398] transition hover:border-[#066839]/40 hover:bg-[#066839]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}