import React, { ReactNode } from "react";

export function BlogLayout({ children }: { children: React.ReactNode }) {
  // childrenの中身(ReactNode)をバラす
  // <><>{data}</><>{content}</></> を <>{data}</> <>{content}</> にする
  const [data, content,articleFooter]: ReactNode[] = React.Children.toArray(children);
  return (
    <>
      <div>{data}</div>
      <article className="p-2">{content}</article>
      <div className="p-2">{articleFooter}</div>
    </>
  );
}
