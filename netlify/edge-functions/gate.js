async function makeToken(secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode("vana-recipes-access"));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const ALLOW_PREFIXES = ["/login.html", "/css/", "/js/", "/assets/", "/admin", "/.netlify/"];

export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/favicon.ico" || ALLOW_PREFIXES.some((p) => path === p || path.startsWith(p))) {
    return context.next();
  }

  const secret = Deno.env.get("COOKIE_SECRET") || Deno.env.get("SITE_PASSWORD");
  if (!secret) {
    // Not configured yet — send to login rather than exposing content.
    return Response.redirect(new URL("/login.html", url), 302);
  }

  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/vana_access=([a-f0-9]+)/);
  const token = match ? match[1] : null;
  const expected = await makeToken(secret);

  if (token === expected) {
    return context.next();
  }

  const redirectUrl = new URL("/login.html", url);
  redirectUrl.searchParams.set("next", path);
  return Response.redirect(redirectUrl, 302);
};

export const config = { path: "/*" };
