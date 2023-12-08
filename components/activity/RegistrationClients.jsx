"use client";

import { useEffect, useState } from "react";
import UserCard from "../shared/UserCard";
import { Button } from "../ui/button";
import DogForm from "./DogForm";
import GuestForm from "./GuestForm";
import TotalPrice from "./TotalPrice";
import { useStore } from "@/store";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function RegistrationClients({
  currentUser,
  pricePerPerson,
  maxDogs,
  maxParticipants,
  currentDogs,
  currentParticipants,
  activityId,
}) {
  let clientsStorage = null;
  let storageUser = null;
  let storageActivityId = null;

  if (typeof window !== "undefined") {
    clientsStorage = JSON.parse(localStorage.getItem("currentClients"));
    storageUser = localStorage.getItem("currentUser");
    storageActivityId = localStorage.getItem("currentActivityId");
  }

  const defaultClient = {
    avatar: currentUser.avatar_url,
    firstName: currentUser.first_name,
    lastName: currentUser.last_name,
    email: currentUser.email,
    phone: currentUser.phone_number,
    dogs: 0,
    discount: false,
    isGuest: false,
    price: pricePerPerson,
  };

  const [clients, setClients] = useState(clientsStorage || [defaultClient]);
  const [isDogsOpen, setIsDogsOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const setCurrentGuest = useStore((state) => state.setCurrentGuest);
  const supabase = createClient();

  useEffect(() => {
    if (storageUser !== currentUser.id || storageActivityId !== activityId) {
      localStorage.removeItem("currentClients");
      localStorage.removeItem("currentPrice");
      localStorage.removeItem("currentActivityId");
      localStorage.removeItem("currentUser");
      setClients([defaultClient]);
      setCurrentGuest(null);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function openDogs() {
    setIsDogsOpen(true);
    setIsGuestsOpen(false);
  }

  function openGuests() {
    setIsGuestsOpen(true);
    setIsDogsOpen(false);
  }

  return (
    <>
      {isClient ? (
        <div className="mt-5 flex flex-col justify-between h-pay gap-6">
          <div>
            <p className="text-[12px] font-semibold pb-2">
              Du er ved at tilmeldede følgende
            </p>
            <div className="flex flex-col gap-3">
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
                    isGuest={client.isGuest}
                    clients={clients}
                    setClients={setClients}
                    setIsGuestsOpen={setIsGuestsOpen}
                  />
                ))}
              </div>
              {isGuestsOpen && (
                <GuestForm
                  pricePerPerson={pricePerPerson}
                  clients={clients}
                  setClients={setClients}
                  setIsGuestsOpen={setIsGuestsOpen}
                />
              )}
              {!isGuestsOpen && clients.length < 2 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={openGuests}
                  disabled={maxParticipants - 1 === currentParticipants}
                >
                  Tilføj gæst
                </Button>
              )}
              {isDogsOpen && (
                <DogForm
                  clients={clients}
                  setClients={setClients}
                  setIsDogsOpen={setIsDogsOpen}
                  currentDogs={currentDogs}
                  maxDogs={maxDogs}
                />
              )}
              {!isDogsOpen && maxDogs && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={openDogs}
                  disabled={maxDogs === currentDogs}
                >
                  {clients[0].dogs === 0 ? "Tilføj" : "Rediger antal"} hund(e)
                </Button>
              )}
            </div>
          </div>

          <TotalPrice
            pricePerPerson={pricePerPerson}
            hasDiscount={clients?.[1]?.discount}
            participants={clients.length}
            clients={clients}
            activityId={activityId}
            currentUserId={currentUser.id}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col mt-5 h-pay">
          <Skeleton className="h-[18px] w-[150px] mb-2" />
          <div className="flex flex-col justify-between h-full gap-6">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-[110px] w-full " />
              <Skeleton className="h-[36px] w-full " />
              <Skeleton className="h-[36px] w-full " />
            </div>
            <div>
              <Skeleton className="h-[17px] w-[50px] mb-2" />
              <Skeleton className="h-[30px] w-[150px] mb-4" />
              <Skeleton className="h-[36px] w-full " />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
