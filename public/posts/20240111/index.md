---
title: Next.js(v14,AppRouter)で動的にタイトルを変更する方法
description: Next.js(app router)でクライアント側から動的にタイトルを変更する方法を解説します。
tags:
  - nextjs
  - next.js
  - document-title
  - usehooks
date: 2024-01-11
---

## はじめに

Next.jsでhtmlの`document.title`を動的に設定する方法を解説します。

## サーバー側からの処理

これはMetadataAPIを使えばすぐにできます。具体的には`generateMetadata`関数をエクスポートするだけです。

## クライアント側からの処理

クライアント側でタイトルを書き換えるのにはMetadataAPIは使用できません。
そのため、[useHooks](https://usehooks.com/)などのReact用のライブラリを使用する必要があります。(`custom hooks`でも同じことができますが、ここではライブラリを使用します。)

`useHooks`の[useDocumentTitle](https://usehooks.com/usedocumenttitle)を使った場合は以下のようになります。

```ts
"use client"
export default function Page(){
  const title= //Todo: タイトルの内容を取得する
  useDocumentTitle(title)
}
```

このようにすることでclient側からもタイトルを変更できます。ただし、この場合は`layout.tsx`で設定したtemplateは使用できなくなるのでご注意ください。

## 最後に

この方法は、[VocabPhrase](https://vocab-phrase.vercel.app)を開発していた際に、ファイルを開いたらそのファイル名をhtmlのタイトルと同期させるのに使用した方法です。
