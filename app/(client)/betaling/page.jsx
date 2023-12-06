"use client";

export default function Payment() {
  let clients = [];
  let price = 0;
  let activityId = "";
  if (typeof window !== "undefined") {
    clients = JSON.parse(localStorage.getItem("currentClients"));
    price = localStorage.getItem("currentPrice");
    activityId = localStorage.getItem("currentActivityId");
  }

  console.log(clients);
  console.log(price);
  console.log(activityId);

  return (
    <div>
      <h1>Payment</h1>
    </div>
  );
}
