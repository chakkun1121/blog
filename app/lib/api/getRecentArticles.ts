import { postType } from "../../../@types/postType";
import { siteUrl } from "../../layout";

export async function getRecentArticles(): Promise<postType[]> {
  return await fetch(siteUrl + `/api/getRecentArticle`)
    .then((res) => (res.ok ? res.json() : []))
    .catch((e) => {
      throw new Error(e);
    });
}
