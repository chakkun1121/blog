import React from "react";
import Link from "next/link";
import { getAllArticleData } from "../../lib/getAllArticleData";

export async function ArticleFooter() {
  const recentArticles = await getAllArticleData();
  return (
    <div className="p-4">
      <hr />
      <h2 className="text-2xl">最新の記事5件</h2>
      <ul>
        {recentArticles
          .map((article) => {
            return (
              <li
                key={article.title}
                className="list-inside list-none pl-4 md:list-disc"
              >
                <Link
                  href={article.link}
                  className="m-2 inline-block"
                  key={article.link}
                  target="_blank"
                >
                  {article.title}
                </Link>
              </li>
            );
          })
          .slice(0, 5)}
      </ul>
    </div>
  );
}
