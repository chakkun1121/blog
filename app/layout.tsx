import { Metadata } from "next";
import "./global.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { env } from "process";
import GoogleAnalytics from "./_components/GoogleAnalytics";

export const siteTitle = "chakkun1121's blog | chakkun1121";
export const siteDescription =
  "和訳表示サイトなど個人開発を行っているchakkun1121のブログです。";
export const isDevMode = process.env.NODE_ENV === "development";
export const siteUrl = isDevMode
  ? env.LOCAL_HOST_URL || "http://localhost:2222"
  : "https://chakkun1121.github.io/blog";
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
  themeColor:"#fef08a"
};
export default function Layout({ children }) {
  return (
    <html lang="ja">
      <GoogleAnalytics />
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
