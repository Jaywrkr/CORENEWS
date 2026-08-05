import { ImageResponse } from "next/og";
import { getNews } from "@/lib/getNews";
import { getCategory } from "@/data/categories";
import { pickMeshColors } from "@/data/vendorColors";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CoreNews";

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

export default async function Image({ params }: { params: { id: string } }) {
  const { items } = await getNews();
  const item = items.find((i) => i.id === params.id);

  const category = item ? getCategory(item.category) : undefined;
  const [c1, c2, c3] = item
    ? pickMeshColors(item.tags, item.category)
    : ["#3C48AD", "#5C68C9", "#141C70"];
  const title = truncate(item?.title ?? "CoreNews — Inteligencia diaria para Coresolutions", 110);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#3C48AD",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: 900,
            height: 900,
            left: -220,
            top: -320,
            borderRadius: 9999,
            backgroundImage: `radial-gradient(circle, ${c1} 0%, rgba(1,9,92,0) 60%)`,
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: 900,
            height: 900,
            right: -260,
            top: -360,
            borderRadius: 9999,
            backgroundImage: `radial-gradient(circle, ${c2} 0%, rgba(1,9,92,0) 60%)`,
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: 900,
            height: 900,
            left: 260,
            bottom: -520,
            borderRadius: 9999,
            backgroundImage: `radial-gradient(circle, ${c3} 0%, rgba(1,9,92,0) 65%)`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            width: "100%",
            height: "100%",
            padding: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                background: "#050B38",
                color: "white",
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              C
            </div>
            <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "white", letterSpacing: 1 }}>
              CORE<span style={{ fontWeight: 400, opacity: 0.75 }}>NEWS</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span
                style={{
                  display: "flex",
                  fontSize: 18,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {category?.short ?? "Core"}
              </span>
              {item?.severity && (
                <span
                  style={{
                    display: "flex",
                    fontSize: 15,
                    textTransform: "uppercase",
                    padding: "6px 16px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.18)",
                    color: "white",
                  }}
                >
                  {item.severity}
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 54,
                fontWeight: 600,
                color: "white",
                lineHeight: 1.15,
                maxWidth: 1020,
              }}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
