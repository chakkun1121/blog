import { getAllCategoryData } from "../../../lib/getAllCategoryData";
import topPage from "../page/top";

export default function Page({ params: { category, lang } }) {
  return topPage(lang, undefined, category);
}
export async function generateStaticParams(): Promise<
  { category: string; lang: "ja" | "en" }[]
> {
  const categoryNames = await getAllCategoryData();
  return categoryNames
    .map((category) => [
      { category, lang: "ja" as "ja" },
      { category, lang: "en" as "en" },
    ])
    .flat();
}
