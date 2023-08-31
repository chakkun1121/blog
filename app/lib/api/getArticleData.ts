import { siteUrl } from "../../layout";

export async function getArticleData(title: string, page?: number) {
  const data = await fetch(
    siteUrl + `/api/getPostData/${title}${page ? `?page=${page}` : ""}`,
  ).then((res) => res.json());
  return data;
}
