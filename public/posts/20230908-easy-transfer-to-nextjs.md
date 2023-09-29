---
title: nextjsへの移行の簡単なやり方
date: 2023-09-08
description: 生コード(jQueryを含む)のアプリをnextjsに移行する簡単な方法
---

## 前提条件

- html,css,jsで作成されたアプリケーションがあること(jQueryなどのライブラリーを使用している場合はそれらも含む。ただし、webpackなどを利用しており、そのままブラウザで表示できない場合は除く)
- nodejsが入っていること
- nextjsに移行したいと思っている

## 手順

### 1.nextjsなどをインストールする

```bash
# npmの場合
npm install next react react-dom
# yarnの場合
yarn add next react react-dom
# pnpmの場合
pnpm add next react react-dom
```

その後、package.jsonのscriptsに次のように追加する

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### 2.ディレクトリー、ファイルを作成する

次のようなディレクトリ構造にする

```txt
/
├── app
│   ├── page.js
│   └── layout.js
├── public (古いファイルたちはこの中にすべてぶち込む)
└── ... その他設定ファイルなど
```

layout.js

```jsx
export default function Layout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
```

### 3. app/page.jsを作成する

```jsx
export default function Page() {
  return (
    <>
      <h1>Hello World</h1>
    </>
  ); //ここにhtmlを書く;
}
```

### 4. devサーバーを起動する

```bash
# npmの場合
npm run dev
# yarnの場合
yarn dev
# pnpmの場合
pnpm dev
```

### 5. デプロイする

github pageへのデプロイ方法は[こちら](./20230831)を参考にしてください。。

### 6. 他のページをnextjsに移行していく

## 終わりに

このようにすることで既存のコードを残しながらnextjsに移行できます。
