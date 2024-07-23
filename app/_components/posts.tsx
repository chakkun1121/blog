import RecentArticles from "./recentArticles";

export function Posts({ tagName }: { tagName?: string }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <RecentArticles tagName={tagName} />
    </div>
  );
}
