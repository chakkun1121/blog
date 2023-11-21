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
      <body className="flex min-h-screen flex-col">
        <Header />
        <div className="mb-36 mt-14 w-full flex-grow px-6">
          <div className="max-w-container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-12">
            <main className="gap-22 col-span-full flex flex-col">
              {children}
            </main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
