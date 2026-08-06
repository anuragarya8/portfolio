import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AnimationProvider } from "@/components/animations/AnimationProvider";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { defaultMetadata } from "@/lib/metadata";
import {
  contactPageJsonLd,
  jsonLdScript,
  organizationJsonLd,
  personJsonLd,
  profilePageJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript([
            personJsonLd(),
            organizationJsonLd(),
            websiteJsonLd(),
            profilePageJsonLd(),
            contactPageJsonLd(),
          ])}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AnalyticsProvider>
            <AnimationProvider>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:shadow-soft"
              >
                Skip to content
              </a>
              <CustomCursor />
              <SiteHeader />
              <ErrorBoundary>
                <main id="main">{children}</main>
              </ErrorBoundary>
              <SiteFooter />
            </AnimationProvider>
          </AnalyticsProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
