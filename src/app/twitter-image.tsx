import { ImageResponse } from "next/og";
import { seoConfig } from "@/config/seo";

export const alt = `${seoConfig.name} — ${seoConfig.occupation}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #09090b 0%, #0c1929 55%, #082f49 100%)",
          color: "#fafafa",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#38bdf8" }}>anuragarya.io</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {seoConfig.name}
          </div>
          <div style={{ fontSize: 34, color: "#a1a1aa" }}>
            {seoConfig.occupation}
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#71717a" }}>
          Portfolio · Case studies · Engineering
        </div>
      </div>
    ),
    { ...size },
  );
}
