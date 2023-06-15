"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { getStripe } from "@/lib/stripeClient";
import { Card } from "@/db/schema";
import { Icons } from "../ui/icons";
import { BsStripe } from "react-icons/bs";

interface Props {
  card: Card;
}

const BuyCardButton = ({ card }: Props) => {
  const [loading, setIsLoading] = useState<boolean>(false);

  return (
    <Button
      disabled={loading}
      onClick={async () => {
        setIsLoading(true);

        const stripePromise = await getStripe();
        const lineItems = {
          price: card.price,
          name: card.name,
          description: card.description,
          quantity: 1,
        };

        const res = await fetch("/api/stripe/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lineItems),
        });

        const { sessionId } = await res.json();

        const stripe = await stripePromise;
        const data = await stripe?.redirectToCheckout({
          sessionId: sessionId,
        });

        if (data?.error) {
          throw new Error(data.error.message);
        } else {
          throw data?.error;
        }
      }}
    >
      {loading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <BsStripe className="mr-2 w-5 h-5" />
      )}{" "}
      Buy for Rs.{card.price}
    </Button>
  );
};

export default BuyCardButton;
