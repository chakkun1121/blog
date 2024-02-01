import { getAllArticleData } from "../../../../lib/getAllArticleData";
import topPage from "../top";

export default function Page({
  params: { pageNum, lang },
}: {
  params: { pageNum: string; lang: string };
}) {
  return topPage(lang, pageNum);
}
export async function generateStaticParams(): Promise<
  { pageNum: string; lang: string }[]
> {
  const posts = await getAllArticleData();
  const maxPage = Math.ceil(posts.length / 20);
  return Array.from({ length: maxPage }, (_, i) => [
    { pageNum: `${i + 1}`, lang: "ja" },
    { pageNum: `${i + 1}`, lang: "en" },
  ]).flat();
}
