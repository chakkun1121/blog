import React from "react";
import { getArticleDataProps } from "../../lib/getArticleData";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import CodeBlock from "../../_components/codeblock";

export function BlogContent({
  data,
  renderFile,
  path,
}: {
  data: getArticleDataProps;
  renderFile: string;
  path: string;
}) {
  return (
    <article className="w-full rounded p-4">
      <h1 className="text-3xl">{data.title}</h1>
      <div>
        <p>
          投稿日:
          {new Date(data?.date || "")?.toLocaleDateString("ja-JP") || "不明"}
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
      <MDXRemote
        source={renderFile}
        components={{
          a: (props) => <a target="_blank" {...props} />,
          img: (p) => {
            const { src, ...rest } = p;
            return (
              <img
                src={
                  src?.startsWith("http")
                    ? src
                    : "./posts/" + path + src?.replace(/^.\//g, "/")
                }
                {...rest}
              />
            );
          },
          h1: ({ children }) => <h1 className="pl-0 text-3xl">{children}</h1>,
          h2: ({ children }) => <h2 className="pl-1 text-2xl">{children}</h2>,
          h3: ({ children }) => <h3 className="pl-2 text-xl">{children}</h3>,
          h4: ({ children }) => <h4 className="pl-3">{children}</h4>,
          h5: ({ children }) => <h5 className="pl-4">{children}</h5>,
          h6: ({ children }) => <h6 className="pl-5">{children}</h6>,
          p: ({ children }) => <p className="pl-6">{children}</p>,
          ul: ({ children }) => <ul className="ml-4">{children}</ul>,
          li: ({ children }) => (
            <li className="list-inside list-disc">{children}</li>
          ),
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
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
    </article>
  );
}
