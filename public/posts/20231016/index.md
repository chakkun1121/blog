---
title: Next.jsでGoogleアナリティクスを設定する方法
description: Next.js(app router使用)でgoogleアナリティクスを設定する方法
tags:
  - next.js
  - nextjs
  - google-analytics
date: 2023-10-16
---

## 環境

- next.js 13.5 (app router使用)

## 設定方法

### 1.Googleアナリティクスの測定IDを入手する

ストリートを開き、

1. 管理(設定アイコンのやつ)
2. データストリーム
3. 使用するストリームの左にある >
4. ストリートの詳細にある測定ID(G- から始まるやつ)をコピーする

### 2. 環境変数に計測IDを入れる

.envに入れてもいいですが、デバック時に邪魔なので .env.production に入れることを推奨します。

```
NEXT_PUBLIC_GA_ID= "G-XXXXXXXXXX" //上で取得した測定IDを入れてください。
```

### 3. gtag.tsの作成

gtag.tsを作成します。これはsrcディレクトリを使用していなければroot、使用していればsrcディレクトリ内に作成します。

```ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const existsGaId = GA_MEASUREMENT_ID !== "";

export const pageview = (path: string) => {
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
};
```

これでは型についての警告が出るので型を定義します。

```bach
# npmの場合
npm add -D @types/gtag.js
# yarnの場合
yarn add -D @types/gtag.js
# pnpmの場合
pnpm add -D @types/gtag.js
```

### 4.Google Analytics Client Componentを作成する

Google Analyticsのコードはクライアントサイトで使用する必要があるため、`"use client"`を指定する必要があります。
components/GoogleAnalytics.tsx

```tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

import { existsGaId, GA_MEASUREMENT_ID, pageview } from "../lib/gtag";

const GoogleAnalytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }
    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
```


### 5. layout.tsxから呼び出す

```tsx
import GoogleAnalytics from "@/components/GoogleAnalytics";

// 省略...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="jp">
      <GoogleAnalytics />
      <body>{children}</body>
    </html>
  );
}
```
--- 
2023/11/10追記

next.js v14では上記の方法では、`Entire page deopted into client-side rendering`というエラーを吐き出し、勝手にnoindexタグが設定されます。(このブログはこれが原因で1週間ぐらい新規ページが検索に載りませんでした)そのため、以下のように`Suspense`で囲う必要があります。
```tsx
<Suspense fallback={<></>}>
  <GoogleAnalytics />
</Suspense>
```
---
## 最後に

このようにすることでNext.js製のアプリにgoogleアナリティクスを投入できます。

## 参考資料

- [【Next.js 13】環境ファイル別で Google Analytics を設定する](https://zenn.dev/kazuki23/articles/4cc0cf35a20ac0) (環境ごとに分ける必要がなかったのでそのまま .env.production に書きました。)
