import { postType } from "../../@types/postType";
import matter from "gray-matter";
import fsPromises from "fs/promises";
import path from "path";

export async function getArticleData(
  title: string,
): Promise<getArticleDataProps> {
  if (!title.endsWith(".md")) title += ".md";
  const file = await fsPromises.readFile(
    path.join(process.cwd(), "public", "posts", title),
    "utf-8",
  );
  const { data } = matter(file) as unknown as { data: postType };
  // data.date(日本標準時基準)が未来の時間だったらundefinedを返す
  if (data.date && new Date(data.date) > new Date()) return undefined;
  return { ...data, file };
}
interface getArticleDataProps extends postType {
  file: string; // 記事のファイルの中身
}
