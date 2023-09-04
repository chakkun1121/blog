import fsPromises from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { postType } from "../../@types/postType";
export async function getRecentArticles(): Promise<postType[]> {
  const currentDir = process.cwd();
  // 記事は /posts にある
  // /posts/{fileName}.md という形式である
  const files = await fsPromises.readdir(
    path.join(currentDir, "public", "posts"),
  );
  const posts: postType[] = await Promise.all(
    files.map(async (file) => {
      const content = await fsPromises.readFile(
        path.join(currentDir, "public", "posts", file),
        "utf-8",
      );
      const { data } = matter(content);
      if (typeof data !== "object") throw new Error("data is not object");
      data.link = `/posts/${file}`.replace(".md", "");
      return data as postType;
    }),
  );
  posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else return 0;
  });
  return posts;
}
