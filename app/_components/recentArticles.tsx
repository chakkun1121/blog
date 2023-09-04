import { PostCard } from "./postCard";
import { postType } from "../../@types/postType";
import { getRecentArticles } from "../lib/getRecentArticles";

export default async function RecentArticles({
  maxPosts,
}: {
  maxPosts?: number;
}): Promise<JSX.Element> {
  const posts: postType[] = await getRecentArticles();
  return (
    <>
      {posts.map((post, index) => {
        if (maxPosts && index >= maxPosts) return;
        if (post.isShow === false) return;
        return <PostCard post={post} key={index} />;
      })}
    </>
  );
}
