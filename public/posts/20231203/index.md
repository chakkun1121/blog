---
title: Next.js + Firebaseでログイン作成
description: Next.js+Firebaseでメールログインの設定方法を解説します
date: 2023-12-03
tags:
  - nextjs
  - next.js
  - firebase
  - login
---

## 準備

* [Firebase](https://console.firebase.google.com)でプロジェクトを準備する
* [Firebaseを使えるように設定する](./20231202)

## 1.firebase/index.tsの編集

```ts
import { initializeApp } from "firebase/app";
//↓追加
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  //略
};

const app = initializeApp(firebaseConfig);
//↓追加
export const auth = getAuth(app);
```

## 2. react-firebase-hooksのインストール

これは必須ではありませんがとても楽に管理できるのでおすすめします。

```bach
npm i react-firebase-hooks
# or
yarn i react-firebase-hooks
# or
pnpm i react-firebase-hooks
```

## 3. ログインページの作成

適当な場所に作成してください。

```tsx
"use client";
import { auth } from "@/firebase";  //パスは必要に応じて調節してください
import { ref, set } from "firebase/database";
import { useRouter } from "next/navigation";  // ←next/routerではない
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loginLoading, error] =
    useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, newUser, loading] =
    useCreateUserWithEmailAndPassword(auth);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  if (user) {
    router.push("/");
  }
  return (
    <form className="flex flex-col p-2 border rounded gap-2">
      <div>
        <input
          className="w-full focus:outline-none focus:border-b border-blue-700"
          type="text"
          placeholder="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={isLoading}
        />
      </div>
      <div>
        <input
          className="w-full focus:outline-none focus:border-b  border-blue-700"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          readOnly={isLoading}
        />
      </div>
      <div>{error && <p>{error.message}</p>}</div>
      <button
        type="submit"
        className="bg-blue-100 hover:bg-blue-200 p-2 rounded"
        onClick={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          await signInWithEmailAndPassword(email, password);
          setIsLoading(false);
        }}
        disabled={isLoading}
      >
        ログイン{loginLoading && "中"}
      </button>
      <p className="text-center">or</p>
      <button
        className="bg-blue-100 hover:bg-blue-200 p-2 rounded"
        onClick={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          const user = await createUserWithEmailAndPassword(email, password);
          if (!user) throw new Error("user is null");
          router.push("/");
          setIsLoading(false);
        }}
        disabled={isLoading}
      >
        登録{loading && "中"}
      </button>
    </form>
  );
}
```

## 4.ログイン情報が必要なページで以下のようにして情報を取得する

```tsx
"use client" // 今回の方法ではuse clientが必須になる
import { useAuthState } from "react-firebase-hooks/auth";

export default function Page(){
  const [user] = useAuthState(auth);
  //略
}
```

## 最後に

このようにfirebaseとreact-firebase-hooksを使うことで簡単に認証ができます。
