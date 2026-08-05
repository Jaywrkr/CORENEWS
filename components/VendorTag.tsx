import { VENDOR_COLORS } from "@/data/vendorColors";

export function VendorTag({ name }: { name: string }) {
  const color = VENDOR_COLORS[name] ?? "#141C70";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-navy-200 bg-navy-50 px-03 py-02 text-xs font-semibold text-navy-800">
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      {name}
    </span>
  );
}
