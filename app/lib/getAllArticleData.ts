import fsPromises from "fs/promises";
import path from "path";
import { postType } from "../../@types/postType";
import { getArticleData } from "./getArticleData";
export async function getAllArticleData(): Promise<postType[]> {
  const currentDir = process.cwd();
  // 記事は /posts にある
  // /posts/{fileName}.md という形式である
  const files = (
    await fsPromises.readdir(path.join(currentDir, "public", "posts"))
  ).filter((file) => file.endsWith(".md"));
  const posts: postType[] = await Promise.all(
    files.map(async (file) => {
      return {
        ...(await getArticleData(file)),
        link: "/" + file.split(".")[0],
      };
    }),
  );
  posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    else if (a.date > b.date) return -1;
    else return 0;
  });
  return posts;
}
