import type { ThumbVariant, IconName } from "@/data/categories";
import { CategoryIcon } from "./icons";

const VARIANTS: Record<ThumbVariant, { bg: string; icon: string }> = {
  navy: { bg: "bg-navy-950", icon: "text-white/25" },
  accent: { bg: "bg-accent", icon: "text-white/25" },
  ink: { bg: "bg-ink-900", icon: "text-white/25" },
  light: { bg: "bg-ink-50", icon: "text-navy-950/15" },
  "navy-light": { bg: "bg-navy-800", icon: "text-white/25" },
  "ink-light": { bg: "bg-ink-100", icon: "text-navy-950/15" },
};

export function CategoryThumb({
  variant,
  icon,
  className = "",
}: {
  variant: ThumbVariant;
  icon: IconName;
  className?: string;
}) {
  const style = VARIANTS[variant];
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${style.bg} ${className}`}>
      <CategoryIcon name={icon} className={`h-[65%] w-[65%] ${style.icon}`} strokeWidth={1} />
    </div>
  );
}
