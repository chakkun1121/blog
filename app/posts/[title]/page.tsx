import { notFound, redirect } from "next/navigation";
import { getFile, isMultiplePageArticle } from "./getFile";
import { fileToHTML } from "./fileToHTML";
import { getArticleData } from "./getArticleData";
import ReactHtmlParser from "react-html-parser";
import React from "react";
import { siteTitle } from "../../layout";
import { BlogLayout } from "./BlogLayout";

export default async function PostPage(props: { params: { title: string } }) {
  return await render(props);
}
export async function render({
  params,
}: {
  params: { title: string; page?: number };
}) {
  // 複数ページなのにpageがない場合は./1にリダイレクト
  if (isMultiplePageArticle(params.title) && !params.page) {
    redirect(`/posts/${params.title}/1`);
  }
  // 記事は /posts にある
  // /posts/{folderName}/{fileName}.md という形式である(folderName=title)
  // ただし、複数ページにまたがるものはfileNameが1,2,3,...となっている
  try {
    const file = await getFile(params.title, params.page);
    const html: string = fileToHTML(file);
    const data = await getArticleData(params.title, params.page);
    return (
      <BlogLayout>
        <p>
          投稿日:{new Date(data?.date || "")?.toLocaleDateString() || "不明"}
        </p>
        <>{ReactHtmlParser(html)}</>
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
    const siteUrl = `https://chakkun1121-blog.vercel.app/posts/${params.title}${
      isMultiplePageArticle(params.title) && `/${params.page}`
    }}`;
    return {
      title: data.title,
      description: data.description,
      alternates: {
        canonical: siteUrl,
      },
      openGraph: {
        title: data.title,
        type: "website",
        locale: "ja_JP",
        url: siteUrl,
        siteName: siteTitle,
        images: `./img/${params.title}.webp`,
        description: data.description,
      },
    };
  } catch (e) {
    console.error(e);
  }
}
