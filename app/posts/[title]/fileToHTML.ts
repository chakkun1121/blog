import { marked } from "marked";
import matter from "gray-matter";

export function fileToHTML(file: string) {
  const { data, content } = matter(file);
  const html = marked.parse(content) as string;
  return { html, data };
}
