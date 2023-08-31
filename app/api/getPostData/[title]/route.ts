import matter from "gray-matter";
import { NextRequest, NextResponse } from "next/server";
import { postType } from "../../../../@types/postType";
import { getFile } from "./getFile";

export async function getPostData({
  params,
}: {
  params: { title: string; page?: string };
}): Promise<NextResponse> {
  const title: string = params.title;
  const page: number = Number(params.page || "0");
  const file: string = await getFile(title, page);
  const { data } = matter(file) as unknown as {
    data: postType;
  };
  if (!data.page) {
    return NextResponse.json({
      ...data,
      file,
    });
  }
  const firstPageFile: string = await getFile(title, 1);
  const { data: firstPageData } = matter(firstPageFile) as unknown as {
    data: postType;
  };
  return NextResponse.json({
    ...firstPageData,
    ...data,
    file,
  });
}
export async function GET(
  _req: NextRequest,
  { params }: { params: { title: string } },
) {
  return await getPostData({ params });
}
