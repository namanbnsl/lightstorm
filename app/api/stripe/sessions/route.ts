import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { price, name, description } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      mode: "payment",
      line_items: [
        {
          price_data: {
            unit_amount: price * 100,
            currency: "inr",
            product_data: {
              name: name,
              description: description,
            },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `http://localhost:3000/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cards`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
