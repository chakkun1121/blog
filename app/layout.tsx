import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { Metadata, Viewport } from "next/types";
import { ReactNode, Suspense } from "react";
import { siteUrl, siteTitle, siteDescription } from "./meta";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: siteTitle,
    images: "/img/home.webp",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    images: "/img/home.webp",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "rss.xml",
    },
  },
  robots: {
    follow: true,
    index: true,
  },
};
export const viewport: Viewport = {
  themeColor: "#fef08a",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      <body className="flex min-h-screen flex-col items-center gap-4">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="w-full flex-1 px-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
