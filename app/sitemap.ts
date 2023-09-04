import { MetadataRoute } from "next";
import { siteUrl } from "./layout";
import { getRecentArticles } from "./lib/getRecentArticles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recentArticles = await getRecentArticles();
  // isShowがfalseの記事は除外する
  recentArticles.filter((post) => post.isShow);
  return recentArticles.map((post) => ({
    url: `${siteUrl}${post.link}`.replace(/\/$/, ""),
    lastModified: post.date,
  }));
}
