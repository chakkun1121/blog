import React from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // childrenの中身(ReactNode)をバラす
  // <><>{data}</><>{content}</></> を <>{data}</> <>{content}</> にする
  const [data, content] = React.Children.toArray(children);
  return (
    <>
      <div>{data}</div>
      <article className="">{content}</article>
    </>
  );
}
