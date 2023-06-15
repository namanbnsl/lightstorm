import BuyCardButton from "@/components/cards/BuyCardButton";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Card as CardType } from "@/db/schema";
import { checkEnvironment } from "@/lib/checkEnv";
import { getStripe } from "@/lib/stripeClient";

async function getData() {
  const res = await fetch(
    `${checkEnvironment()}/api/cards/getAllCardsForDisplay`,
    { next: { revalidate: 0 } }
  );

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-y-4 my-8 mx-8">
        {data.cards.map((card: CardType) => (
          <Card key={card.name} className="md:w-[420px] w-[350px]">
            <CardHeader>
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <BuyCardButton card={card} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
