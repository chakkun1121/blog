---
title: nextjs製のブログに構造化データを追加する方法
description: next.js(13)で作成したこのブログにどのようにして構造化データを導入したのかを解説します。
date: 2023-10-10
tags:
  - next.js
  - nextjs
  - seo
  - blog
  - jsonLD
---

## 構造化データとは?

`構造化データとは、ページに関する情報を様々なサイトで活用できるように標準化したデータ形式で、例えばレシピページでは材料、加熱時間と加熱温度などを詳細に提供できます。`
([google検索セントラル](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=ja)から引用)

## 今回導入した構造化データの種類

今回はブログということで、articleを入れてみます。

## 具体的な方法

### 1.schema-dtsのインストール

これを行うことでtsで構造化データを書く際に型補正、修正ができるので推奨します。

```bash
#npmの場合
npm i schema-dts
#yarnの場合
yarn add schema-dts
#pnpmの場合
pnpm i schema-dts
```

### 2. page.tsxの編集

```tsx
export default async function Page() {
  const data = await getArticleData();
  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    image: data.image,
    author: {
      "@type": "Person",
      name: "chakkun1121",
      url: "https://chakkun1121.github.io/",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
```

## 最後に

このようにすることでnextjs製のブログに構造化データを導入できました。

## 参考文献

- [next.js公式ドキュメント](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld)
