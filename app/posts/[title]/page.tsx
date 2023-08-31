import { notFound } from "next/navigation";
import React from "react";
import { siteTitle, siteUrl } from "../../layout";
import { BlogLayout } from "./BlogLayout";
import { isMultiplePageArticle } from "../../lib/isMultiplePageArticle";
import { getArticleData } from "../../lib/api/getArticleData";
import { getFile } from "../../lib/api/getFile";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
export default async function PostPage(props: { params: { title: string } }) {
  return await render(props);
}
export async function render({
  params,
}: {
  params: { title: string; page?: number };
}) {
  try {
    const file: string = await getFile(params.title, params.page);
    const data = await getArticleData(params.title, params.page);
    // mdのheader部分を除去したファイルを準備する
    const renderFile: string = file.replace(/^---[\s\S]*?---/, "");
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
export async function generateMetadata({ params }) {
  // Todo: 何故か複数ページの場合はリダイレクト後に機能しない
  try {
    const data = await getArticleData(params.title, params.page);
    const currentSiteUrl = `${siteUrl}/posts/${params.title}${
      isMultiplePageArticle(params.title) && `/${params.page}`
    }}`;
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
        images: `./img/${params.title}.webp`,
        description: data.description,
      },
    };
  } catch (e) {
    console.error(e);
  }
}
