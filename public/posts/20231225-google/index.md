---
title: next.jsでGoogleDriveAPIを操作
description: next.jsでGoogleDriveAPIを操作する方法を解説します。
tags: 
  - nextjs
  - next.js
  - GoogleDriveAPI
date: 2023-12-25
---

## はじめに

今回はNext.js(v14,app router)でGoogleDriveAPIを使用する方法を解説します。

## GoogleDriveAPIの準備

ここではあまり解説しませんが、GoogleCloudConsoleでGoogleDriveAPIを有効にしてNextAuthなどを使用してログイン画面を作成して、アクセストークンを取得できるようにします。

## GoogleDriveAPIの叩き方

GoogleDriveAPIにはいくつかの叩き方があります。

- [googleapis](https://www.npmjs.com/package/googleapis) ライブラリを使用する方法
- [gapi](https://github.com/google/google-api-javascript-client) ライブラリを使用する方法
- 直接APIにfetchする方法

それぞれについて解説していきます。

### googleapisを使う方法

これは[公式ドキュメント](https://developers.google.com/drive/api/guides/about-sdk)に乗っている方法です。
ただし、この方法はNode.js上ではないと動かせないのでclientでは利用できません。
今回はclientでファイルの編集を行うアプリを作成したので、わざわざそのためにサーバーを準備するのはコスト面やセキュリティ面から見送りました。

### gapiを使う方法

これはclient側で処理をできますが、何故かhtmlのscriptタグで読み込まないといけないらしくNext.js(特にts)との相性が悪そうだったので見送りました。

### 直接APIを叩く

これはGoogleが用意したAPIに直接fetchでリクエストを飛ばす方法です。これはライブラリがないので全て自分でやる必要がありますが、他にいいライブラリがなかったので仕方がなくこれを選びました。

## 実際にAPIの叩き方を解説

### ファイル一覧表示

ファイル一覧を表示するには`https://www.googleapis.com/drive/v3/files`に`GET`します。ただし、権限が`https://www.googleapis.com/auth/drive.file`(認証などの都合からこれを選ぶことが多いです)の場合は、アプリで作成した、もしくはユーザーによって開かれたファイルしか取得できません。以下の例では件数が多くなるとページが分けられるのでこのままではうまく動きませんが、10件程度では問題なく動きます。

例

```ts
const token= /*TODO: アクセストークンを取得する(他も同様)*/ ;
async function getFilesList() {
  try {
    const files = await fetch(
      "https://www.googleapis.com/drive/v3/files?trashed=false",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res.files)
      .catch((e) => {
        throw e;
      });
      return files
    } catch (e) {
      console.error(e);
    }
  }
```

### ファイル情報の取得

ファイル情報の取得には`https://www.googleapis.com/drive/v3/files/${fileId}`に`GET`します。

例:

```ts
function getFileInfo(token: string, fileId: string) {
  await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .catch((e) => {
      throw e;
    });
}
```

### ファイルのダウンロード

ファイルのダウンロードには、`https://www.googleapis.com/drive/v3/files/${fileID}?alt=media`に`GET`します。

```ts
function getFileContent(token: string, fileId: string) {
  return fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  )
    .then((res) => res.text())
    .catch((e) => {
      throw e;
    });
}
```

### ファイル作成

ファイル作成には`https://www.googleapis.com/drive/v3/files`に`POST`すればいいです。そのため、以下のようになります。この例では空のファイルを作成します。

```ts
 async function createFile(token:string,fileInfo) {
   return fetch(
        "https://www.googleapis.com/drive/v3/files",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fileInfo),
        }
      ).then((res)=>res.json())
  }
```

最初に中身もアップロードする場合は`https://www.googleapis.com/upload/drive/v3/files`に`POST`します。このときはこの後のファイルのアップロードと同様にリクエスト本体(`body`)にファイルの中身を入れます。

### ファイルのアップロード

あまり大きくないファイルの場合は以下の方法でアップロードします。

```ts
export function uploadFile(
  token: string,
  fileId: string,
  fileContent: string
) {
  return fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: fileContent,
    }
  ).then((res) => res.json());
}
```

### ファイル情報の更新

これはファイル名や拡張子などを変更する方法です。この場合は、ファイル作成時と同様に`https://www.googleapis.com/drive/v3/files/${fileId}`にリクエストを飛ばしますが、`POST`ではなく`PATCH`となります。

```ts
export function updateFileInfo(
  token: string,
  fileId: string,
  newFileInfo: object
) {
  return fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newFileInfo),
  }).then((res) => res.json());
}
```

### 注意点

jsのfetchはリクエスト順に終了する保証はないので連続して変更を叩く場合は前のやつをキャンセルするなどする必要があります。

## 最後に

このようにすることで一通りGoogleDriveと連携できます。

## 宣伝

この方法でGoogleDriveと接続した英文、英単語専用の単語帳「[VocabPhrase](https://vocab-phrase.vercel.app/)」を公開しました。よろしければご利用ください。
