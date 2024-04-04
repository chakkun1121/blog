import React from "react";
import { getArticleDataProps } from "../../lib/getArticleData";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import CodeBlock from "../../_components/codeblock";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <article className="w-full p-4">
      <h1 className="text-3xl">{data.title}</h1>
      <div>
        <p>
          投稿日:
          {new Date(data?.date || "")?.toLocaleDateString("ja-JP") || "不明"}
        </p>
        <div className="flex flex-wrap gap-4 py-4">
          {data?.tags?.map((tag) => (
            <Button key={tag} className="list-none" asChild>
              <Link href={"./tag/" + tag}>{tag}</Link>
            </Button>
          ))}
        </div>
      </div>
      <MDXRemote
        source={renderFile}
        components={{
          a: (props) => <a target="_blank" {...props} />,
          img: ({ src, className, ...rest }) => {
            return (
              <img
                src={
                  src?.startsWith("http")
                    ? src
                    : "./posts/" + path + src?.replace(/^.\//g, "/")
                }
                className={cn("max-h-full max-w-full rounded", className)}
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
          p: ({ children }) => (
            <p className="pl-6 leading-normal">{children}</p>
          ),
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
