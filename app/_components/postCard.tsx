import Link from "next/link";
import { postType } from "../../@types/postType";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import styles from "./postCard.module.css";

export function PostCard({ post }: { post: postType }) {
  const basePath = (publicRuntimeConfig && publicRuntimeConfig.basePath) || "";

  return (
    <>
      <Link
        href={post?.link}
        className={
          "gap-y-2 rounded bg-orange-100 p-2 text-black no-underline visited:text-black " +
          styles.link
        }
      >
        <img
          src={post.image || basePath + "/img/no-image.webp"}
          alt={post?.title + "のサムネイル"}
          className="aspect-video h-60 w-full rounded object-cover"
        />
        <h3 className="block">{post?.title}</h3>
        <p className="line-clamp-2 block text-M">{post?.description}</p>
      </Link>
    </>
  );
}
