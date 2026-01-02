import type { APIRoute } from "astro";

// Zoho US region issuer (adjust only if your Zoho login uses a different region domain)
const ISSUER = "https://accounts.zoho.com";

// Ensure this outputs a static file in static builds
export const prerender = true;

export const GET: APIRoute = async () => {
  // Tailscale only cares that the response includes the issuer link.
  // A static response is fine even if Tailscale adds ?resource=acct:... to the URL.
  const jrd = {
    subject: "acct:admin@sommerlawn.com",
    links: [
      {
        rel: "http://openid.net/specs/connect/1.0/issuer",
        href: ISSUER,
      },
    ],
  };

  return new Response(JSON.stringify(jrd), {
    status: 200,
    headers: {
      // WebFinger’s “proper” content type is application/jrd+json, and Tailscale is fine as long as it’s valid JSON.
      "content-type": "application/jrd+json; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
};