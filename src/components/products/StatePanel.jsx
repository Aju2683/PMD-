import {
  AlertTriangle,
  PackageSearch,
  RefreshCw,
} from "lucide-react";

export default function StatePanel({
  type = "empty",
  title,
  message,
  onRetry,
}) {
  const isError = type === "error";

  const Icon = isError
    ? AlertTriangle
    : PackageSearch;

  return (
    <div className="rounded-[28px] border border-dashed border-white/10 bg-[#0a1710]/55 px-6 py-14 text-center">
      <div
        className={`mx-auto grid size-14 place-items-center rounded-2xl ${
          isError
            ? "bg-[#bd5d55]/10 text-[#e4847b]"
            : "bg-[#066839]/12 text-[#5bd08c]"
        }`}
      >
        <Icon className="size-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-white">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#71877b]">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#066839] px-4 text-xs font-semibold text-white transition hover:bg-[#0b7e45]"
        >
          <RefreshCw className="size-4" />

          Try again
        </button>
      )}
    </div>
  );
}