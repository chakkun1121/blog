import Link from "next/link";
import { postType } from "../../@types/postType";
import { siteUrl } from "../meta";

export function PostCard({ post }: { post: postType }) {
  return (
    <>
      <Link
        href={post?.link}
        className="grid gap-y-2 rounded bg-orange-100 p-2 text-black no-underline [grid-row:span_3] [grid-template-rows:subgrid] visited:text-black"
      >
        <img
          src={post.image || new URL(`${post.link}/og.png`, siteUrl).toString()}
          alt={post?.title + "のサムネイル"}
          className="aspect-video h-60 w-full rounded object-cover"
        />
        <h3 className="block text-xl">{post?.title}</h3>
        <p className="line-clamp-2 block text-M">{post?.description}</p>
      </Link>
    </>
  );
}
