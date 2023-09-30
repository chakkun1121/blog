import { PostCard } from "./postCard";
import { postType } from "../../@types/postType";
import { getAllArticleData } from "../lib/getAllArticleData";

export default async function RecentArticles({
  maxPosts,
  tagName,
}: {
  maxPosts?: number;
  tagName?: string;
}): Promise<JSX.Element> {
  const posts: postType[] = await getAllArticleData();
  return (
    <>
      {posts.map((post, index) => {
        if (maxPosts && index >= maxPosts) return;
        if (post.isShow === false) return;
        if (tagName && !post.tags?.includes(tagName)) return;
        return <PostCard post={post} key={index} />;
      })}
    </>
  );
}
