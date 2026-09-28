import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { BackgroundGlow } from "@/components/layout/BackgroundGlow";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

import { portfolioConfig } from "@/config/portfolio.config";

export const metadata: Metadata = {
  metadataBase: new URL(portfolioConfig.seo.siteUrl),
  title: {
    default: portfolioConfig.seo.siteTitle,
    template: portfolioConfig.seo.titleTemplate,
  },
  description: portfolioConfig.seo.description,
  keywords: portfolioConfig.seo.keywords,
  authors: [{ name: portfolioConfig.personal.name }],
  creator: portfolioConfig.personal.name,
  publisher: portfolioConfig.personal.name,
  alternates: {
    canonical: portfolioConfig.seo.siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: portfolioConfig.seo.siteTitle,
    description: portfolioConfig.seo.description,
    url: portfolioConfig.seo.siteUrl,
    siteName: `${portfolioConfig.personal.name} Portfolio`,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: portfolioConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: portfolioConfig.personal.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioConfig.seo.siteTitle,
    description: portfolioConfig.seo.description,
    images: [portfolioConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`dark ${outfit.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col transition-colors selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
        <ThemeProvider>
          <BackgroundGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
