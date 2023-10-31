---
title: next.jsでrecoilを永続化する方法
description: next.js(14)でrecoilを永続化(ローカルストレージ、セッションストレージ)に保存する方法
tags: 
  - next.js
  - nextjs
  - recoil
  - localStorage
  - settionStorage
date: 2023-10-31
---
## 0. recoilの設定

### 1. recoilのインストール

```bach
npm i recoil
# or
yarn i recoil
# or
pnpm i recoil
```

### 2. RecoilRootでラップする

app/provider.tsx

```tsx
'use client'

import { ReactNode } from "react";
import { RecoilRoot } from "./recoil";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>{children}</RecoilRoot>
  );
}

```

app/layout.tsx

```tsx
import { ReactNode } from "react";
import { AppProvider } from "./provider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
```

### 3. atomの設定

```ts
export const sampleAtom=atom({
  key: 'sample',
  default: 0,
});
```

## 1 Recoil-persistのインストール

```bach
npm i recoil-persist
# or
yarn i recoil-persist
# or
pnpm i recoil-persist
```

## 2. atomを編集する

```ts
const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: typeof window === "undefined" ? undefined : localStorage // or settionStorage
});
export const sampleAtom=atom({
  key: 'sample',
  default: 0,
  effects_UNSTABLE: [persistAtom]
});
```

## 最後に

このようにして簡単にrecoilを永続化できます。これを使えば、next.js製のアプリで簡単に設定を保存する機能などを追加できます。

## 参考文献

* [NextjsのApp RouterでRecoilを使う #React - Qiita](https://qiita.com/KokiSakano/items/834958e4ac3cbacfad3a)
* [Next.jsでRecoilの永続化 #Next.js - Qiita](https://qiita.com/dende-h/items/16d8d65d52361000cef7)
