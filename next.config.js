/* 公開時のサブディレクトリ */
const SUB_DIRECTORY = "/blog";

/* 本番環境と開発環境の分岐用のフラグ */
const isProd = process.env.NODE_ENV == "production";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? SUB_DIRECTORY : "",
  assetPrefix: isProd ? SUB_DIRECTORY : "",
  publicRuntimeConfig: {
    basePath: isProd ? SUB_DIRECTORY : "",
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

module.exports = nextConfig
