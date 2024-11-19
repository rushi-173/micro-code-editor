interface ShimmerProps {
  className?: string;
}

export function Shimmer({ className = "" }: ShimmerProps) {
  return (
    <div className={`h-4 bg-slate-200 rounded animate-pulse ${className}`} />
  );
}

interface ShimmerLinesProps {
  count?: number;
  className?: string;
  lineClassName?: string;
}

export function ShimmerLines({
  count = 3,
  className = "",
  lineClassName = "w-full",
}: ShimmerLinesProps) {
  return (
    <div className={`space-y-2 p-4 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <Shimmer key={i} className={lineClassName} />
      ))}
    </div>
  );
}
