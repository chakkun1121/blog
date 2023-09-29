---
title: nextjsでリダイレクトを行う方法
date: 2023-08-23
tags: ["nextjs", "react"]
description: nextjs の app router (next13)でのリダイレクトの方法
---

ネット上であまりいい情報がなかったので自分なりにまとめます。

## 1. router.push

1つ目の方法は[useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router)を利用する方法です。

```tsx
"use client"; //Client Componentsでしか使用できない
import { useRouter } from "next/navigation"; // next/router ではない

export default function Page() {
  const router = useRouter();
  router.push("./どこか");
  return <></>;
}
```

この方法はクライアントサイドでのみ使用できます。そのため主にユーザーの操作によってリダイレクトを行うときに使います。
また、この方法ではリダイレクトが行われるまで少し時間がかかるのでもとのページが表示されます。

## 2. redirect

2つ目の方法は[redirect](https://nextjs.org/docs/app/api-reference/functions/redirect)を利用する方法です。

```tsx
import { redirect } from "next/navigation";
export default function Page() {
  redirect("./どこか");
  return <></>;
}
```

この方法はサーバーサイドでもクライアントサイドでも使用できます。そのため主にサーバーサイドでのリダイレクトに使います。そのため、ログインが必要なページで未ログイン時などに使います。また、404を表示するだけなら `notFound` を使います。

```tsx
import { notFound } from "next/navigation";
export default function Page() {
  notFound();
  return <></>;
}
```

## 3. router.pushとredirectの違い

|                                  | router.push                      | redirect                                   |
| -------------------------------- | -------------------------------- | ------------------------------------------ |
| クライアントサイドで使用できる   | ○                                | ○                                          |
| サーバーサイドで使用できる       | ×(ReactHookのため)               | ○                                          |
| リダイレクトが行われるまでの時間 | 一瞬もとのページが表示される     | サーバーサイドでの仕様の場合は表示されない |
| 主な使用方法                     | ユーザーの操作によるリダイレクト | サーバーサイドでのリダイレクト             |
