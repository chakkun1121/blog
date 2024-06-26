---
title: nextjsでRSSフィールドの追加方法
tags:
  - nextjs
  - next.js
  - rss
description: nextjs(app router)でRSSフィールドを追加する方法を紹介します。
date: 2023-09-30
---

## 環境

package.json(一部のみ)

```json
{
  "dependencies": {
    "next": "13.5.3",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "typescript": "^5.2.2"
  }
}
```

## 設置方法

### 1.RSSというパッケージのインストール

```bash
# npmの場合
npm install rss @types/rss
# yarnの場合
yarn add rss @types/rss
# pnpmの場合
pnpm add rss @types/rss
```

### 2.app/rss.xml/route.tsを作成する

```ts
import RSS from "rss";

export async function GET() {
  const articles = await getArticlesData();
  const feed = new RSS({
    title: siteTitle,
    description: siteDescription,
    site_url: siteUrl,
    feed_url: siteUrl + "/rss.xml",
  });
  articles.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: siteUrl + article.link,
      date: article.date,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
```

記事の取得欄はそれぞれ適切に書き換えてください。

## 最後に

この処理だけでrssフィールドを追加できます。SSGにも対応しています。そのためこのブログにも[RSSフィールド](../rss.xml)を追加しました。。
