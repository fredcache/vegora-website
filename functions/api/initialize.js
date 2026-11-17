export async function onRequestPost({ request, env }) {
  const secret = env.PAYSTACK_SECRET_KEY;
  if (!secret) return json({ error: "Payments are not configured yet." }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }
  const email = String(body.email || "").trim();
  const amount = Number(body.amount);
  const orderReference = String(body.orderReference || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Enter a valid email address." }, 400);
  if (!Number.isSafeInteger(amount) || amount < 100 || amount > 100000000) return json({ error: "Invalid amount. Send the confirmed USD amount in cents." }, 400);
  if (!/^[A-Za-z0-9._=-]{4,80}$/.test(orderReference)) return json({ error: "A valid confirmed order reference is required." }, 400);
  const origin = new URL(request.url).origin;
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email, amount: String(amount), currency: "USD", channels: ["card"],
      reference: orderReference,
      callback_url: origin + "/payment-success"
    })
  });
  const result = await response.json();
  if (!response.ok || !result.status) return json({ error: "Paystack could not initialize this payment." }, 502);
  return json({ authorization_url: result.data.authorization_url, reference: result.data.reference });
}
function json(data, status=200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
