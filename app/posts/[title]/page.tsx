import { notFound } from "next/navigation";
import React from "react";
import { siteTitle } from "../../layout";
import { BlogLayout } from "./BlogLayout";
import { getArticleData } from "../../lib/getArticleData";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { getRecentArticles } from "../../lib/getRecentArticles";
export default async function PostPage(props: { params: { title: string } }) {
  try {
    const data = await getArticleData(props.params.title);
    // mdのheader部分を除去したファイルを準備する
    const renderFile: string = data.file.replace(/^---[\s\S]*?---/, "");
    return (
      <BlogLayout>
        <p>
          投稿日:{new Date(data?.date || "")?.toLocaleDateString() || "不明"}
        </p>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize] as any}
          remarkPlugins={[remarkGfm]}
        >
          {renderFile}
        </ReactMarkdown>
      </BlogLayout>
    );
  } catch (e) {
    notFound();
  }
}
export async function generateStaticParams() {
  const recentArticles = await getRecentArticles();
  return recentArticles.map((article) => ({
    title: article.link.replace(/\/posts\//, ""),
  }));
}
export async function generateMetadata({ params }) {
  try {
    const data = await getArticleData(params.title);
    const currentSiteUrl = `/posts/${params.title}`;
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
