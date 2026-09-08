import {
  Boxes,
  ChartSpline,
  ChevronRight,
  CircleGauge,
  Layers3,
  PackageOpen,
  Radar,
  ScanLine,
  Settings2,
  ShoppingBag,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Command",
    description: "Dashboard overview",
    icon: CircleGauge,
    path: "/",
  },
  {
    name: "Catalog",
    description: "All products",
    icon: PackageOpen,
    path: "/",
  },
  {
    name: "Stock Radar",
    description: "Inventory health",
    icon: Radar,
    path: "/",
  },
  {
    name: "Categories",
    description: "Product groups",
    icon: Layers3,
    path: "/",
  },
  {
    name: "Performance",
    description: "Product insights",
    icon: ChartSpline,
    path: "/",
  },
];

function SidebarContent({ onClose }) {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* LOGO AREA */}
      <div className="px-5 pb-5 pt-5">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="relative grid size-12 place-items-center rounded-[18px] bg-[#E9F5EE]">
              <ShoppingBag
                className="size-6 text-[#066839]"
                strokeWidth={2}
              />

              <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-[#08110C] bg-[#DCA94A]" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#648071]">
                Inventory OS
              </p>

              <h2 className="mt-0.5 text-[19px] font-semibold tracking-tight text-white">
                Stockora
              </h2>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-xl text-[#82978B] transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* SMALL STATUS */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between rounded-[18px] bg-[#0C1C13] px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#41C981] opacity-50" />

              <span className="relative inline-flex size-2.5 rounded-full bg-[#41C981]" />
            </span>

            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#567163]">
                API Status
              </p>

              <p className="mt-0.5 text-xs font-semibold text-[#B8C8BF]">
                Live & Connected
              </p>
            </div>
          </div>

          <ScanLine className="size-4 text-[#537565]" />
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="mt-5 flex-1 space-y-2 px-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          const isActive =
            index === 0 && location.pathname === "/";

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={`group relative flex items-center gap-3 rounded-[18px] px-3 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-[#EAF4EE] text-[#07110C]"
                  : "text-[#7F9689] hover:bg-white/[0.045] hover:text-white"
              }`}
            >
              {/* ACTIVE MARK */}
              {isActive && (
                <span className="absolute -left-[3px] h-7 w-1 rounded-r-full bg-[#DCA94A]" />
              )}

              <div
                className={`grid size-10 shrink-0 place-items-center rounded-[14px] transition ${
                  isActive
                    ? "bg-[#066839] text-white shadow-[0_8px_20px_rgba(6,104,57,0.25)]"
                    : "bg-[#102219] text-[#718D7D] group-hover:bg-[#143021] group-hover:text-[#53CE8A]"
                }`}
              >
                <Icon className="size-[18px]" strokeWidth={1.9} />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-[13px] font-semibold ${
                    isActive ? "text-[#07110C]" : ""
                  }`}
                >
                  {item.name}
                </p>

                <p
                  className={`mt-0.5 truncate text-[10px] ${
                    isActive
                      ? "text-[#597064]"
                      : "text-[#50695C]"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              <ChevronRight
                className={`size-4 transition-all ${
                  isActive
                    ? "translate-x-0 text-[#066839]"
                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM PANEL */}
      <div className="p-4">
        <div className="overflow-hidden rounded-[22px] bg-[#0D1D14]">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="grid size-9 place-items-center rounded-xl bg-[#DCA94A]/10 text-[#DCA94A]">
                <Boxes className="size-4" />
              </div>

              <span className="rounded-full bg-[#066839]/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#5ED493]">
                Synced
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold text-[#DDE8E2]">
              Product Database
            </p>

            <p className="mt-1 text-[10px] leading-5 text-[#60786B]">
              Inventory data powered by DummyJSON REST services.
            </p>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#066839] to-[#35C879]" />
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-between border-t border-white/6 px-4 py-3 text-[11px] font-medium text-[#82988C] transition hover:bg-white/[0.025] hover:text-white"
          >
            <span className="flex items-center gap-2">
              <Settings2 className="size-4" />
              Settings
            </span>

            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {/* DESKTOP */}
      <aside className="fixed bottom-4 left-4 top-4 z-40 hidden w-[236px] overflow-hidden rounded-[30px] border border-white/[0.07] bg-[#07110C]/95 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:block">
        <SidebarContent />
      </aside>

      {/* MOBILE */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label="Close menu"
          />

          <aside className="relative h-full w-[280px] border-r border-white/8 bg-[#07110C] shadow-2xl">
            <SidebarContent
              onClose={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}
    </>
  );
}