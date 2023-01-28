import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
export const getStaticProps = () => {
  const files = fs.readdirSync("posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
export default function Home({ posts }) {
  console.log(posts[0].frontMatter);
  return (
    <div className="my-8">
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/post/${post.slug}`}>{post.frontMatter.title}</Link>
        </div>
      ))}
    </div>
  );
}
