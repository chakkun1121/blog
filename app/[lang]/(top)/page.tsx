import topPage from "./page/top";

export default async function Page({ params: { lang } }) {
  return topPage(lang);
}
export function generateStaticParams(): { lang: string }[] {
  return [{ lang: "ja" }, { lang: "en" }];
}
