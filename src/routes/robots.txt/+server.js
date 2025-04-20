/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ url }) {
  const baseUrl = url.origin;

  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap_index.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
}
