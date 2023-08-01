import fsPromises from "fs/promises";

export async function getFile(title: string): Promise<string> {
  //  /posts/{title}.md を取得し、内容を返す
  try {
    return (await fsPromises.readFile(`./posts/${title}.md`)).toString("utf-8");
  } catch (e) {
    console.error(e);
    throw Error("ファイルがありません");
  }
}
