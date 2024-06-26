import { promises as fsPromises } from "fs";
import path from "path";
import { postType } from "../../@types/postType";
import { getArticleData } from "./getArticleData";
export async function getAllArticleData(): Promise<postType[]> {
  const currentDir = process.cwd();
  const searchDir = path.join(currentDir, "public", "posts");
  const files = await fsPromises.readdir(searchDir);
  const posts: (postType | undefined)[] = await Promise.all(
    files.map(async (file) => {
      const articleData = await getArticleData(file);
      if (!articleData) return undefined;
      return {
        ...articleData,
        link: "/" + file.split(".")[0],
      };
    }),
  );
  // Todo: filterで型推論できるようになったらasを消す
  return (posts.filter((post) => post !== undefined) as postType[]).sort(
    (a, b) => {
      if (a.date < b.date) return 1;
      else if (a.date > b.date) return -1;
      else return 0;
    },
  );
}
