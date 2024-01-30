---
title: ubuntuのログインループの対処
description: ubuntuでのログインできない(ログインループが発生する)場合の対処法をまとめます。
date: 2024-01-30
tags:
  - ubuntu
  - ログインループ
---
## 対処方法

### 0. コマンドラインでログインする

ログイン画面で`ctrl+alt+3`を押し、ユーザー名、パスワードを入力してログインします。

### 自動ログイン設定をしても大丈夫な場合

一度ログインループを解消してもubuntuではまたループすることがあります。これの根本的解決方法がログインページを飛ばすことです。以下の方法で設定します。

#### 1. `/etc/gdm3/custom.conf`を開く

例では`nano`エディターを使っていますが`vim`などでも大丈夫です。

```shell
sudo nano /etc/gdm3/custom.conf
```

#### 2. 以下の2行のコメントアウトを解除する

```conf
#AutomaticLoginEnable=True
#AutomaticLogin = userName
```

`userName`はログインしたいアカウント名にしてください。

#### 3. ファイルを保存して再起動する

```shell
sudo reboot #再起動
```

### 自動ログインを使用できず、ログインループを治す方法

手順ごとに再起動してみてログインできるかを確認してください。

#### 1. パッケージをアップデードする

```shell
sudo apt-get update && sudo apt-get upgrade
```

#### 2. Xauthorityのアクセス権限を確認する

```shell
ls -lah | grep -i Xauthority
sudo chown username:username .Xauthority
```

`username`はログインしようとしているアカウント名にしてください。

#### 3. `/tmp`ディレクトリの権限を確認する

```shell
sudo ls -lah /tmp
```

これを実行して`drwxrwxrwt`の用に見える場合は問題ありません。そうでない場合は以下のコマンドで修正します。

```shell
sudo chmod 1777 /tmp
```

これでも治らない場合は以下のコマンドで修正します。

```shell
sudo apt-get -y install lxdm
```

#### 4. これでも治らない場合

これでも治らない場合は一度自動ログインを有効にしてログインしたあとに設定で戻してください。

## 参考

* [Ubuntu のログイン ループ問題を解決する方法 - WebSetNet](https://websetnet.net/ja/how-to-fix-the-ubuntu-login-loop-problem/)
* [Ubuntu 20.04で自動ログインを有効にする方法?](https://ja.linux-console.net/?p=16351)
