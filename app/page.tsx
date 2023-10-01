import Link from "next/link";
import { Posts } from "./_components/posts";

export default function Page() {
  return (
    <>
      <section>
        <Posts />
      </section>
      <section>
        <div className="grid auto-rows-fr grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="rss.xml" target="_blank">
            rssフィールドでこのブログの更新を取得
          </Link>
        </div>
      </section>
    </>
  );
}
