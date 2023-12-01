---
title: 【クソアプリ】キーボードが操作できないページを作った
description: 【クソアプリ】キーボードが操作できないページを作った
date: 2023-12-01
tags: 
  - web-app
  - nextjs
  - next.js
---
## アプリ本体

[これ](https://chakkun1121.github.io/block-key-inputs/)

## 使用技術

使い慣れているということでnext.jsを使用しました。~~技術の無駄遣い~~ ビルド先もいつも通りgithub pagesを使用しました。

## コード部分
```js
document.addEventListener("keydown",(e)=>{e.preventDefault()})
```
やっていることは、`keydown`イベントが発生したらそれをキャンセルしているだけです。

ただし、これではタブで開いているときに特定のイベント(例えば`ctrl+w`など)が取れなかったのでそれらを取るためだけにPWA化しました。

これをclientサイドで実行するためuseEffectで囲みました。(本来この使い方はすべきでないかもしれないがクソアプリなので...)

