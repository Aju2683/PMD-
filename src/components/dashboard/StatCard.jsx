import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  accent = "green",
}) {
  const accentClasses = {
    green:
      "bg-[#066839]/16 text-[#35cc79] ring-[#066839]/20",

    gold:
      "bg-[#f0b84b]/12 text-[#f0b84b] ring-[#f0b84b]/15",

    mint:
      "bg-[#79d4a0]/10 text-[#8bdcae] ring-[#79d4a0]/15",

    slate:
      "bg-white/[0.055] text-[#a4b8ad] ring-white/8",
  };

  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-white/7 bg-[#0a1710]/82 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-0.5 hover:border-[#066839]/30">
      <div className="absolute -right-10 -top-12 size-28 rounded-full bg-[#066839]/[0.045] blur-2xl transition group-hover:bg-[#066839]/10" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#718a7d]">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-[28px]">
            {value}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#657d70]">
            <ArrowUpRight className="size-3.5 text-[#3db979]" />

            {helper}
          </div>
        </div>

        <div
          className={`grid size-11 shrink-0 place-items-center rounded-2xl ring-1 ${
            accentClasses[accent]
          }`}
        >
          <Icon
            className="size-5"
            strokeWidth={1.9}
          />
        </div>
      </div>
    </article>
  );
}