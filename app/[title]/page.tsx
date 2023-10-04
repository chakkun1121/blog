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
export default async function PostPage(props: { params: { title: string } }) {
  try {
    const data = await getArticleData(props.params.title);
    // mdのheader部分を除去したファイルを準備する
    const renderFile: string = data.file.replace(/^---[\s\S]*?---/, "");
    return (
      <BlogLayout>
        <div>
          <p>
            投稿日:
            {new Date(data?.date || "")?.toLocaleDateString("ja-JP") || "不明"}
          </p>
          <div>
            タグ:
            {data?.tags?.map((tag) => (
              <Link
                href={"../tag/" + tag}
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
        siteName: siteTitle,
        description: data.description,
      },
    };
  } catch (e) {
    console.error(e);
  }
}
