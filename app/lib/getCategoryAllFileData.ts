import { postType } from "../../@types/postType";
import path from "path";
import { getAllArticleData } from "./getAllArticleData";

export async function getCategoryAllFileData(
  categoryName: string,
): Promise<postType[]> {
  const currentDir = process.cwd();
  const categoryFiles = await getAllArticleData(categoryName);
  return categoryFiles;
}
