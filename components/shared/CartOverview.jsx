"use client";

import EventCard from "@/components/shared/EventCard";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function CartOverview({ clients, price, activity }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full">
      {isClient ? (
        <EventCard activity={activity} />
      ) : (
        <Skeleton className={"h-[122px] w-full"} />
      )}
      <p className="text-[12px] font-semibold pb-2 mt-5">
        Mine tilmeldte deltagere
      </p>
      {isClient ? (
        <div className="flex flex-col gap-3">
          {clients.map((client, index) => (
            <UserCard
              avatar={client.avatar}
              firstName={client.firstName}
              lastName={client.lastName}
              email={client.email}
              phone={client.phone}
              dogs={client.dogs}
              key={index}
              clients={clients}
              isInCart={true}
              price={client.price ? client.price : 0}
            />
          ))}
        </div>
      ) : (
        <Skeleton className={"h-[110px] w-full"} />
      )}
      <p className="text-[14px] font-semibold opacity-70 mb-1 mt-5">Total</p>
      {isClient ? (
        <h2 className="font-semibold text-[20px]">{price},00 dkk</h2>
      ) : (
        <Skeleton className={"h-[30px] w-[110px]"} />
      )}
    </div>
  );
}
