import type { CategorySlug } from "@/data/categories";
import { pickMeshColors } from "@/data/vendorColors";

/** Delay negativo determinístico para que no todas las miniaturas "respiren" en sincro. */
function seedDelay(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 20;
  }
  return -hash;
}

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
  const delay = seedDelay(category + tags.join(""));

  return (
    <div className={`grain relative overflow-hidden ${className}`}>
      <div
        className="mesh-field absolute -inset-[20%]"
        style={{
          backgroundColor: "#3C48AD",
          backgroundImage: `radial-gradient(at 18% 22%, ${c1} 0px, transparent 58%), radial-gradient(at 82% 12%, ${c2} 0px, transparent 55%), radial-gradient(at 55% 92%, ${c3} 0px, transparent 62%), radial-gradient(at 5% 90%, ${c1} 0px, transparent 45%)`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}
