---
title: nextjsで動的にog-imageを作成する方法
description: next.js(13)で動的にopengraph imageを作成する方法を解説します。
tags:
  - next.js
  - nextjs
  - og-image
  - opengraph
  - opengraph-image
date: 2023-10-04
---

## 環境設定

```txt
nextjs: v13.5.4
reactなどは最新版
```

## ディレクトリ構造

```txt
/
├app
│ ├ [id]
│ │ ├ page.tsx
│ │ └ opengraph-image.tsx
│ └ page.tsx
└ next.config.js
```

## それぞれのファイルの解説

### app/page.tsx

```tsx
export default function Page() {
  return <div>test page</div>;
}
```

これはエラー防止のためにあります。(特に内容はありません)

### app/\[id]/page.tsx

```tsx
export default function Page({ params }: { params: { id: string } }) {
  return <div>id:{params.id}</div>;
}
```

ここでは例えば /1 にアクセスした際にはid:1と表示されます。これはnextjsの[ダイナミックルーティング](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)というシステムを利用しています。

### app/\[id]/opengraph-image.tsx

これが今回の鍵を握るファイルです。

```tsx
import { ImageResponse } from 'next/server'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'
export default function Image({params}:{params:{id:string}}){
  return new ImageResponse(
    (
       <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        id:{params.id}
      </div>
    )
}
```

ここではテストのためidをそのまま出しています。これで 1/opengraph-image にアクセスすると下のような画像が表示されます。

![結果](./opengraph-image-example.png)

## SSGでの使い方

SSGで使用する際にはファイルを以下のように変更します。

### next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = nextConfig;
```

### app/\[id]/page.tsx

```tsx
//以下を追加
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}
```

ここではIDに1と2が来るという前提で書いています。

### app/\[id]/opengraph-image.tsx

SSG対応をしようとすると以下のようなエラーを吐きます

![エラー](./error.png)

これを対処するために以下のようにgenerateStaticParamsを追加します。

```tsx
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}
```

これをやっても上のエラーは消えません。

原因は[next.js側にある](https://github.com/vercel/next.js/issues/51147)ようです。そのため、対処法は今のことろありません。そのため最新版(v13.5.4)ではSSGに対応できないので諦めてこのファイルを削除する必要があります。

```
2023-10-12追記
現在の最新バージョン v13.5.5でも同様の事例が発生するようです。早く直してほしい
```

## 最後に

このようにすることでnext.jsで動的にopengraph-imageを作成できます。ただし、まだSSGでは利用できません。(これは私が報告し、公式も認めました。)ご注意ください。(私はわけがわからないエラーで1時間以上溶かしました。)
