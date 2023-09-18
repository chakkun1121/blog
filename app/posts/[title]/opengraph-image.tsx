import { ImageResponse } from "next/server";
import { getArticleData } from "../../lib/getArticleData";
import { loadGoogleFont } from "./font";
import { getRecentArticles } from "../../lib/getRecentArticles";

export const alt = "記事のアイキャッチ画像";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image(props: { params: { title: string } }) {
  const data = await getArticleData(props.params.title);
  const notoSansArrayBuffer = await loadGoogleFont({
    family: "Noto Sans JP",
    weight: 700,
  });

  if (data) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffeeee",
            color: "#111111",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: 64,
            }}
          >
            {data.title}
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
      {
        ...size,
        fonts: [
          {
            name: "NotoSansJP",
            data: notoSansArrayBuffer,
            style: "normal",
            weight: 700,
          },
        ],
      },
    );
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
export async function generateStaticParams() {
  const recentArticles = await getRecentArticles();
  return recentArticles.map((article) => ({
    title: article.link.replace(/\/posts\//, ""),
  }));
}
