import { postType } from "../../../@types/postType";
import { siteUrl } from "../../layout";

export async function getRecentArticles(): Promise<postType[]> {
  const posts: postType[] = await fetch(siteUrl + "/api/getRecentArticle/")
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err);
    });
  return posts;
}
