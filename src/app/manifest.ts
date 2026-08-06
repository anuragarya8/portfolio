import type { MetadataRoute } from "next";
import { seoConfig } from "@/config/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.title,
    short_name: seoConfig.shortName,
    description: seoConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#0ea5e9",
    lang: seoConfig.language,
    categories: ["portfolio", "productivity", "business"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
