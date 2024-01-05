import { getAllCategoryData } from "../../lib/getAllCategoryData";
import topPage from "../page/top";

export default function Page({ params: { category } }) {
  return topPage(undefined, category);
}
export async function generateStaticParams(): Promise<{ category: string }[]> {
  const categoryNames = await getAllCategoryData();
  return categoryNames.map((category) => ({ category }));
}
