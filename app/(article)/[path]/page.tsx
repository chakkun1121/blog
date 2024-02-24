import { notFound } from "next/navigation";
import React from "react";
import { getArticleData } from "../../lib/getArticleData";
import { getAllArticleData } from "../../lib/getAllArticleData";
import { ArticleFooter } from "./ArticleFooter";
import { Article, WithContext } from "schema-dts";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { BlogContent } from "./BlogContent";
import { BlogShareButton } from "./BlogShareButton";
import { Metadata } from "next";

export default async function PostPage({
  params: { path },
}: {
  params: { path: string };
}) {
  const basePath = (publicRuntimeConfig && publicRuntimeConfig.basePath) || "";
  try {
    const data = await getArticleData(path);
    // mdのheader部分を除去したファイルを準備する
    const renderFile: string = data.file.replace(/^---[\s\S]*?---/, "");
    const jsonLd: WithContext<Article> = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.description,
      datePublished: data.date,
      image: data.image || basePath + "/img/no-image.webp",
      author: {
        "@type": "Person",
        name: "chakkun1121",
        url: "https://chakkun1121.github.io/",
      },
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex w-full flex-col-reverse justify-center gap-4 md:flex-row">
          <BlogShareButton url={basePath + path} />
          <div className="flex w-full max-w-6xl flex-col gap-4">
            <BlogContent data={data} renderFile={renderFile} path={path} />
            <ArticleFooter />
          </div>
        </div>
      </>
    );
  } catch (e) {
    notFound();
  }
}
export async function generateStaticParams(): Promise<{ path: string }[]> {
  const allArticles = await getAllArticleData();
  return allArticles.map((article) => {
    return { path: article.link.replace("/", "") };
  });
}
export async function generateMetadata({
  params: { path },
}): Promise<Metadata> {
  const data = await getArticleData(path);
  const currentSiteUrl = `/${path}`;
  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: currentSiteUrl,
    },
    openGraph: {
      title: data.title,
      type: "website",
      locale: "ja_JP",
      url: currentSiteUrl,
      description: data.description,
      images: [`${currentSiteUrl}/og.png`],
    },
  };
}
