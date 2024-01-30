---
title: gitのブランチのHeadの移動方法
description: gitのブランチのHeadを移動させる方法を解説します
tags:
  - git
date: 2024-01-31
---

## 結論

1. 移動させたいブランチに切り替え、
2. `git reset <commitID> --hard`の実行
3. 強制プッシュ(`git push -f`)(リモートを使用しているときのみ)

## git reset --hardに付いて

`git reset --hard`は作業ディレクトリ、ステージングエリア、リポジトリを巻き戻す機能です。そのため、強制的にheadを移動できます。

## 注意事項

1. 最後に強制プッシュを行うので操作ミスをすると戻らなくなることがあるのでvscodeの[Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)などを使用して強制プッシュ前に確認してください。
2. 強制プッシュでエラーが出る場合はほとんどセキュリティ設定が原因です。githubのリポジトリのsettings→branchs→操作するブランチ名→Editから一旦ロックを解除してください。(個人開発のときは一旦ターゲットのブランチ名の最後に`_`などをつけて作業後に戻すのをおすすめします。)

## 参考文献

* [Gitでよく使うコマンドまとめ #Git - Qiita](https://qiita.com/y_arakawa/items/3cefb482205f51b16912)
* [第6話 git reset 3種類をどこよりもわかりやすい図解で解説！【連載】マンガでわかるGit ～コマンド編～ - itstaffing エンジニアスタイル](https://www.r-staffing.co.jp/engineer/entry/20191129_1)
