import React from "react";
import Link from "next/link";
import { getAllArticleData } from "../../../lib/getAllArticleData";

export async function ArticleFooter() {
  const recentArticles = await getAllArticleData();
  return (
    <div className="rounded bg-gray-100 p-4">
      <h2>最新の記事5件</h2>
      <ul>
        {recentArticles
          .map((article) => {
            return (
              <li key={article.title} className="list-none md:list-disc	">
                <Link
                  href={article.link}
                  className="m-2 inline-block text-L"
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
