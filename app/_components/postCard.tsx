import Link from "next/link";
import { postType } from "../../@types/postType";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import styles from "./postCard.module.css"

export function PostCard({ post }: { post: postType }) {
  const basePath = (publicRuntimeConfig && publicRuntimeConfig.basePath) || "";

  return (
    <>
        <Link
          href={post?.link}
          className={"text-black no-underline visited:text-black rounded bg-orange-100 p-2 gap-y-2 "+styles.link}
        >
          <img
            src={post.image||basePath + "/img/no-image.webp"}
            alt={post?.title + "のサムネイル"}
            className="h-60 w-full rounded object-cover"
          />
          <h3 className="block">{post?.title}</h3>
          <p className="line-clamp-2 text-M block">{post?.description}</p>
        </Link>
    </>
  );
}
