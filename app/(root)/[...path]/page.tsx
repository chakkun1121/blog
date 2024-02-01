import { postType } from "../../../@types/postType";
import PostPage from "../../[lang]/(article)/[...path]/page";
import { getAllArticleData } from "../../lib/getAllArticleData";
import { getAllCategoryData } from "../../lib/getAllCategoryData";
import { getCategoryAllFileData } from "../../lib/getCategoryAllFileData";

export default function BlogPage({ params: { path} }) {
  return PostPage({params:{path,lang:"ja"}})
}
export async function generateStaticParams(): Promise<{ path: string[] }[]> {
  const allArticles = [
    ...(await getAllArticleData()),
    ...(await getAllCategoryData().then((categories) => {
      return Promise.all(
        categories.map(async (category) => {
          return await getCategoryAllFileData(category);
        }),
      );
    })),
  ].flat() as postType[];
  const paths = allArticles.map((article) => {
    return { path: article.link.split("/").filter((p) => p) };
  });
  return paths;
}