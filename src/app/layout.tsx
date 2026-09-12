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

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-arsya.vercel.app"),
  title: {
    default: "Arsya Faturrahman | Software Engineer, BD & Creative Lead",
    template: "%s | Arsya Faturrahman",
  },
  description:
    "Official portfolio of Arsya Faturrahman — Software Engineer, Mobile Developer, Business Development, and Creative Lead with a product mindset.",
  keywords: [
    "Arsya Faturrahman",
    "Mobile Developer",
    "Business Development",
    "Creative Lead",
    "Software Engineer",
    "Informatics Graduate",
    "Flutter",
    "Next.js",
    "BNSP Certified",
    "Indonesia",
  ],
  authors: [{ name: "Arsya Faturrahman" }],
  creator: "Arsya Faturrahman",
  publisher: "Arsya Faturrahman",
  alternates: {
    canonical: "https://portfolio-arsya.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Arsya Faturrahman | Software Engineer, BD & Creative Lead",
    description:
      "Portfolio of Arsya Faturrahman, a Software Engineer, Mobile Developer, Business Development & Creative Lead focused on scalable digital products.",
    url: "https://portfolio-arsya.vercel.app",
    siteName: "Arsya Faturrahman Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/assets/photos/Photo Profile.png",
        width: 1200,
        height: 630,
        alt: "Arsya Faturrahman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arsya Faturrahman | Software Engineer, BD & Creative Lead",
    description:
      "Portfolio of Arsya Faturrahman, specializing in empirical benchmark engines, mobile apps, Machine Learning systems, and creative campaigns.",
    images: ["/assets/photos/Photo Profile.png"],
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
