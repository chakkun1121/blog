import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRss } from "react-icons/fa";

export function HeaderLink({ tagName }: { tagName?: string }) {
  return (
    <div className="md:flex">
      <h2 className="flex-1 text-2xl">
        {tagName ? tagName + "の記事一覧" : "投稿一覧"}
      </h2>
      {!tagName && (
        <Button asChild>
          <Link
            className="flex flex-none items-center gap-2"
            href="rss.xml"
            target="_blank"
          >
            <FaRss />
            rssフィールドでこのブログの更新を取得
          </Link>
        </Button>
      )}
    </div>
  );
}
