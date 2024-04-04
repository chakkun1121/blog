import { ImageResponse } from "next/og";
import { getAllArticleData } from "../../../lib/getAllArticleData";
import { getArticleData } from "../../../lib/getArticleData";
import { NextRequest } from "next/server";

export async function generateStaticParams(): Promise<{ path: string }[]> {
  const allArticles = await getAllArticleData();
  return allArticles.map((article) => {
    return { path: article.link.replace("/", "") };
  });
}
function maximizeFontSize({
  text,
  width,
  height,
}: {
  text: string;
  width: number;
  height: number;
}): number {
  let lines = 1;
  let size = Math.min(width / text.length, height);
  while (size * (lines + 1) < height) {
    lines += 1;
    size = Math.min(width / (text.length / lines), height);
  }
  return size;
}
export async function GET(
  _request: NextRequest,
  { params: { path } }: { params: { path: string } },
) {
  const articleData = await getArticleData(path);
  if (!articleData) throw new Error("Can't access this article data");
  const width = 1200;
  const height = 630;
  const titleFontSize = `${maximizeFontSize({
    text: articleData.title,
    width,
    height: height / 2,
  })}px`;
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#fffbeb",
        }}
      >
        <h1
          style={{
            fontSize: 64,
            textAlign: "center",
          }}
        >
          {articleData.title}
        </h1>
        <p
          style={{
            fontSize: 32,
          }}
        >
          @chakkun1121
        </p>
      </div>
    ),
    // ImageResponse options
    {
      width,
      height,
    },
  );
}
