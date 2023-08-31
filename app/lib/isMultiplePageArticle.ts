import path from "path";
import fs from "fs";

export function isMultiplePageArticle(title: string): boolean {
  if (typeof title !== "string")
    throw new Error("titleがstringではありません。title:" + title);
  const currentDir = process.cwd();
  const files = fs.readdirSync(path.join(currentDir, `posts/${title}`));
  return files.length > 1;
}
