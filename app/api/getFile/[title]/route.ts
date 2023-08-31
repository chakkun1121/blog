import { NextRequest } from "next/server";

import fsPromises from "fs/promises";
import path from "path";
import fs from "fs";
export async function GET(
  req: NextRequest,
  { params }: { params: { title: string } },
): Promise<Response> {
  const title: string = params.title;
  console.log(title);
  const { searchParams } = new URL(req.url);
  const page: number = Number(searchParams.get("page") || "0");
  console.log(page);
  // 記事は /posts にある
  // /posts/{folderName}/{fileName}.md という形式である(folderName=title)
  // ただし、複数ページにまたがるものはfileNameが1,2,3,...となっている
  try {
    const currentDir = process.cwd();
    // もしpageが指定されていたら、そのページのファイルを返す
    // そうでなければ、1.mdがあればそれを、なければ{title}.mdを返す
    const fileName = page
      ? `${page}.md`
      : fs.existsSync(path.join(currentDir, `posts/${title}/1.md`))
      ? "1.md"
      : `${title}.md`;
    const article = await fsPromises.readFile(
      path.join(currentDir, `posts/${title}/${fileName}`),
      "utf-8",
    );
    return new Response(article, {
      headers: { "content-type": "text/markdown" },
    });
  } catch (e) {
    console.error(e);
    return new Response("ファイルがありません", {
      status: 404,
      headers: { "content-type": "text/plain" },
    });
  }
}
