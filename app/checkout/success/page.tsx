"use client";

import Navbar from "@/components/navbar/Navbar";
import { Icons } from "@/components/ui/icons";
import useSWR from "swr";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function CheckoutSuccessPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const URL = searchParams?.sessionId
    ? `/api/stripe/sessions/${searchParams?.sessionId}`
    : null;
  const { data: checkoutSession, error } = useSWR(URL, fetcher);

  if (error) return <div>Error!</div>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-y-4 my-8 mx-8">
        <h1 className="font-bold text-xl flex flex-row items-center justify-center">
          Thanks for buying this card,{" "}
          {checkoutSession?.customer_details?.name ?? (
            <Icons.spinner className="ml-2 mr-2 h-4 w-4 animate-spin" />
          )}
          !
        </h1>
        <span>Details:</span>
        <span className="flex flex-row items-center justify-center">
          Name:{" "}
          <span className="font-bold ml-1">
            {checkoutSession?.line_items?.data[0]?.price?.product?.name ?? (
              <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
            )}
          </span>
        </span>
        <span className="flex flex-row items-center justify-center">
          Description:{" "}
          <span className="font-bold ml-1">
            {checkoutSession?.line_items?.data[0]?.price?.product
              ?.description ?? (
              <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
            )}
          </span>
        </span>
        <span className="flex flex-row items-center justify-center">
          Price:{" "}
          <span className="font-bold ml-1">
            {checkoutSession?.line_items?.data[0]?.price?.unit_amount ? (
              <span>
                Rs.{" "}
                {checkoutSession?.line_items?.data[0]?.price?.unit_amount / 100}
              </span>
            ) : (
              <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
            )}
          </span>
        </span>
      </div>
    </>
  );
}

export default CheckoutSuccessPage;
