export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-white/7 bg-[#0a1710]/82 p-2.5">
      <div className="aspect-[1.25/1] animate-pulse rounded-[20px] bg-white/[0.045]" />

      <div className="space-y-3 p-3 pt-5">
        <div className="h-2.5 w-20 animate-pulse rounded-full bg-white/[0.05]" />

        <div className="h-4 w-4/5 animate-pulse rounded-full bg-white/[0.055]" />

        <div className="h-4 w-3/5 animate-pulse rounded-full bg-white/[0.045]" />

        <div className="mt-5 h-10 animate-pulse rounded-2xl bg-white/[0.035]" />
      </div>
    </div>
  );
}