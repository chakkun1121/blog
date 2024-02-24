import { MetadataRoute } from "next";
import { getAllArticleData } from "./lib/getAllArticleData";
import { siteUrl } from "./meta";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allArticles = await getAllArticleData();

  allArticles.filter((post) => post.isShow);
  return [
    {
      url: `${siteUrl}/`,
    },
    ...allArticles.map((post) => ({
      url: `${siteUrl}${post.link}`.replace(/\/$/, ""),
      lastModified: post.date,
    })),
  ];
}
