---
title: next.jsでのブログの作成方法
date: 2023-08-17
description: このブログの技術的な話
tags:
  - nextjs
  - next.js
---

## はじめに

この記事ではこのブログについての技術的な話をします。

## 免責事項

この記事の内容を実行する際には自己責任でお願いします。また、あまりnextjsを理解していない人が書いているので間違っていても許してください。

## 環境について

この記事ではnodejsやnextjsなどの基本的な導入方法については解説しません。自分で調べてください。以下がこのブログの環境です。

(何故か埋め込みが拒否される。あと、なぜかiframeを入れるとエラーを吐く)

[package.json](https://github.com/chakkun1121/blog/blob/eae906353ef1c040e40bc360491468f69d4d2023/package.json#L11-L40)

今回はApp Routerを採用しました。やはりAppRouterのほうがわかりやすかったです。(てかPagesRouterをほぼ触ったことがない)

## ディレクトリ構成

今回はだいたいこんな感じになりました。(一部省略しています。実際のリポジトリは[こちら](https://github.com/chakkun1121/blog))

```txt
app
├── _components
│   ├── header.tsx , footer.tsx
│   ├── posts.tsx
│   ├── recentArticles.tsx
│   └── ... その他コンポーネント
├── posts/[title]
│   ├── [page]
│   │   └── page.tsx
│   └── page.tsx
├── layout.tsx
├── sitemap.ts (記事の一覧のsitemap.xmlを生成するやつ)
├── page.tsx
├── loading.tsx
├ @types (tsの型定義置き場)
├── posts
│   ├── 20230817 (この記事のやつ)
│   │   └── 20230817.md
│   └── ... その他記事のmdファイル
├── public
│   ├── sitemap.txt (homeへのリンクのみが書かれたやつ)
│   └── ... その他画像など
└── ... その他設定ファイルなどの山
```

## 個別ファイルの解説

### app/layout.tsx

このファイルはAppRouterではホームのレイアウトを設定するために使います。今回はヘッダーとフッターを設定しました。
ヘッターとフッターはapp/\_componentsから呼び出しています。(前の生コードで書いていたやつよりだいぶ楽になった)
また、デザインは[デジタル庁のサイト](https://www.digital.go.jp/experimental/)を参考にしました。

### app/page.tsx

これは投稿一覧を表示するコンポーネントを呼び出すためだけのファイルです。後で記事ページにも最新の記事一覧を表示できるようにするため、分離しました。

### app/\[title]/page.tsx , app/\[title]/\[page]/page.tsx

ディレクトリに\[title]が含まれているのは[DynamicRoutes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)のためです。これを利用することで関数の引数としてparamsを受け取れます。

このファイルではレンタリング部分を完全にrender関数に切り分けています。これは複数ページ用の app/\[title]/\[page]/page.tsx でも全く同じように使うためです。
ここも app/\_components/posts.tsx と同じようにして記事の情報と記事の内容を取得しています。

renderの返り値では次のように BlogLayout で囲っています。
[app/\[title\]/page.tsx](https://github.com/chakkun1121/blog/blob/9ba0b099d88e0a902fd8a5761d76bfd30fb07d94/app/posts/%5Btitle%5D/page.tsx#L20-L26)

BlogLayoutの[最初の方](https://github.com/chakkun1121/blog/blob/9733ece296665c79443bde8d391676c671deee2e/app/posts/%5Btitle%5D/page.tsx#L44)の解説をします。

ほぼコメントで書いてあるとおりですが、childrenには以下のような感じで渡されます。

(例)

```html
<p>
  投稿日:2023/8/17
</p>
<>
  <h1 id="nextjsでのブログの作成方法">next.jsでのブログの作成方法</h1>
  <h2 id="はじめに">はじめに</h2>
  <p>この記事ではこのブログについての技術的な話をします。</p>
  <!--以下省略-->
</>
```

このように投稿日と本文の2つが渡されてきます。そのため、`React.children.toArray(children)`でchildrenを配列に変換し、\[(投稿日),(本文)]というように分割します。その後、それぞれをレンタリングします。

### app/\_components 内の解説

app/\_components内は他のところで使い回せるようにしたコンポーネントを置いています。

#### posts.tsx

これは投稿記事一覧を取得するためのコンポーネントを呼び出すのと、投稿一覧というタイトルを表示します。

#### recentArticles.tsx

これは最新記事を指定された件数まで表示するコンポーネントです。

今回は記事を /posts上に置き、内部ディレクトリは以下のようにしました。

```txt
posts
├── {title}  (titleはだいたい作成日)
│   └── {title}.md
├── {title}
│   ├── 1.md
│   ├── 2.md
│   └── ... この調子で続く
```

このように複数ページに分割することができるようにしました(ただ、内部リンクなどの都合によってまだ使われていない)。これに伴い、記事のファイルを取得するコードがとても汚くなりました。
↓大体のロジック

```txt
posts内のすべてのフォルダーで
  フォルダー内のすべてのファイルを取得
  ファイルが1つのみだったら、pathは{folderName}で決定
  もし、複数だったら、pathは{folderName}/1.mdで決定
  決定したパスのファイルを取得し(ファイル取得は別の関数に切り分け済み)、その中からtitleなどの情報を取得
  最後にPostCardコンポーネントに情報をわたし、レンタリング
```

このようにして記事の一覧、パス、タイトルなどの情報を取得してします。

### その他のファイルの解説

#### sitemap.ts

これはnextjsで動的にサイトマップを生成するファイルです。これを使用することで記事を追加した際にもsitemapの変更が不要になります。

## スタイルについて

今回はtailwindcssを採用しました。また、デジタル庁のデザインがきれいだったので[デジタル庁のデザインシステム](https://www.digital.go.jp/policies/servicedesign/designsystem)を参考にさせてもらいました。これに基づくtailwind.config.jsについては別記事で書きます。

## 今後の課題

- コードの装飾
- githubのコードの埋め込み
- 記事ページのスタイル

## おわりに

一部ゴリ押しでなんとかした面もありますが、なんとかブログが完成しました。これ以降は主にnextjsなどについて書いていこうと思っています。
