import {
  Activity,
  Boxes,
  CircleAlert,
  Layers3,
} from "lucide-react";

import { formatCategory } from "../../utils/formatters";

export default function InventoryPulse({ products }) {
  const lowStock = products.filter(
    (product) => product.stock <= 10,
  ).length;

  const mediumStock = products.filter(
    (product) =>
      product.stock > 10 && product.stock <= 30,
  ).length;

  const healthyStock = Math.max(
    products.length - lowStock - mediumStock,
    0,
  );

  const denominator = Math.max(products.length, 1);

  const categoryCounts = Object.entries(
    products.reduce((acc, product) => {
      acc[product.category] =
        (acc[product.category] || 0) + 1;

      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <article className="rounded-[26px] border border-white/7 bg-[#0a1710]/82 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#648171]">
              <Activity className="size-4 text-[#39c978]" />

              Stock pulse
            </div>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Inventory health
            </h2>
          </div>

          <div className="rounded-xl border border-[#066839]/25 bg-[#066839]/10 px-3 py-1.5 text-[11px] font-semibold text-[#6ddd9d]">
            Live API dataset
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/6 bg-white/[0.025] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#789083]">
                Healthy
              </span>

              <Boxes className="size-4 text-[#45c985]" />
            </div>

            <p className="mt-2 text-xl font-semibold text-white">
              {healthyStock}
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/6">
              <div
                className="h-full rounded-full bg-[#168956]"
                style={{
                  width: `${
                    (healthyStock / denominator) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/6 bg-white/[0.025] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#789083]">
                Watch
              </span>

              <Layers3 className="size-4 text-[#f0b84b]" />
            </div>

            <p className="mt-2 text-xl font-semibold text-white">
              {mediumStock}
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/6">
              <div
                className="h-full rounded-full bg-[#d69d33]"
                style={{
                  width: `${
                    (mediumStock / denominator) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#d96565]/10 bg-[#d96565]/[0.025] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#9d7b7b]">
                Critical
              </span>

              <CircleAlert className="size-4 text-[#e47a70]" />
            </div>

            <p className="mt-2 text-xl font-semibold text-white">
              {lowStock}
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/6">
              <div
                className="h-full rounded-full bg-[#b94c49]"
                style={{
                  width: `${
                    (lowStock / denominator) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </article>

      <article className="rounded-[26px] border border-white/7 bg-[#0a1710]/82 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#648171]">
              Category mix
            </p>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Top inventory groups
            </h2>
          </div>

          <span className="grid size-10 place-items-center rounded-2xl bg-[#f0b84b]/10 text-[#f0b84b]">
            <Layers3 className="size-[18px]" />
          </span>
        </div>

        <div className="mt-5 space-y-3.5">
          {categoryCounts.map(([category, count]) => (
            <div key={category}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                <span className="truncate text-[#a2b4aa]">
                  {formatCategory(category)}
                </span>

                <span className="font-semibold text-[#dbe7e0]">
                  {count}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#066839] to-[#31b76f]"
                  style={{
                    width: `${Math.max(
                      (count / denominator) * 100 * 3.2,
                      8,
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}