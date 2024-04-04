import Link from "next/link";
import { postType } from "../../@types/postType";
import { siteUrl } from "../meta";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function PostCard({ post }: { post: postType }) {
  return (
    <>
      <Link
        href={post?.link}
        className="bg-card grid gap-y-2 rounded p-2 [grid-row:span_3] [grid-template-rows:subgrid]"
      >
        <AspectRatio ratio={40 / 21}>
          <img
            src={
              post.image || new URL(`/${post.link}/og.webp`, siteUrl).toString()
            }
            alt={post?.title + "のサムネイル"}
            className="rounded object-cover"
          />
        </AspectRatio>
        <h3 className="block text-xl">{post?.title}</h3>
        <p className="line-clamp-2 block text-M">{post?.description}</p>
      </Link>
    </>
  );
}
