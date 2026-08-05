import type { CategorySlug } from "@/data/categories";
import { pickMeshColors } from "@/data/vendorColors";

export function MeshThumb({
  tags,
  category,
  className = "",
}: {
  tags: string[];
  category: CategorySlug;
  className?: string;
}) {
  const [c1, c2, c3] = pickMeshColors(tags, category);

  return (
    <div
      className={`grain relative overflow-hidden ${className}`}
      style={{
        backgroundColor: "#3C48AD",
        backgroundImage: `radial-gradient(at 18% 22%, ${c1} 0px, transparent 58%), radial-gradient(at 82% 12%, ${c2} 0px, transparent 55%), radial-gradient(at 55% 92%, ${c3} 0px, transparent 62%), radial-gradient(at 5% 90%, ${c1} 0px, transparent 45%)`,
      }}
    />
  );
}
