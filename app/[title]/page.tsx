import { notFound } from "next/navigation";
import React from "react";
import { BlogLayout } from "./BlogLayout";
import { getArticleData } from "../lib/getArticleData";
import Link from "next/link";
import { getAllArticleData } from "../lib/getAllArticleData";
import { ArticleFooter } from "./ArticleFooter";
import { Article, WithContext } from "schema-dts";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

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
            <ul className="flex flex-wrap gap-4 py-4">
              {data?.tags?.map((tag) => (
                <li key={tag} className="list-none">
                  <Link
                    href={"./tag/" + tag}
                    className="rounded bg-green-300 p-2 text-black no-underline visited:text-black"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <>
            <h1>{data.title}</h1>
            <MDXRemote
              source={renderFile}
              components={{
                a: (props) => <a target="_blank" {...props} />,
                img: (p) => {
                  const { src, ...rest } = p;
                  return (
                    <img
                      src={
                        src.startsWith("http")
                          ? src
                          : "./posts/" +
                            props.params.title +
                            src.replace(/^.\//g, "/")
                      }
                      {...rest}
                    />
                  );
                },
                h1: ({ children }) => <h1 className="pl-0">{children}</h1>,
                h2: ({ children }) => <h2 className="pl-1">{children}</h2>,
                h3: ({ children }) => <h3 className="pl-2">{children}</h3>,
                h4: ({ children }) => <h4 className="pl-3">{children}</h4>,
                h5: ({ children }) => <h5 className="pl-4">{children}</h5>,
                h6: ({ children }) => <h6 className="pl-5">{children}</h6>,
                p: ({ children }) => <p className="pl-6">{children}</p>,
                ul: ({ children }) => <ul className="ml-4">{children}</ul>,
                li: ({ children }) => (
                  <li className="list-inside list-disc">{children}</li>
                ),
                pre: ({ children }) => (
                  <pre className="m-8 overflow-x-auto rounded-md border border-gray-300 bg-gray-100 p-2">
                    {children}
                  </pre>
                ),
                table: ({ children }) => (
                  <table className="block overflow-x-scroll whitespace-nowrap pl-4 ">
                    {children}
                  </table>
                ),
              }}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  // rehypePlugins: [require("rehype-slug")],
                },
              }}
            />
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
