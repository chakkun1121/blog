import { MetadataRoute } from "next";
import { siteUrl } from "./layout";
import { getAllArticleData } from "./lib/getAllArticleData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recentArticles = await getAllArticleData();
  // isShowがfalseの記事は除外する
  recentArticles.filter((post) => post.isShow);
  return recentArticles.map((post) => ({
    url: `${siteUrl}${post.link}`.replace(/\/$/, ""),
    lastModified: post.date,
  }));
}
