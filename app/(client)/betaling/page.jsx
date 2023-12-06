"use client";

export default function Payment() {
  let clients = [];
  let price = 0;
  let activityId = "";
  let user = null;

  if (typeof window !== "undefined") {
    clients = JSON.parse(localStorage.getItem("currentClients"));
    price = localStorage.getItem("currentPrice");
    activityId = localStorage.getItem("currentActivityId");
    user = localStorage.getItem("currentUser");
  }

  return (
    <div>
      <h1>Payment</h1>
    </div>
  );
}
