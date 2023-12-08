import Pagination from "../_components/pagination";
import { Posts } from "../_components/posts";
import { getAllArticleData } from "../lib/getAllArticleData";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const pageNum = parseInt(slug?.[1] || "1");
  // 1ページあたり最大20件とする
  const start = pageNum * 20 - 20;
  const end = pageNum * 20 - 1;
  const articleNumber = (await getAllArticleData()).length;
  return (
    <>
      <section>
        <Posts start={start} end={end} />
      </section>
      <section>
        <div className="grid auto-rows-fr grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"></div>
      </section>
      <Pagination
        finallyPage={Math.ceil(articleNumber / 20)}
        currentPage={Number(pageNum)}
      />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getAllArticleData();
  const maxPage = Math.ceil(posts.length / 20);
  return [
    { slug: [] },
    ...[...Array(maxPage)].map((_, i) => ({
      slug: ["page", (i + 1).toString()],
    })),
  ];
}
