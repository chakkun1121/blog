---
title: next.jsでgithub pagesのサブディレクトリにビルドする方法
description: next.jsでgithub oagesのサブディレクトリにビルドする方法を解説します。
date: 2023-10-19
tags:
  - next.js
  - nextjs
  - github-pages
---

## 1. next.config.jsを編集する

```js
/* 公開時のサブディレクトリ */
const SUB_DIRECTORY = "/blog"; //これは適切な値にしてください。

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
};

module.exports = nextConfig;
```

## 2. github actionsの設定をする

これについては[こちら](./20230831)を参考にしてください。

## 最後に

このようにしてnext.jsをgithub pagesにデプロイできます。これを知るまではゴリ押しでパスの解決を行っていましたが、これで安心師でデプロイできるようになりました。

## 参考資料

- [Next.jsで静的サイトをサブディレクトリにデプロイしたいときの設定 #Next.js - Qiita](https://qiita.com/hiropy0123/items/02ab91f69dbfa4e2797f)
