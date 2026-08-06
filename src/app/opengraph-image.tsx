import { ImageResponse } from "next/og";
import { seoConfig } from "@/config/seo";

export const alt = `${seoConfig.name} — ${seoConfig.occupation}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            color: "#38bdf8",
            letterSpacing: "-0.02em",
          }}
        >
          anuragarya.io
        </div>

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
          <div
            style={{
              fontSize: 34,
              color: "#a1a1aa",
              letterSpacing: "-0.02em",
            }}
          >
            {seoConfig.occupation}
          </div>
          <div
            style={{
              marginTop: 8,
              maxWidth: 820,
              fontSize: 26,
              color: "#d4d4d8",
              lineHeight: 1.4,
            }}
          >
            Next.js · React · TypeScript · Node.js · Scalable web apps
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#71717a",
          }}
        >
          <span>Portfolio · Case studies · Engineering</span>
          <span
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid #38bdf8",
              color: "#38bdf8",
            }}
          >
            Available for hire
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
