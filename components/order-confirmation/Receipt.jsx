"use client";

import CartOverview from "@/components/shared/CartOverview";
import { useEffect } from "react";
import { sendOrderConfirmation } from "@/actions/email.actions";

export default function Receipt({ activity, email, name }) {
  let clients = [];
  let price = 0;

  if (typeof window !== "undefined") {
    clients = JSON.parse(localStorage.getItem("currentClients"));
    price = JSON.parse(localStorage.getItem("currentPrice"));
  }

  useEffect(() => {
    async function sendEmail() {
      await sendOrderConfirmation({
        email: email,
        name: name,
        activity: activity,
        clients: clients,
        price: price,
      });
    }
    sendEmail();
  }, []);

  return <CartOverview activity={activity} clients={clients} price={price} />;
}
