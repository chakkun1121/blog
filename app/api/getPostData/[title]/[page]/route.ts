import { NextRequest } from "next/server";
import { getPostData } from "../route";

export async function GET(
  _req: NextRequest,
  { params }: { params: { title: string; page: string } },
) {
  return await getPostData({ params });
}
