import Link from "next/link";
import { postType } from "../../@types/postType";

export function PostCard({ post }: { post: postType }) {
  return (
    <>
      <div className="rounded bg-orange-100 p-2">
        <Link
          href={post?.link}
          className="text-black no-underline visited:text-black"
        >
          <img
            src={post?.image || "./img/no-image.webp"}
            alt={post?.title + "のサムネイル"}
            className="h-60 w-full rounded object-cover"
          />
          <h3>{post?.title}</h3>
          <p className="line-clamp-2 text-M">{post?.description}</p>
        </Link>
      </div>
    </>
  );
}
