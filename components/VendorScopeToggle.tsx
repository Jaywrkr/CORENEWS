export type VendorScope = "core" | "other";

const OPTIONS: { value: VendorScope; label: string }[] = [
  { value: "core", label: "Marcas Core" },
  { value: "other", label: "Otras marcas" },
];

function scopeButtonClass(active: boolean) {
  return `flex-1 px-05 py-03 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 ${
    active
      ? "bg-navy-950 text-white dark:bg-white dark:text-navy-950"
      : "text-ink-700 hover:bg-navy-100 dark:text-ink-300 dark:hover:bg-ink-800"
  }`;
}

export function VendorScopeToggle({
  scope,
  onChange,
}: {
  scope: VendorScope;
  onChange: (scope: VendorScope) => void;
}) {
  return (
    <>
      {/* Desktop/tablet: segmented control inline con el resto de los controles */}
      <div className="hairline mb-04 hidden shrink-0 overflow-hidden sm:inline-flex">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={scopeButtonClass(scope === opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Mobile: barra fija abajo, fuera del flujo del contenido */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink-200 bg-white pb-[env(safe-area-inset-bottom)] dark:border-ink-800 dark:bg-ink-950 sm:hidden">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 px-05 py-04 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950 ${
              scope === opt.value
                ? "bg-navy-950 text-white dark:bg-white dark:text-navy-950"
                : "text-ink-700 dark:text-ink-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </>
  );
}
