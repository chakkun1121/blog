import { siteUrl } from "../../layout";

export async function getFile(title: string, page?: number): Promise<string> {
  return await fetch(
    siteUrl + `/api/getFile/${title}${page ? `?page=${page}` : ""}`,
  )
    .then((res) => (res.ok ? res.text() : undefined))
    .catch((e) => {
      throw new Error(e);
    });
}
