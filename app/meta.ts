import { env } from "process";

export const siteTitle = "chakkun1121's blog | chakkun1121";
export const siteDescription =
  "和訳表示サイトなど個人開発を行っているchakkun1121のブログです。";
export const isDevMode = process.env.NODE_ENV === "development";
export const siteUrl = isDevMode
  ? env.LOCAL_HOST_URL || "http://localhost:2222"
  : "https://chakkun1121.github.io/blog";