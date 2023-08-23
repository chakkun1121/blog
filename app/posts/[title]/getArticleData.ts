import matter from "gray-matter";
import { postType } from "../../../@types/postType";
import { getFile, isMultiplePageArticle } from "./getFile";

export async function getArticleData(
  title: string,
  page?: number,
): Promise<postType> {
  const file: string = await getFile(title, page);
  const { data } = matter(file) as unknown as {
    data: postType;
  };
  if (!isMultiplePageArticle(title)) {
    return data;
  }
  const firstPageFile: string = await getFile(title, 1);
  const { data: firstPageData } = matter(firstPageFile) as unknown as {
    data: postType;
  };
  return {
    ...firstPageData,
    ...data,
  };
}
