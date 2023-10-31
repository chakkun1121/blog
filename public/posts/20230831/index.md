---
title: nextjsをgithub pagesにデプロイする方法
date: 2023-08-31
description: nextjs(app directory使用)をgithub pagesにデプロイする方法について
tags:
  - nextjs
  - next.js
  - github pages
---

## はじめに

この記事ではnextjs(app directory使用)をgithub pagesにデプロイする方法について書きます。ただし、nextjsについては書きません。

### 前提条件

- nextjs製のアプリを作成した(ローカルでは動く)
- github pagesにデプロイしたい
- パッケージマネージャはpnpmを利用している
- しかし、pnpm-lock.yamlは除外している

## 本題

最初にgithub actionsの設定をします。(github actionsについては各自調べてください。)

次のように .github/workflows/nextjs.yml を作成します。

```yml
name: Next.js製のアプリをpnpmを使ってデプロイする

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - uses: pnpm/action-setup@v2
        name: Install pnpm
        id: pnpm-install
        with:
          version: 8
          run_install: false

      - name: Get pnpm store directory
        id: pnpm-cache
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT
      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
      - name: Install dependencies
        run: pnpm install --no-frozen-lockfile

      - name: Setup Pages
        uses: actions/configure-pages@v3
        with:
          static_site_generator: next
      - name: Build with Next.js
        run: pnpm next build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

このファイルを設置後の大体のディレクトリ構成

```txt
.github
  └ workflows
    └ nextjs.yml
app (本体)
  ├ layout.tsx (or layout.js)
  └ ... その他諸々
out (ビルド後のファイル(自動生成))
... その他諸々
```

これで大体の場合は対処できます。

## 問題の処理

この方法だけだと、ダイナミックルーティング(動的ルーティング)(大かっこ(\[])で囲まれたフォルダーを利用する)を使用しているとそのページが表示できません。理由としては、その場合はparamsを利用することになりますが、まだそのparamsに何が来るかがビルド段階では決定できないためレンタリングできません。しかし、github pagesにデプロイ仕様としているのであれば、ビルド時にどのparamsが入る可能性があるのかは予想できるはずです。(そうでなければgithub pagesは諦めてください。)そのため、ビルド時にparamsに何が入る可能性があるのかを明示的に教えなければいけません。(他のところにリンクがあるからといって、自動的にはやってくれません。)そのため、ダイナミックルーティングを利用しているpage.tsxは以下のようにgenerateStaticParamsをエクスポートします。

```tsx
// ブログページでの利用例
export default async function Page({ title }: { title: string }) {
  const data = await getData(title);
  return <div>{data}</div>;
}
export async function generateStaticParams() {
  return await allArticlesData().then((data) => {
    return data.map((article) => {
      return {
        params: {
          title: article.title,
        },
      };
    });
  });
}
```

### 2023-10-24追記

next.js v13.5では、`Page <ページパス> is missing exported function "generateStaticParams()", which is required with "output: export" config.`と警告してくれるようになりました。これが出た場合は上記の通り`generateStaticParams`を追加してください。(ただし、何故かバグで表示されることもあるので怪しかったら実際にビルドしてみてください。)

### 追記終了

このようにすることでビルド時にどのtitleが来るのかを決定することができます。ただし、これはビルド時にすべてのparamsを決定することになるので、ビルド後に変更することはできません。また、paramsの数が多い場合はビルド時間が長くなることはありますが、ビルドは放置しておけば終わるので気長に待ちましょう。(これをクライアントのリクエストが来てからだとページの表示が遅くなりますが、ビルド時にやってしまえばページの読み込みは早くなります。)

## おわりに

このようにすることでNext.js製のアプリをgithub pagesにビルドできます。ちなみにこのブログもこの方法を利用してgithub pagesにデプロイしています。