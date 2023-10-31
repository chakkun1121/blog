---
title: 和訳表示サイトv5.4.0リリース
description: 和訳表示サイトv5.4.0をリリースしました。
tags:
  - view-english
  - chakkun1121's-app
date: 2023-10-31
image: https://chakkun1121.github.io/view-english/img/view-english.webp
---

[和訳表示サイト](https://chakkun1121.github.io/view-english/app)の変更について説明します。

## このバージョンの更新点

- 設定機能の追加
- ダークモード(flag)の追加
- (まだ何もできないが)ログイン機能の追加

## 技術的な話

### 設定機能

設定機能はrecoilを永続化することで対処しました。これについては別の記事に書きます。

### ログイン機能

ログイン機能はfirebaseで作成しました。また、[react-firebase-hooks](https://github.com/csfrequency/react-firebase-hooks/ )がとても便利でした。
