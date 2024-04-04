import { getAllArticleData } from "./getAllArticleData";

export async function getAllTags(): Promise<string[]> {
  return Array.from(
    new Set(
      (await getAllArticleData())
        .map((post) => post?.tags)
        .flat()
        .filter((tag) => tag) as string[],
    ),
  ).sort();
}
