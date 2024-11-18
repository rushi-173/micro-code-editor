import { cn } from "@/utils/tailwind";

interface CollapsibleSectionProps {
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function CollapsibleSection({
  title,
  isCollapsed,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <button
        className="flex items-center p-1 hover:bg-slate-100 text-xs"
        onClick={onToggle}
      >
        <span
          className="transform transition-transform duration-200"
          style={{
            transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
        <span className="ml-2">{title}</span>
      </button>
      <div
        className={cn(
          "w-full transition-all duration-200 overflow-hidden",
          isCollapsed ? "h-0" : "h-full"
        )}
      >
        {children}
      </div>
    </div>
  );
}
