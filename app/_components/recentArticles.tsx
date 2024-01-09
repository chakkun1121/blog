import { PostCard } from "./postCard";
import { postType } from "../../@types/postType";
import { getAllArticleData } from "../lib/getAllArticleData";

export default async function RecentArticles({
  maxPosts,
  tagName,
  start,
  end,
  category,
}: {
  maxPosts?: number;
  tagName?: string;
  start?: number;
  end?: number;
  category?: string;
}): Promise<JSX.Element> {
  const posts: postType[] = await getAllArticleData(category);
  return (
    <>
      {posts.map((post, index) => {
        if (maxPosts && index >= maxPosts) return;
        if (post.isShow === false) return;
        if (tagName && !post.tags?.includes(tagName)) return;
        if (start && index < start) return;
        if (end && index > end) return;
        return <PostCard post={post} key={index} />;
      })}
    </>
  );
}
