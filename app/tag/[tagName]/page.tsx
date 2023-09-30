import { Metadata } from "next";
import { Posts } from "../../_components/posts";
import { getAllTags } from "../../lib/getAllTags";

export default function Page({ params }: { params: { tagName: string } }) {
  return (
    <>
      <section>
        <Posts tagName={params.tagName} />
      </section>
    </>
  );
}
export function generateMetadata({
  params,
}: {
  params: { tagName: string };
}): Metadata {
  return {
    title: params.tagName + "の記事一覧",
    description:
      "chakkun1121のブログで" + params.tagName + "のタグが付いた記事一覧",
    alternates: {
      canonical: "/tag/" + params.tagName,
    },
  };
}
export async function generateStaticParams(): Promise<{ tagName: string }[]> {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tagName: tag,
  }));
}
