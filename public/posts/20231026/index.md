---
title: nextjsでtailwindcssが効かないときの対処法
description: nextjsでtailwindcssが効かないときの対処法についてまとめました。
tags:
  - nextjs
  - next.js
  - tailwind.css
  - tailwindcss
date: 2023-10-26
---
## 環境

- nextjs:13.5(app router)
- tailwindcss:3.3

あとからtailwindcssを導入しようとして適当にインストールして、他のプロジェクトからのglobals.css,tailwind.config.jsをコピペしてきた。

## 対処方法

公式ドキュメントに従って、順に対処していく。

### 1.まずは必要なライブラリ類のインストール

```bach
npm i -D tailwindcss postcss autoprefixer
# or 
yarn i -D tailwindcss postcss autoprefixer
#or
pnpm i -D tailwindcss postcss autoprefixer
```

途中から入れるとなると`postcss`や`autoprefixer`の入れ忘れのことも多いので全て入れましょう。

### 2. globals.css,tailwind.config.jsをリセットする

上記でも直らないのであれば一度リセットします。

tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 最後に

nextjsのプロジェクトに後からtailwindcssを入れようとして何度も同じ目にあっているのでまとめてみました。tailwindcssを入れるなら最初の`create-next-app`する段階で入れましょう。
