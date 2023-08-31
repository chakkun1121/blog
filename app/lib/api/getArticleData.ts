import { postType } from "../../../@types/postType";
import { siteUrl } from "../../layout";
import matter from "gray-matter";

export async function getArticleData(
  title: string,
): Promise<getArticleDataProps> {
  const file = await fetch(siteUrl + `/posts/${title}.md`)
    .then((res) => (res.ok ? res.text() : ""))
    .catch((e) => {
      throw new Error(e);
    });
  const { data } = matter(file) as unknown as { data: postType };
  return { ...data, file };
}
interface getArticleDataProps extends postType {
  file: string;
}
