import { MetadataRoute } from "next";
import { getAllArticleData } from "./lib/getAllArticleData";
import { siteUrl } from "./meta";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recentArticles = await getAllArticleData();
  // isShowがfalseの記事は除外する
  recentArticles.filter((post) => post.isShow);
  return [
    {
      url: `${siteUrl}/`,
    },
    ...recentArticles.map((post) => ({
      url: `${siteUrl}${post.link}`.replace(/\/$/, ""),
      lastModified: post.date,
    })),
  ];
}
