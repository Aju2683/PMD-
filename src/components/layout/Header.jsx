import {
  Bell,
  Menu,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";

export default function Header({
  title,
  eyebrow = "Inventory command center",
  onOpenMenu,
  onRefresh,
  refreshing = false,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search products...",
  hideSearch = false,
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/6 bg-[#06100b]/85 backdrop-blur-2xl">
      <div className="flex min-h-20 items-center gap-3 px-4 sm:px-6 xl:px-8">
        <button
          type="button"
          onClick={onOpenMenu}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/8 bg-white/[0.035] text-[#9bb0a5] transition hover:border-white/15 hover:text-white lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#638071]">
            <Sparkles className="size-3 text-[#f0b84b]" />

            {eyebrow}
          </div>

          <h1 className="mt-1 truncate text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
            {title}
          </h1>
        </div>

        {!hideSearch && (
          <div className="ml-auto hidden w-full max-w-md md:block">
            <label className="flex h-11 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] px-4 transition focus-within:border-[#0d8a4c]/70 focus-within:bg-[#0d8a4c]/[0.06]">
              <Search className="size-[18px] shrink-0 text-[#6f8a7b]" />

              <input
                type="search"
                value={searchValue}
                onChange={(event) =>
                  onSearchChange?.(event.target.value)
                }
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#587064]"
              />

              <kbd className="hidden rounded-lg border border-white/8 bg-white/[0.04] px-2 py-1 text-[10px] text-[#6f8a7b] xl:block">
                LIVE
              </kbd>
            </label>
          </div>
        )}

        <div
          className={`${
            hideSearch ? "ml-auto" : ""
          } flex items-center gap-2`}
        >
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              className="group flex h-10 items-center gap-2 rounded-xl border border-white/8 bg-white/[0.035] px-3 text-xs font-semibold text-[#9db1a6] transition hover:border-[#066839]/60 hover:bg-[#066839]/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:px-4"
            >
              <RefreshCw
                className={`size-4 ${
                  refreshing
                    ? "animate-spin"
                    : "transition group-hover:rotate-45"
                }`}
              />

              <span className="hidden sm:inline">
                {refreshing ? "Refreshing" : "Refresh"}
              </span>
            </button>
          )}

          <button
            type="button"
            className="relative grid size-10 place-items-center rounded-xl border border-white/8 bg-white/[0.035] text-[#8fa79a] transition hover:border-white/15 hover:text-white sm:size-11"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />

            <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-[#f0b84b] shadow-[0_0_10px_rgba(240,184,75,0.7)]" />
          </button>

          <div className="hidden items-center gap-3 rounded-2xl border border-white/7 bg-white/[0.025] py-1.5 pl-1.5 pr-3 sm:flex">
            <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-[#0d8a4c] to-[#064625] text-xs font-bold text-white">
              AP
            </div>

            <div className="hidden xl:block">
              <p className="text-xs font-semibold text-[#e7f0ea]">
                Product Admin
              </p>

              <p className="text-[10px] text-[#617b6d]">
                Operations
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}