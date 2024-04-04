import { HeaderLink } from "../../_components/HeaderLink";
import { Posts } from "../../_components/posts";
import { getAllArticleData } from "../../lib/getAllArticleData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default async function topPage(page?: string) {
  const pageNum = parseInt(page || "1");
  // 1ページあたり最大20件とする
  const start = pageNum * 20 - 20;
  const end = pageNum * 20 - 1;
  const articleNumber = (await getAllArticleData()).length;
  const pageList = [...Array(Math.ceil(articleNumber / 20))].map(
    (_, i) => i + 1,
  );

  return (
    <>
      <section>
        <HeaderLink />
      </section>
      <section>
        <Posts start={start} end={end} />
      </section>
      <section>
        <div className="grid auto-rows-fr grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"></div>
      </section>
      {articleNumber > 20 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="/page" />
            </PaginationItem>
            {pageList.map((page, i, list) => {
              if (i > 3 || i < list.length - 3) return;
              return (
                <PaginationLink key={page} href={`/page/${page}`}>
                  {page}
                </PaginationLink>
              );
            })}
          </PaginationContent>
          <PaginationItem>
            <PaginationNext href={`/page/${pageList.length}`} />
          </PaginationItem>
        </Pagination>
      )}
    </>
  );
}
