import type { Metadata } from "next";
import { absoluteUrl, seoConfig, sameAsLinks } from "@/config/seo";
import type { Project } from "@/types";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description = seoConfig.description,
  path = "/",
  image = seoConfig.ogImage,
  imageAlt = `${seoConfig.name} — ${seoConfig.occupation}`,
  type = "website",
  noIndex = false,
  keywords = [...seoConfig.keywords],
}: BuildMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);
  const fullTitle = title
    ? `${title} · ${seoConfig.name}`
    : seoConfig.title;

  return {
    title: title
      ? title
      : {
          default: seoConfig.title,
          template: seoConfig.titleTemplate,
        },
    description,
    applicationName: seoConfig.name,
    authors: [{ name: seoConfig.name, url: seoConfig.url }],
    creator: seoConfig.name,
    publisher: seoConfig.name,
    generator: "Next.js",
    category: seoConfig.category,
    keywords,
    metadataBase: new URL(seoConfig.url),
    alternates: {
      canonical: path,
      languages: {
        "en-IN": path,
        en: path,
      },
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      locale: seoConfig.locale,
      url,
      title: fullTitle,
      description,
      siteName: seoConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      ...(seoConfig.twitterHandle
        ? {
            creator: seoConfig.twitterHandle,
            site: seoConfig.twitterHandle,
          }
        : {}),
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: seoConfig.name,
      statusBarStyle: "default",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    verification: {
      ...(seoConfig.verification.google
        ? { google: seoConfig.verification.google }
        : {}),
      ...(seoConfig.verification.yandex
        ? { yandex: seoConfig.verification.yandex }
        : {}),
      other: {
        ...(seoConfig.verification.bing
          ? { "msvalidate.01": seoConfig.verification.bing }
          : {}),
        ...(seoConfig.verification.pinterest
          ? { "p:domain_verify": seoConfig.verification.pinterest }
          : {}),
      },
    },
  };
}

export function projectMetadata(project: Project): Metadata {
  const description = `${project.tagline} ${project.problem.slice(0, 120)}… Built with ${project.stack.slice(0, 5).join(", ")}.`;
  return buildMetadata({
    title: project.title,
    description,
    path: `/projects/${project.slug}`,
    image: project.image ?? seoConfig.ogImage,
    imageAlt: `${project.title} — project by ${seoConfig.name}`,
    type: "article",
    keywords: [
      project.title,
      ...project.stack,
      "Case Study",
      "Portfolio Project",
      seoConfig.name,
      "Full Stack Developer",
    ],
  });
}

export function jsonLdScript(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: seoConfig.name,
    url: seoConfig.url,
    image: absoluteUrl(seoConfig.avatar),
    jobTitle: seoConfig.occupation,
    description: seoConfig.description,
    email: seoConfig.email,
    nationality: "Indian",
    address: {
      "@type": "PostalAddress",
      addressCountry: seoConfig.location.countryCode,
      addressLocality: seoConfig.location.country,
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Full Stack Development",
      "Web Performance",
      "UI Engineering",
    ],
    sameAs: sameAsLinks(),
    worksFor: {
      "@type": "Organization",
      name: "ToBa Tech",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: seoConfig.name,
    url: seoConfig.url,
    logo: absoluteUrl(seoConfig.avatar),
    founder: { "@id": absoluteUrl("/#person") },
    sameAs: sameAsLinks(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "business",
        email: seoConfig.email,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: seoConfig.name,
    url: seoConfig.url,
    description: seoConfig.description,
    inLanguage: seoConfig.language,
    publisher: { "@id": absoluteUrl("/#person") },
    author: { "@id": absoluteUrl("/#person") },
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profile"),
    url: seoConfig.url,
    name: seoConfig.title,
    description: seoConfig.description,
    inLanguage: seoConfig.language,
    mainEntity: { "@id": absoluteUrl("/#person") },
    isPartOf: { "@id": absoluteUrl("/#website") },
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": absoluteUrl("/#contact-page"),
    url: absoluteUrl("/#contact"),
    name: `Contact ${seoConfig.name}`,
    description: `Contact ${seoConfig.name} for freelance software engineering, Next.js development, and full-stack product work.`,
    mainEntity: { "@id": absoluteUrl("/#person") },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": absoluteUrl(`/projects/${project.slug}#project`),
    name: project.title,
    description: project.tagline,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: project.image
      ? absoluteUrl(project.image)
      : absoluteUrl(seoConfig.ogImage),
    programmingLanguage: project.stack,
    author: { "@id": absoluteUrl("/#person") },
    creator: { "@id": absoluteUrl("/#person") },
    codeRepository: project.links.find((l) => l.label === "GitHub")?.href,
    about: project.problem,
    keywords: project.stack.join(", "),
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": absoluteUrl("/#person") },
    inLanguage: seoConfig.language,
  };
}
