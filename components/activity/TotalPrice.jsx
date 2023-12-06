import { CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";

export default function TotalPrice({
  pricePerPerson,
  hasDiscount,
  participants,
  clients,
  activityId,
}) {
  const router = useRouter();

  let totalPrice = pricePerPerson * participants;

  if (hasDiscount) {
    totalPrice = totalPrice * 0.75;
  }

  function onGoToPayment() {
    localStorage.setItem("currentActivityId", activityId);
    localStorage.setItem("currentClients", JSON.stringify(clients));
    localStorage.setItem("currentPrice", totalPrice);
    router.push("/betaling");
  }

  return (
    <div>
      <p className="text-[14px] font-semibold opacity-70 mb-1">Total</p>
      <h2 className="font-semibold text-[20px] mb-4">{totalPrice},00 dkk</h2>
      <Button className="w-full" onClick={onGoToPayment}>
        <CreditCard className="w-4 h-4 mr-2" />
        Til betaling
      </Button>
    </div>
  );
}
