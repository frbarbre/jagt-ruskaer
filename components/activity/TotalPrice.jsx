import { CreditCard } from 'lucide-react';
import { Button } from '../ui/button';

export default function TotalPrice({
  pricePerPerson,
  hasDiscount,
  participants,
  clients,
  activityId,
}) {
  let totalPrice = pricePerPerson * participants;

  if (hasDiscount) {
    totalPrice = totalPrice * 0.75;
  }

  return (
    <div>
      <p className="text-[14px] font-semibold opacity-70 mb-1">Total</p>
      <h2 className="font-semibold text-[20px] mb-4">{totalPrice},00 dkk</h2>
      <Button className="w-full">
        <CreditCard className="w-4 h-4 mr-2" />
        Til betaling
      </Button>
    </div>
  );
}
