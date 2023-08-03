import { Metadata } from "next";
import "./global.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
const siteTitle = "chakkun1121's blog | chakkun1121";
const siteDescription =
  "和訳表示サイトなど個人開発を行っているchakkun1121のブログです。";
const siteUrl = "https://chakkun1121-blog.vercel.app/";
export const metadata: Metadata = {
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
    images: "./img/home.webp",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: siteUrl,
  },
};
export default function Layout({ children }) {
  return (
    <html lang="ja" className="">
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
