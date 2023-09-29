import { PostCard } from "./postCard";
import { postType } from "../../@types/postType";
import { getAllArticleData } from "../lib/getAllArticleData";

export default async function RecentArticles({
  maxPosts,
}: {
  maxPosts?: number;
}): Promise<JSX.Element> {
  const posts: postType[] = await getAllArticleData();
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
