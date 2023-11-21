---
title: Javascript小ネタ:Array.sort()-Number型をソードするときの注意点
description: Array.sortでNumber型をソードするときの問題点や注意点についてまとめてみます
date: 2023-11-20
tags:
  - js
  - sort
  - eslint
---

## 最初に

以下のコードには問題があります。それはなにかわかりますか?

```js
const numbers = [5, 200, 10];
numbers.sort();
console.log(numbers);
```

このように書くと`[5,10,200]`となりそうですが、実際には、`[10, 200, 5]`となります。

## 理由

`Array.sort`は比較関数が明示されない場合、すべて自動的に`string`型に変換され、Unicode順に並べられます。そのため、入力された配列は`["5","200","10"]`と変換され、一文字目から文字コードで比較して並び替えるため、`["10","200","5"]`となります。一応Number型で入力した際にはNumber型に戻されます。

## 対処法

Array.sortを使う際には必ず比較関数を入れましょう。

```js
numbers.sort((a, b) => a - b);
```

## 対策

この対策としてeslintの設定で@typescript-eslint/require-array-sort-compareを設定しましょう。

```json
{
  "@typescript-eslint/require-array-sort-compare": "error"
}
```

これでsortを使用する際に比較関数を入れないとエラーとして検出されます。
