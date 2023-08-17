import { notFound } from "next/navigation";
import { getFile } from "./getFile";
import { fileToHTML } from "./fileToHTML";
import ReactHtmlParser from "react-html-parser";
import { postType } from "../../../@types/postType";
export default async function PostPage(props: { params: { title: string } }) {
  return await render(props);
}
export async function render({
  params,
}: {
  params: { title: string; page?: number };
}) {
  // 記事は /posts にある
  // /posts/{folderName}/{fileName}.md という形式である(folderName=title)
  // ただし、複数ページにまたがるものはfileNameが1,2,3,...となっている
  try {
    const file = await getFile(params.title, params.page);
    const { html, data }: { html: string; data: postType } = fileToHTML(file);
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
  try {
    const file = await getFile(params.title, params.page);
    const { data }: { data: postType } = fileToHTML(file);
    const siteUrl = "https://chakkun1121-blog.vercel.app/posts/" + params.title;
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
  } catch (e) {}
}
import React, { ReactNode } from "react";
import { siteTitle } from "../../layout";

function BlogLayout({ children }: { children: React.ReactNode }) {
  // childrenの中身(ReactNode)をバラす
  // <><>{data}</><>{content}</></> を <>{data}</> <>{content}</> にする
  const [data, content]: ReactNode[] = React.Children.toArray(children);
  return (
    <>
      <div>{data}</div>
      <article className="p-2">{content}</article>
    </>
  );
}
