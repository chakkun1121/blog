import { Metadata } from "next";
import { Posts } from "../../../_components/posts";
import { getAllTags } from "../../../lib/getAllTags";
import { HeaderLink } from "../../../_components/HeaderLink";

export default function Page({ params }: { params: { tagName: string } }) {
  return (
    <>
      <section>
        <HeaderLink tagName={decodeURI(params.tagName)} />
      </section>
      <section>
        <Posts tagName={decodeURI(params.tagName)} />
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
    title: decodeURI(params.tagName) + "の記事一覧",
    description:
      "chakkun1121のブログで" +
      decodeURI(params.tagName) +
      "のタグが付いた記事一覧",
    alternates: {
      canonical: "/tag/" + decodeURI(params.tagName),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
export async function generateStaticParams(): Promise<{lang:string, tagName: string }[]> {
  const tags = await getAllTags();
  return tags.map((tag) => ({
    tagName: encodeURIComponent(tag),
  })).map((a)=>([{...a,lang:"en"},{...a,lang:"ja"}])).flat();
}
