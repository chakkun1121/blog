---
title: tailwindcssでのpeerの注意点
description: tailwindcssのpeerの注意点をまとめます。
date: 2024-04-02
tags:
  - tailwindcss
  - css
---

## 結論

`peer-〇〇:`をつかう際は`peer`クラスをつけた要素のあとに書きましょう

例:

```html
<div>
  <label className="peer-checked:bg-green-300" htmlFor="bad-example">
    だめな例
  </label>
  <input type="radio" className="hidden peer" id="bad-example" name="example" />
</div>
<div>
  <input
    type="radio"
    className="hidden peer"
    id="good-example"
    name="example"
  />
  <label className="peer-checked:bg-green-300" htmlFor="good-example">
    良い例
  </label>
</div>
```

## 理由

tailwindcssの`peer-〇〇`は`.peer:〇〇 ~ .peer-〇〇\:〇〇 {}`という形式となっている。また、cssの`~`(チルダ)はその要素**以降**の兄弟要素を指す。そのため`peer`のほうが先にないと指定されない様になる
