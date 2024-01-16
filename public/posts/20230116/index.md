---
title: EyeDropper API
description: EyeDropper APIを使ってみます。
tags:
  - webAPI
date: 2024-01-16
---

## APIについて

このAPIはカラーピッカーを作るのに使用できます。詳しくは[MDN](https://developer.mozilla.org/ja/docs/Web/API/EyeDropper_API)を参照してください。

## 例

<iframe height="300" style="width: 100%;" scrolling="no" title="Demo" src="https://codepen.io/chakkun1121/embed/preview/XWOxYxG?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/chakkun1121/pen/XWOxYxG">
  EyeDropper API Demo</a> by chakkun1121 (<a href="https://codepen.io/chakkun1121">@chakkun1121</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

```js
async function getColor(){
  const color=await eyeDropper.open()
  console.log(color) // [object object]
  console.log(color.sRGBHex) //例 #ffffff
}
```
## 対応状況

[caniuse.com](https://caniuse.com/mdn-api_eyedropper )

パソコン版chromeでのみの対応となっています。スマホでは利用できません。また、firefoxなどでは利用できません。
