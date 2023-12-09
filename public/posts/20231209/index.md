---
title: javascript小ネタ:配列メゾットについて
description: Javascriptの配列メゾットについてまとめます
date: 2023-12-09
tags:
  - javascript
  - array
  - 小ネタ
---

## 結論

今回解説するのは以下のメゾットです。

|処理内容|破壊処理版|非破壊処理版|
|:--|:--|:--|
|配列の先頭に追加|unshift|Array.toSpliced(0,0,items)|
|配列の後ろに追加|push|Array.concat(items)|
|配列の最初を消去|shift|Array.slice(1)|
|配列の末尾を消去|pop|Array.slice(0, -1)|
|配列内の並び替え|[sort](./20231120)|toSorted|
|配列を逆にする|reverse|toReversed|

## はじめに - 破壊処理と非破壊処理について

Javascriptでの配列の操作には破壊処理と非破壊処理があります。破壊処理の場合は処理を行うことでもとの配列を変更します。(戻り値は消されたものや変更後の配列の長さになります。)しかし、非破壊処理の場合はもとの配列は変更せず処理後の配列が戻り値となります。

## それぞれのメゾットについて解説

### Array.unshift

[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

`Array.unshift`は配列の先頭に引数の要素を追加します。返り値は変更後の配列の長さです。

`Array.unshift`の非破壊処理は`Array.toSpliced(0,0,items)`となります。

### Array.push

[MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

`Array.push`は配列の末尾に引数の要素を追加します。返り値は変更後の配列の長さです。

`Array.push`の非破壊処理は`Array.concat(items)`です。

```js
const array1=[1,2,3];
const array2=array1.concat([4,5]);
console.log(array2);
// >[1,2,3,4,5]
```

### Array.shift

`Array.shift`は`Array.unshift`とは逆に配列の最初に追加ではなく削除します。返り値は削除した要素です。

`Array.shift`の非破壊処理は`Array.slice(1)`となります。

### Array.pop

`Array.pop`は配列の最後の要素を削除し、その要素を返します。

`Array.pop`の非破壊処理は`Array.slice(0, -1)`

### Array.sort

[注意事項](./20231120)

`Array.sort`の非破壊処理は`Array.toSorted`です。

### Array.reverse

`Array.reverse`は配列の順序を逆にします。

`Array.reverse`の非破壊処理は`Array.toReversed`です。

## 最後に

今回はjsの配列の基本処理をまとめました。
