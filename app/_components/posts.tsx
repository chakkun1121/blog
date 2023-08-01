import Link from "next/link";
import Image from "next/image";

export default async function Posts() {
  // const posts:pos = await getPosts();
  return (
    <>
      <header>
        <h2>投稿一覧</h2>
      </header>
      <div className="grid auto-rows-fr grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"></div>
    </>
  );
}
function PostCard({ post }: { post: postType }) {
  return (
    <>
      <div>
        <Link href={post.link}>
          <Image src={post.image} alt={post.title} />
          <h3>{post.title}</h3>
          <p className="line-clamp-2 text-M">{post.description}</p>
        </Link>
      </div>
    </>
  );
}
interface postType {
  title: string;
  image: string;
  link: string;
  description: string;
}
