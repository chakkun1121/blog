import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import Image from "next/image";
import { NextSeo } from "next-seo";
export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, "utf-8");
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content, slug: params.slug } };
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

const Post = ({ frontMatter, content, slug }) => {
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        openGraph={{
          type: "website",
          url: `https://chakkun1121.github.io/blog/posts/${slug}`,
          title: frontMatter.title,
          description: frontMatter.description,
          images: [
            {
              url: `https://chakkun1121.github.io/blog/img/${frontMatter.image}`,
              width: 1200,
              height: 700,
              alt: frontMatter.title,
            },
          ],
        }}
      />
      <div className="prose prose-lg max-w-none">
        {" "}
        <div className="border">
          <img
            src={`https://chakkun1121.github.io/blog/img//${frontMatter.image}`}
            width={1200}
            height={700}
            alt={frontMatter.title}
          />
        </div>
        <h1 className="mt-12">{frontMatter.title}</h1>
        <span>{frontMatter.date}</span>
        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </div>
    </>
  );
};

export default Post;
