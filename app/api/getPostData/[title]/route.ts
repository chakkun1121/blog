import matter from "gray-matter";
import { NextRequest, NextResponse } from "next/server";
import { postType } from "../../../../@types/postType";
import { isMultiplePageArticle } from "../../../lib/isMultiplePageArticle";
import { getFile } from "../../../lib/api/getFile";

export async function GET(
  req: NextRequest,
  { params }: { params: { title: string } },
): Promise<NextResponse> {
  const title: string = params.title;
  const { searchParams } = new URL(req.url);
  const page: number = Number(searchParams.get("page") || "0");
  const file: string = await getFile(title, page);
  const { data } = matter(file) as unknown as {
    data: postType;
  };
  if (!isMultiplePageArticle(title)) {
    return NextResponse.json(data);
  }
  const firstPageFile: string = await getFile(title, 1);
  const { data: firstPageData } = matter(firstPageFile) as unknown as {
    data: postType;
  };
  return NextResponse.json({
    ...firstPageData,
    ...data,
  });
}
