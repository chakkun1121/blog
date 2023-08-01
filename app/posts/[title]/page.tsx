import { notFound } from "next/navigation";
import { getFile } from "./getFile";
import { fileToHTML } from "./fileToHTML";
import { ReactNode } from "react";
import ReactHtmlParser from "react-html-parser";
export default async function PostPage(props: { params: { title: string } }) {
  try {
    const file = await getFile(props.params.title);
    const { html, data }: { html: string; data: object } = fileToHTML(file);
    return <>{ReactHtmlParser(html)}</>;
  } catch (e) {
    notFound();
  }
}
