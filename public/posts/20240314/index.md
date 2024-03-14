---
title: OTIOに付いて
description: OTIO(OpenTimelineIO)について調べたことをまとめます。
date: 2024-03-14
tags:
  - OTIO
  - OpenTimelineIO
---

## はじめに

個人で動画編集アプリを作っているときにOTIOというものを知ったのでまとめてみます。

## OTIOとは

[OTIO(OpenTimelineIO)](https://github.com/AcademySoftwareFoundation/OpenTimelineIO)とは、異なる動画編集アプリ内のタイムラインを共有するためのファイル形式です。拡張子は`.otio`です。[DaVinci Resolve](https://www.blackmagicdesign.com/jp/products/davinciresolve)などに採用されています。

## OTIOのファイル形式

OpenTimelineIOのファイル(`.otio`)の中はJSONとなっています。詳しくは[公式ドキュメント](https://opentimelineio.readthedocs.io/en/stable/tutorials/otio-file-format-specification.html)を確認してください。

## OTIOのtypes

OTIOにはなぜかC++とPythonのライブラリしかなく、typescriptの型定義がありませんでした。そのため非公式で作成しました。

注意事項:このファイルは自由に使ってもらって構いませんが、作成者はこのファイルを使用して発生したことについては一切責任を負いません。

```ts
export type OpenTimelineIO =
  | OTIO.Timeline
  | OTIO.Clip
  | OTIO.Stack
  | OTIO.Track; //default is Timeline
export namespace OTIO {
  export type Timeline = {
    OTIO_SCHEMA: "Timeline.1";
    metadata: Metadata;
    name: string;
    tracks?: Stack;
  };
  export type Clip = {
    OTIO_SCHEMA: "Clip.1";
    effects: [];
    markers: [];
    metadata: Metadata;
    name: string;
    source_range: Object;
    media_reference: null;
  };
  export type Stack = {
    OTIO_SCHEMA: "Stack.1";
    children: Track[];
    effects: [];
    markers: [];
    metadata: Metadata;
    name: string;
    source_range: null;
  };
  export type Track = {
    OTIO_SCHEMA: "Track.1";
    children: (Clip | Transition)[];
    effects: [];
    kind: string;
    markers: [];
    metadata: Metadata;
    name: string;
    source_range: null;
  };
  export type Transition = {
    OTIO_SCHEMA: "Transition.1";
    metadata: Metadata;
    name: string;
    transition_type: string;
    parameters: Object;
    in_offset: RationalTime;
    out_offset: RationalTime;
  };
  export type RationalTime = {
    OTIO_SCHEMA: "RationalTime.1";
    rate: number;
    value: number;
  };
  export type Metadata = {
    [key: string]: Object;
  };
}
```

## 最後に

今回はOTIOについて解説しました。個人で動画編集アプリを作っていてそれで使おうとして型定義まで作ったのですが、結局採用しなかったので供養もありこの記事を書きました。
