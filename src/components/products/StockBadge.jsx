import { getStockTone } from "../../utils/formatters";

export default function StockBadge({ stock }) {
  const tone = getStockTone(stock);

  const styles = {
    healthy:
      "border-[#1d9a5f]/25 bg-[#168956]/10 text-[#62d894]",

    watch:
      "border-[#f0b84b]/20 bg-[#f0b84b]/10 text-[#f0c66f]",

    critical:
      "border-[#c85d56]/20 bg-[#c85d56]/10 text-[#eb8f87]",
  };

  const labels = {
    healthy: "Healthy",
    watch: "Watch",
    critical: "Low stock",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${styles[tone]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />

      {labels[tone]} · {stock}
    </span>
  );
}