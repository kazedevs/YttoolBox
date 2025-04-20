/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const baseUrl = url.origin;

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
}
