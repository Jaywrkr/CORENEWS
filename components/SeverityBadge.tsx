import type { Severity } from "@/scripts/fetch-news";

const STYLES: Record<Severity, { label: string; className: string }> = {
  critica: { label: "Crítica", className: "text-danger" },
  alta: { label: "Alta", className: "text-warning" },
  media: { label: "Media", className: "text-ink-400" },
};

export function SeverityBadge({ severity }: { severity?: Severity }) {
  if (!severity) return null;
  const style = STYLES[severity];
  return (
    <span className={`inline-flex items-center gap-1 font-medium ${style.className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {style.label}
    </span>
  );
}
