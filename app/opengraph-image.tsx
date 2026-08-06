import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CoreNews — Inteligencia diaria para Coresolutions";

export default function Image() {
  const c1 = "#2B3EF0";
  const c2 = "#5C68C9";
  const c3 = "#141C70";

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
                width: 48,
                height: 48,
                background: "#050B38",
                color: "white",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              C
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "white", letterSpacing: 1 }}>
              CORE<span style={{ fontWeight: 400, opacity: 0.75 }}>NEWS</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span
              style={{
                display: "flex",
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: 3,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Inteligencia diaria para Coresolutions
            </span>
            <div
              style={{
                display: "flex",
                fontSize: 52,
                fontWeight: 600,
                color: "white",
                lineHeight: 1.15,
                maxWidth: 1000,
              }}
            >
              Infraestructura, ciberseguridad y nube — filtrado para lo que Core implementa.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
