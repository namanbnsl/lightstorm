import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  const slug = params.sessionId;

  if (!slug.startsWith("cs_")) {
    return NextResponse.json({ message: "Invalid sessionId" });
  }

  const checkout_session = await stripe.checkout.sessions.retrieve(slug, {
    expand: ["payment_intent", "line_items.data.price.product"],
  });

  return NextResponse.json(checkout_session);
}
