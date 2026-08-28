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
  title: "Arsya Faturrahman — Mobile Developer & Software Engineer",
  description: "Portfolio profesional Arsya Faturrahman, fresh graduate IT & Mobile Developer. Membangun aplikasi mobile dan web berstandar industri.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Arsya Faturrahman — Mobile Developer & Software Engineer",
    description: "Portfolio profesional Arsya Faturrahman, fresh graduate IT & Mobile Developer.",
    url: "https://portfolio-arsya.vercel.app",
    siteName: "Arsya Faturrahman Portfolio",
    locale: "id_ID",
    type: "website",
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
