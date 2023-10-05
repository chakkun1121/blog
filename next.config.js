const { env } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "development" ? "" : "/blog",
};

module.exports = nextConfig;
