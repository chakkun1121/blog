import path from "path";
import fsPromises from "fs/promises";

export async function getCategoryData(categoryName: string) {
  const currentDir = process.cwd();
  const categoryDir = path.join(currentDir, "public", "posts", categoryName);
  const categoryInfo = await fsPromises.readFile(
    path.join(categoryDir, "info.json"),
    "utf-8",
  );
  return JSON.parse(categoryInfo);
}
