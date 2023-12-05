import "./global.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import GoogleAnalytics from "./_components/GoogleAnalytics";
import { Metadata, Viewport } from "next/types";
import { Suspense } from "react";
import { siteUrl, siteTitle, siteDescription } from "./meta";

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

export default function Layout({ children }) {
  return (
    <html lang="ja">
      <Suspense fallback={<></>}>
        <GoogleAnalytics />
      </Suspense>
      <body className="flex min-h-screen flex-col items-center gap-4">
        <Header />
        <main className="flex-1 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
