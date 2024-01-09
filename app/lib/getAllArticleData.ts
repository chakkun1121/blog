import fs, { promises as fsPromises } from "fs";
import path from "path";
import { postType } from "../../@types/postType";
import { getArticleData } from "./getArticleData";
export async function getAllArticleData(
  category?: string,
): Promise<postType[]> {
  const currentDir = process.cwd();
  const searchDir = path.join(
    currentDir,
    "public",
    "posts",
    category ? category : "",
  );
  const files = (await fsPromises.readdir(searchDir)).filter(
    (folderName: string) =>
      fs.existsSync(path.join(searchDir, folderName, "index.md")),
  );
  const posts: postType[] = await Promise.all(
    files.map(async (file) => {
      const articleData = await getArticleData({
        articleID: file,
        category: category,
      });
      if (articleData === undefined) return undefined;
      return {
        ...articleData,
        link: "/" + (category ? category + "/" : "") + file.split(".")[0],
      };
    }),
  );
  return posts
    .filter((post) => post !== undefined)
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      else if (a.date > b.date) return -1;
      else return 0;
    });
}
