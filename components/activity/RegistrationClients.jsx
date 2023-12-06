'use client';

import { useState } from 'react';
import UserCard from '../shared/UserCard';
import { Button } from '../ui/button';
import DogForm from './DogForm';
import GuestForm from './GuestForm';
import TotalPrice from './TotalPrice';

export default function RegistrationClients({
  currentUser,
  pricePerPerson,
  maxDogs,
  maxParticipants,
  currentDogs,
  currentParticipants,
  activityId,
}) {
  const [clients, setClients] = useState([
    {
      avatar: currentUser.avatar_url,
      firstName: currentUser.first_name,
      lastName: currentUser.last_name,
      email: currentUser.email,
      phone: currentUser.phone_number,
      dogs: 0,
      discount: false,
      isGuest: false,
    },
  ]);
  const [isDogsOpen, setIsDogsOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  function openDogs() {
    setIsDogsOpen(true);
    setIsGuestsOpen(false);
  }

  function openGuests() {
    setIsGuestsOpen(true);
    setIsDogsOpen(false);
  }

  return (
    <div className="mt-5 flex flex-col justify-between h-pay gap-6">
      <div>
        <p className="text-[12px] font-semibold pb-2">
          Mine tilmeldte deltagere
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
              clients={clients}
              setClients={setClients}
              setIsGuestsOpen={setIsGuestsOpen}
            />
          )}
          {!isGuestsOpen && clients.length < 2 && (
            <Button variant="outline" className="w-full" onClick={openGuests}>
              Tilføj gæst
            </Button>
          )}
          {isDogsOpen && (
            <DogForm
              clients={clients}
              setClients={setClients}
              setIsDogsOpen={setIsDogsOpen}
            />
          )}
          {!isDogsOpen && maxDogs && (
            <Button
              variant="outline"
              className="w-full"
              onClick={openDogs}
              disabled={maxDogs === currentDogs}
            >
              Tilføj hund(e)
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
      />
    </div>
  );
}
