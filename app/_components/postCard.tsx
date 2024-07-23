import Link from "next/link";
import { postType } from "../../@types/postType";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { isDevMode } from "../meta";

export function PostCard({ post }: { post: postType }) {
  return (
    <>
      <Link
        href={post?.link}
        className="grid gap-y-2 rounded bg-card p-2 [grid-row:span_3] [grid-template-rows:subgrid]"
      >
        <AspectRatio ratio={40 / 21}>
          <img
            src={
              post.image || `${!isDevMode ? "/blog" : ""}${post.link}/og.webp`
            }
            alt={post?.title + "のサムネイル"}
            className="rounded object-cover"
          />
        </AspectRatio>
        <h3 className="block text-xl">{post?.title}</h3>
        <p className="text-M line-clamp-2 block">{post?.description}</p>
      </Link>
    </>
  );
}
