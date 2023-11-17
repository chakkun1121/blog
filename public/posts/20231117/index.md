---
title: MDXRemoteでremarkGfmを使う方法
description: Next.js(v14)(app router)の環境でMDXRemoteでremarkGfmを使う方法に付いて解説します。
date: 2023-11-17
tags:
  - nextjs
  - next.js
  - MDXRemote
  - remarkGfm
---

## 結論

### 0. Next.jsのアプリケーションを作る、MDXRemoteを入れる

### 1. remarkGfmのインストール

```bach
npm i remark-gfm@3.0
# or
yarn i remark-gfm@3.0
# or
pnpm i remark-gfm@3.0
```

現在(2023/11/17)時点では`remarkGfm`の最新版だと何故かエラーを吐くのでv3を利用する必要があります。

エラーの例

```txt
Cannot read properties of undefined (reading 'inTable')
```

### 2.optionsの設定

```tsx
import remarkGfm from "remark-gfm";

// --- 省略

<MDXRemote
  source={renderFile}
  options={{
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  }}
/>;
```

### 3.以上

このようにして`MDXRemote`で`remarkGfm`が利用できます。導入は簡単ですが、注意点は`remarkGfm`のバージョンです。
