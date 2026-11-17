export async function onRequestPost() {
  // Checkout is deliberately gated until Paystack approves international
  // payments and Vegora has a server-side, verified quote/order store.
  // Never accept a customer-supplied amount as the source of truth.
  return new Response(JSON.stringify({
    error: "Online checkout is not active yet.",
    message: "Please request a confirmed quotation from Vegora. Card checkout will be enabled after payment approval and secure order pricing are configured."
  }), {
    status: 409,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
  });
}
