import RecentArticles from "./recentArticles";

export function Posts() {
  return (
    <>
      <header>
        <h2>投稿一覧</h2>
      </header>
      <div className="grid auto-rows-fr grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        <RecentArticles />
      </div>
    </>
  );
}
