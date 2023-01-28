import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import Image from "next/image";
export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, "utf-8");
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));
  console.log("paths:", paths);
  return {
    paths,
    fallback: false,
  };
}

const Post = ({ frontMatter, content }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="border">
        <Image
          src={`/${frontMatter.image}`}
          width={1200}
          height={700}
          alt={frontMatter.title}
        />
      </div>
      <h1 className="mt-12">{frontMatter.title}</h1>
      <span>{frontMatter.date}</span>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </div>
  );
};

export default Post;
