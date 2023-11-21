import { MetadataRoute } from "next";
import { getAllArticleData } from "./lib/getAllArticleData";
import { getAllTags } from "./lib/getAllTags";
import { siteUrl } from "./meta";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recentArticles = await getAllArticleData();
  const allTags = await getAllTags();
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
    ...allTags.map((tag) => ({
      url: `${siteUrl}/tag/${tag}`,
    })),
  ];
}
