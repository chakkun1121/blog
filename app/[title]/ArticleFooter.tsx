import React from "react";
import Link from "next/link";
import { getAllArticleData } from "../lib/getAllArticleData";

export async function ArticleFooter() {
  const recentArticles = await getAllArticleData();
  return (
    <div className="m-2 rounded bg-gray-200 p-2">
      <h2>最新の記事5件</h2>
      <ul>
        {recentArticles
          .map((article) => {
            return (
              <li>
                <Link
                  href={"../" + article.link}
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