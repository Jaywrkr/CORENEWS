import type { Severity } from "@/scripts/fetch-news";

const STYLES: Record<Severity, { label: string; className: string }> = {
  critica: { label: "Crítica", className: "border-danger/30 bg-danger/10 text-danger" },
  alta: { label: "Alta", className: "border-warning/40 bg-warning/10 text-warning" },
  media: { label: "Media", className: "border-ink-300 bg-ink-100 text-ink-600" },
};

export function SeverityBadge({ severity }: { severity?: Severity }) {
  if (!severity) return null;
  const style = STYLES[severity];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill border px-03 py-02 text-xs font-semibold uppercase tracking-wide ${style.className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {style.label}
    </span>
  );
}
