import Link from "next/link";

export default function NotFound() {
  return (
    <section className="text-center">
      <h2>404 NotFound</h2>
      <h3>ページが見つかりません</h3>
      <Link href="/">ホームへ戻る</Link>
    </section>
  );
}
