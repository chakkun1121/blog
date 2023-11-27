import RSS from "rss";
import { getAllArticleData } from "../lib/getAllArticleData";
import { siteDescription, siteTitle, siteUrl } from "../meta";

export async function GET() {
  const articles = await getAllArticleData();
  const feed = new RSS({
    title: siteTitle,
    description: siteDescription,
    site_url: siteUrl + "/",
    feed_url: siteUrl + "/rss.xml",
  });
  articles.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: siteUrl + article.link,
      date: article.date,
      custom_elements: [
        {
          tags: article.tags.map((tag) => ({
            tag: [{ _attr: { name: tag } }],
          })),
        },
      ],
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
