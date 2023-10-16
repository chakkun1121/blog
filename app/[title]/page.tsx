import { notFound } from "next/navigation";
import React from "react";
import { siteTitle } from "../layout";
import { BlogLayout } from "./BlogLayout";
import { getArticleData } from "../lib/getArticleData";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { getAllArticleData } from "../lib/getAllArticleData";
import { ArticleFooter } from "./ArticleFooter";
import { Article, WithContext } from "schema-dts";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export default async function PostPage(props: { params: { title: string } }) {
  const basePath = (publicRuntimeConfig && publicRuntimeConfig.basePath) || "";
  try {
    const data = await getArticleData(props.params.title);
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
        <BlogLayout>
          <div>
            <p>
              投稿日:
              {new Date(data?.date || "")?.toLocaleDateString("ja-JP") ||
                "不明"}
            </p>
            <div>
              タグ:
              {data?.tags?.map((tag) => (
                <Link
                  href={basePath + "/tag/" + tag}
                  className="m-2 rounded bg-black p-2 text-white no-underline visited:text-white"
                  key={tag}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <>
            <h1>{data.title}</h1>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeSanitize] as any}
              remarkPlugins={[remarkGfm]}
            >
              {renderFile}
            </ReactMarkdown>
          </>
          <ArticleFooter />
        </BlogLayout>
      </>
    );
  } catch (e) {
    notFound();
  }
}
export async function generateStaticParams() {
  const recentArticles = await getAllArticleData();
  return recentArticles.map((article) => ({
    title: article.link.replace(/\//g, ""),
  }));
}
export async function generateMetadata({ params }) {
  try {
    const data = await getArticleData(params.title);
    const currentSiteUrl = `/${params.title}`;
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
      },
    };
  } catch (e) {
    console.error(e);
  }
}
