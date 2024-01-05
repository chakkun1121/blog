import { getAllArticleData } from "../../../lib/getAllArticleData";
import topPage from "../top";

export default function Page({
  params: { pageNum },
}: {
  params: { pageNum: string };
}) {
  return topPage(pageNum);
}
export async function generateStaticParams(): Promise<{ pageNum: string }[]> {
  const posts = await getAllArticleData();
  const maxPage = Math.ceil(posts.length / 20);
  return Array.from({ length: maxPage }, (_, i) => ({ pageNum: `${i + 1}` }));
}
