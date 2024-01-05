import fsPromises from "fs/promises";
import fs from "fs";
import path from "path";
export async function getAllCategoryData(): Promise<string[]> {
  const currentDir = process.cwd();
  // フォルダー内にinfo.jsonがあるもののみを抽出
  const folders = (
    await fsPromises.readdir(path.join(currentDir, "public", "posts"))
  ).filter((folderName: string) =>
    fs.existsSync(
      path.join(currentDir, "public", "posts", folderName, "info.json"),
    ),
  );
  return folders;
}
