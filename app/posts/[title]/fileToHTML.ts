import { marked } from "marked";
import matter from "gray-matter";
import { postType } from "../../../@types/postType";

export function fileToHTML(file: string): { html: string; data: postType } {
  const { data, content } = matter(file) as unknown as {
    data: postType;
    content: string;
  };
  const html = marked.parse(content) as string;
  return { html, data };
}
