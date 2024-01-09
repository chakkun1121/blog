import { MetadataRoute } from "next";
import { getAllArticleData } from "./lib/getAllArticleData";
import { siteUrl } from "./meta";
import { postType } from "../@types/postType";
import { getAllCategoryData } from "./lib/getAllCategoryData";
import { getCategoryAllFileData } from "./lib/getCategoryAllFileData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allArticles = [
    ...(await getAllArticleData()),
    ...(await getAllCategoryData().then((categories) => {
      return Promise.all(
        categories.map(async (category) => {
          return await getCategoryAllFileData(category);
        }),
      );
    })),
  ].flat() as postType[]; // isShowがfalseの記事は除外する
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
