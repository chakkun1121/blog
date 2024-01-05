import { postType } from "../../@types/postType";
import path from "path";
import { getAllArticleData } from "./getAllArticleData";

export async function getCategoryAllFileData(
  categoryName: string,
): Promise<postType[]> {
  const currentDir = process.cwd();
  const categoryDir = path.join(currentDir, "public", "posts", categoryName);
  const categoryFiles = await getAllArticleData(categoryDir);
  return categoryFiles;
}
