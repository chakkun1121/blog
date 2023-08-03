import { notFound } from "next/navigation";
import { getFile } from "./getFile";
import { fileToHTML } from "./fileToHTML";
import ReactHtmlParser from "react-html-parser";
import { postType } from "../../../@types/postType";
export default async function PostPage(props: { params: { title: string } }) {
  return render(props);
}
export async function render({
  params,
}: {
  params: { title: string; page?: number };
}) {
  // 記事は /posts にある
  // /posts/{folderName}/{fileName}.md という形式である(folderName=title)
  // ただし、複数ページにまたがるものはfileNameが1,2,3,...となっている
  try {
    const file = await getFile(params.title, params.page);
    const { html, data }: { html: string; data: postType } = fileToHTML(file);
    return (
      <>
        <>
          <p>
            投稿日:{new Date(data?.date || "")?.toLocaleDateString() || "不明"}
          </p>
        </>
        <>{ReactHtmlParser(html)}</>
      </>
    );
  } catch (e) {
    notFound();
  }
}
export async function generateMetadata({ params }) {
  try {
    const file = await getFile(params.title, params.page);
    const { data }: { data: postType } = fileToHTML(file);
    return { title: data.title, description: data.description };
  } catch (e) {}
}
