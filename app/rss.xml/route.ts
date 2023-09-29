import RSS from "rss";
import { getRecentArticles } from "../lib/getRecentArticles";
import { siteDescription, siteTitle, siteUrl } from "../layout";

export async function GET() {
  const articles = await getRecentArticles();
  const feed = new RSS({
    title: siteTitle,
    description: siteDescription,
    site_url: siteUrl,
    feed_url: siteUrl + "/rss.xml",
  });
  articles.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: siteUrl + article.link,
      date: article.date,
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
