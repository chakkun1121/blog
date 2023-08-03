import { MetadataRoute } from "next";
import path from "path";
import matter from "gray-matter";
import { postType } from "../@types/postType";
import fsPromises from "fs/promises";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDir = process.cwd();
  // 記事は /posts にある
  // /posts/{folderName}/{fileName}.md という形式である
  // ただし、複数ページにまたがるものはfileNameが1,2,3,...となっている
  const folders = await fsPromises.readdir(path.join(currentDir, "posts"));
  const posts: postType[] = await Promise.all(
    folders.map(async (folder) => {
      const files = await fsPromises.readdir(
        path.join(currentDir, "posts", folder),
      );
      const file =
        files.length > 1 ? "1.md" : files.find((file) => file.endsWith(".md"));
      const content = await fsPromises.readFile(
        path.join(currentDir, "posts", folder, file),
        "utf-8",
      );
      const { data } = matter(content);
      if (typeof data !== "object") throw new Error("data is not object");
      data.link = `/posts/${folder}`;
      return data as postType;
    }),
  );
  // posts内にisShowがfalseのものがある場合は除外する
  const filteredPosts = posts.filter((post) => post.isShow !== false);
  return filteredPosts.map((post) => ({
    url: ("https://chakkun1121-blog.vercel.app/"+ post.link),
    lastModified: new Date(post.date).toISOString(),
  }));
}
