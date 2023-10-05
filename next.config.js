const { env } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: env.BASE_PATH || "",
};

module.exports = nextConfig;
