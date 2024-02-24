import Link from "next/link";
import { FaRss } from "react-icons/fa";

export function HeaderLink({ tagName }: { tagName?: string }) {
  return (
    <div className="md:flex">
      <h2 className="flex-1">
        {tagName ? tagName + "の記事一覧" : "投稿一覧"}
      </h2>
      {!tagName && (
        <Link
          className="flex flex-none items-center"
          href="rss.xml"
          target="_blank"
        >
          <FaRss />
          rssフィールドでこのブログの更新を取得
        </Link>
      )}
    </div>
  );
}
