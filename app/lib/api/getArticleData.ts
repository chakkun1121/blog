import { postType } from "../../../@types/postType";
import { siteUrl } from "../../layout";

export async function getArticleData(
  title: string,
  page?: number,
): Promise<postType> {
  return await fetch(
    siteUrl + `/api/getPostData/${title}${page ? `?page=${page}` : ""}`,
  )
    .then((res) => (res.ok ? res.json() : []))
    .catch((e) => {
      throw new Error(e);
    });
}
