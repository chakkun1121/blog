---
title: nextjs製のアプリをPWAする簡単な方法
date: 2023-09-01
description: nextjs(app directory使用)で作成したアプリケーションを簡単にPWA化する方法
tags:
  - nextjs
  - next.js
  - pwa
---

## 前提条件

- nextjs製のアプリができていること
- アプリケーション名、アイコン(512x512を推奨)があること

## 手順

### 1. next-pwaのインストール

```shell
# npmの場合
npm install next-pwa

# yarnの場合

yarn add next-pwa

# pnpmの場合

pnpm add next-pwa

```

### 2. next.config.jsの作成

```js
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // github pagesなどの場合は以下の一行を追加
  //output: "export",
});
```

### 3.manifest.jsonをpublicフォルダー内に作成する

```json
{
  "name": "webアプリの名前",
  "icons": [
    {
      "src": "アイコンのパス",
      "sizes": "アイコンのサイズ(例:512x512)",
      "type": "(画像のタイプ(pngはimage/png))",
      "purpose": "maskable any"
    }
  ]
}
```

### 4.layout.tsxに以下を追加

```tsx
export const metadata: Metadata = {
  manifest: "./manifest.json",
};
```

### 5. gitignoreに以下を追加

```gitignore
# PWA files
**/public/sw.js
**/public/workbox-*.js
**/public/worker-*.js
**/public/sw.js.map
**/public/workbox-*.js.map
**/public/worker-*.js.map
```

### 6. プレビューの起動

これでPWA化が完了します。
