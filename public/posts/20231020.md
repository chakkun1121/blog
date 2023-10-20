---
title: github-actionsを指定した時間に実行する方法
description: github actionsで指定した時間に実行する方法
tags:
  - github-actions
date: 2023-10-20
---

## はじめに

今回はgithub actionsを指定した時間に実行する方法を解説します。

## 方法

最初に結論を出します。

```yarm
on:
  schedule: //時間を記述
```

## 解説

### github actionsの起動方法

github actionsはリポジトリの `.github/workflows/`の中に`<任意の名前>.yarm`としてプッシュすれば登録されます。また、起動するトリガーの設定は`on:`で指定します。トリガーは複数の方法で記述できます。

### 時間の記述方法

時間は[POSIX cron syntax](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07)という方法で記述します。 POSIX cron syntaxについては[こちらのサイト](https://crontab.guru/)がわかりやすいです。また、タイムゾーンは日本標準時ではなく世界標準時なので気をつけてください。

### 注意事項

実際に実行されるのは指定した時間より20分程度遅延することがあるらしいので毎日や毎時間ぐらいの精度になります。これで困る場合は別の手段が必要になります。

## 終わりに

このようにして指定した時間ごとに処理を走らせられます。これを使用してこのブログを毎朝再ビルドしています。これによって予約投稿機能を実現されています。

## 参考資料

* [Events that trigger workflows - GitHub Docs](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule)
