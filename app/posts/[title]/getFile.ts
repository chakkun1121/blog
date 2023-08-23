import fsPromises from "fs/promises";
import path from "path";
import fs from "fs";
export async function getFile(title: string, page?: number): Promise<string> {
  // 記事は /posts にある
  // /posts/{folderName}/{fileName}.md という形式である(folderName=title)
  // ただし、複数ページにまたがるものはfileNameが1,2,3,...となっている
  try {
    const currentDir = process.cwd();
    // もしpageが指定されていたら、そのページのファイルを返す
    // そうでなければ、1.mdがあればそれを、なければ{title}.mdを返す
    const fileName = page
      ? `${page}.md`
      : fs.existsSync(path.join(currentDir, `posts/${title}/1.md`))
      ? "1.md"
      : `${title}.md`;
    return await fsPromises.readFile(
      path.join(currentDir, `posts/${title}/${fileName}`),
      "utf-8",
    );
  } catch (e) {
    console.error(e);
    throw Error("ファイルがありません");
  }
}
export function isMultiplePageArticle(title: string): boolean {
  if (typeof title !== "string")
    throw new Error("titleがstringではありません。title:" + title);
  const currentDir = process.cwd();
  const files = fs.readdirSync(path.join(currentDir, `posts/${title}`));
  return files.length > 1;
}
