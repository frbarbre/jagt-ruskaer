'use client'

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Box from "./Box";
import { Dog, Edit, Trash, Trash2, User, X } from "lucide-react";
import RegistrationDropDown from "../admin-activities/RegistrationDropdown";
import { Button } from "../ui/button";
import { useStore } from "@/store";

export default function UserCard({
  avatar,
  firstName,
  lastName,
  email,
  phone,
  dogs,
  participants,
  isRegistration,
  registration_id,
  user_id,
  isGuest,
  clients,
  setClients,
  setIsGuestsOpen,
}) {
  const setCurrentGuest = useStore((state) => state.setCurrentGuest);
  const formattedPhone = phone.replace(
    /(\d{2})(\d{2})(\d{2})(\d{2})/,
    "$1 $2 $3 $4"
  );

  function removeGuest() {
    const newClients = clients.filter((client) => !client.isGuest);
    setClients([...newClients]);
    setCurrentGuest(null);
  }

  function editGuest() {
    const newClients = clients.filter((client) => !client.isGuest);
    setClients([...newClients]);
    setIsGuestsOpen(true);
  }

  return (
    <Box className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>
            {firstName[0]}
            {lastName[0]}
          </AvatarFallback>
        </Avatar>
        <article className="flex gap-1 flex-col">
          <h3 className="font-semibold text-[14px]">
            {firstName} {lastName}
          </h3>
          <h4 className="text-[14px]">+45 {formattedPhone}</h4>
          <p className="opacity-50 text-[12px]">{email}</p>
        </article>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          {dogs !== 0 && dogs && (
            <div className="flex gap-1 items-center">
              <p className="text-[14px] font-semibold">{dogs}</p>
              <Dog />
            </div>
          )}
          {isRegistration && (
            <div className="flex gap-1 items-center">
              <p className="text-[14px] font-semibold">{participants}</p>
              <User />
            </div>
          )}
        </div>
        {isRegistration && (
          <RegistrationDropDown
            user_id={user_id}
            registration_id={registration_id}
          />
        )}
        {isGuest && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={editGuest} className="px-2.5">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={removeGuest} className="px-2.5">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
}
