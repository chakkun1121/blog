---
title: Next.jsのプレビューサーバーを高速化する方法
description: Next.js(v14.1)のプレビューサーバーを高速化する方法を解説します。
tags:
  - nextjs
  - next.js
data: 2023-11-06
---
## 環境

next.js:v14.1

## 結論

次のコマンドでプレビューサーバーを起動する

```bach
next dev --turbo
```

もしくは、package.jsonを以下のように書き換える
```json
// ...省略
"scripts":{
  "dev":"next dev --turbo",
  // ...省略
  
```

## 理由

next.js(vercel)は[プレビューサーバーの高速化のためにRustベースのコンパイラを作成してい](https://nextjs.org/blog/next-14 )ます。これはパフォーマンスがとても良いですが、まだベータ版なのでコマンドで使用することを明示する必要があります。ただ、これもそろそろ安定版になるらしいので安定版になるまでこちらを使用しましょう。

## 参考文献

* [Next.js 14まとめ](https://zenn.dev/a_da_chi/articles/6235ef4b317368)
* [Next.js 14 | Next.js](https://nextjs.org/blog/next-14)
