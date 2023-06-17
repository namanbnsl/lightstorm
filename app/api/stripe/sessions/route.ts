import { users } from "@/db/schema";
import getSession from "@/lib/getSession";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { NextResponse } from "next/server";
import postgres from "postgres";

export async function POST(request: Request) {
  const { price, name, description } = await request.json();

  try {
    const connectionString = process.env.DATABASE_URL as string;
    const sql = postgres(connectionString, { max: 1 });
    const db = drizzle(sql);

    const user_session = await getSession();

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, user_session?.user?.email!));

    let customerId: string;

    if (user.customer_id) {
      customerId = user.customer_id;
    } else {
      const customer_data: {
        metadata: { email: string };
        email: string;
        name: string;
      } = {
        metadata: {
          email: user_session?.user?.email!,
        },
        name: user_session?.user?.name!,
        email: user_session?.user?.email!,
      };

      const customer = await stripe.customers.create(customer_data);

      await db
        .update(users)
        .set({ customer_id: customer.id })
        .where(eq(users.email, user_session?.user?.email as string));

      customerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      mode: "payment",
      customer: customerId,
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
