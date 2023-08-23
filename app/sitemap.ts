import { MetadataRoute } from "next";
import path from "path";
import { postType } from "../@types/postType";
import fsPromises from "fs/promises";
import { getArticleData } from "./posts/[title]/getArticleData";
import { isMultiplePageArticle } from "./posts/[title]/getFile";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rootUrl = "https://chakkun1121-blog.vercel.app";
  const currentDir = process.cwd();
  const folders = await fsPromises.readdir(path.join(currentDir, "posts"));
  const posts: { url: string; date: string; isShow: boolean }[] =
    await Promise.all(
      folders.map(
        async (
          title,
        ): Promise<{ url: string; date: string; isShow: boolean }> => {
          const data: postType = await getArticleData(title);
          const url = `${rootUrl}/posts/${title}${
            isMultiplePageArticle(title) ? "/1" : ""
          }`;
          console.debug(data.date);
          return { url, date: data.date, isShow: data.isShow };
        },
      ),
    );
  // posts内にisShowがfalseのものがある場合は除外する
  const filteredPosts = posts.filter((post) => post.isShow !== false);
  return filteredPosts.map((post) => ({
    url: post.url,
    lastModified: post.date,
  }));
}
