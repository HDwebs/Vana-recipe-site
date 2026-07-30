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

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let password;
  try {
    const body = JSON.parse(event.body || "{}");
    password = body.password;
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Bad request" }) };
  }

  const SITE_PASSWORD = process.env.SITE_PASSWORD;
  if (!SITE_PASSWORD) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: "Site password is not configured yet." }),
    };
  }

  if (!password || password !== SITE_PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ ok: false, error: "Incorrect password." }) };
  }

  const secret = process.env.COOKIE_SECRET || SITE_PASSWORD;
  const token = await makeToken(secret);
  const cookie = `vana_access=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`;

  return {
    statusCode: 200,
    headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
