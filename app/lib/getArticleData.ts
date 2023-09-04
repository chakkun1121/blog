import { postType } from "../../@types/postType";
import matter from "gray-matter";
import fsPromises from "fs/promises";
import path from "path";

export async function getArticleData(
  title: string,
): Promise<getArticleDataProps> {
  const file = await fsPromises.readFile(
    path.join(process.cwd(), "public", "posts", `${title}.md`),
    "utf-8",
  );
  const { data } = matter(file) as unknown as { data: postType };
  return { ...data, file };
}
interface getArticleDataProps extends postType {
  file: string;
}
