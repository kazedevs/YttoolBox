import { json } from "@sveltejs/kit";

const pages = ["", "tools", "blog", "about", "contact", "privacy"];

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ url }) {
  const baseUrl = url.origin;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
    <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page === "" ? "daily" : "weekly"}</changefreq>
        <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>`
      )
      .join("")}
</urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
}
