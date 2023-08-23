import { marked } from "marked";
import matter from "gray-matter";

export function fileToHTML(file: string): string {
  const { content } = matter(file) as unknown as {
    content: string;
  };
  return marked.parse(content) as string;
}
