import Link from "next/link";
import RecentArticles from "./recentArticles";

export function Posts({
  tagName,
  start,
  end,
}: {
  tagName?: string;
  start?: number;
  end?: number;
}) {
  return (
    <>
      <div className="flex">
        <h2 className="flex-1">
          {tagName ? tagName + "の記事一覧" : "投稿一覧"}
        </h2>
        <Link className="flex-none" href="rss.xml" target="_blank">
          rssフィールドでこのブログの更新を取得
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <RecentArticles tagName={tagName} start={start} end={end} />
      </div>
    </>
  );
}
