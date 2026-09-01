import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-arsya.vercel.app"),
  title: {
    default: "Arsya Faturrahman | Mobile Developer & IT Graduate",
    template: "%s | Arsya Faturrahman",
  },
  description:
    "Mobile Developer and IT graduate with a product mindset, building scalable and user-centered digital solutions. Portfolio includes mobile app projects, certifications, and technical work.",
  keywords: [
    "Arsya Faturrahman",
    "Mobile Developer",
    "IT Graduate",
    "Portfolio",
    "Flutter",
    "React Native",
    "Software Engineer",
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
    title: "Arsya Faturrahman | Mobile Developer & IT Graduate",
    description:
      "Portfolio of Arsya Faturrahman, a Mobile Developer and IT graduate focused on building useful, scalable, and business-aligned digital products.",
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
    title: "Arsya Faturrahman | Mobile Developer & IT Graduate",
    description:
      "Portfolio of Arsya Faturrahman, a Mobile Developer and IT graduate focused on scalable, user-centered digital solutions.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 transition-colors">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
