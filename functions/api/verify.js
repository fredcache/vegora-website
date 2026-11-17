export async function onRequestGet({ request, env }) {
  const secret = env.PAYSTACK_SECRET_KEY;
  if (!secret) return json({ error: "Payments are not configured yet." }, 503);
  const reference = new URL(request.url).searchParams.get("reference") || "";
  if (!/^[A-Za-z0-9._=-]{4,80}$/.test(reference)) return json({ error: "Invalid payment reference." }, 400);
  const response = await fetch("https://api.paystack.co/transaction/verify/" + encodeURIComponent(reference), {
    headers: { Authorization: `Bearer ${secret}` }
  });
  const result = await response.json();
  if (!response.ok || !result.status) return json({ error: "Unable to verify payment." }, 502);
  const d = result.data;
  return json({
    verified: d.status === "success" && d.currency === "USD",
    status: d.status,
    currency: d.currency,
    amount: d.amount,
    reference: d.reference,
    customer_email: d.customer?.email || null
  });
}
function json(data, status=200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
