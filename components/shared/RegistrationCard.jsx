// Card for the 'Seneste tilmeldinger' on the admin page - Overview

// SHARED component imports
import EventCard from "@/components/shared/EventCard";
import Box from "@/components/shared/Box";

// UI component imports
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// ADMIN-OVERVIEW component imports
import EventCardAdminOverview from "@/components/admin-overview/EventCardAdminOverview";

// NEXT component imports
import Link from "next/link";

export default function RegistrationCard({ reg }) {
  // console.log(reg.activity)

  // EventCard takes an 'activity' so EventCard gets an 'activity'
  let activity = reg.activity;

  return (
    <Box padding={"p-4"} className="flex flex-col gap-3">
      {/* Avatar and name */}
      <div className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={reg.author.avatar_url} />
          <AvatarFallback>
            {reg.author.first_name[0]}
            {reg.author.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-[14px]">
          {reg.author.first_name} tilmeldte sig:
        </h3>
      </div>
      {/* EventCard and button */}
      <div className="flex justify-between xs:items-end flex-col xs:flex-row gap-3">
        <EventCardAdminOverview activity={activity} />
        <Link href={`/admin/aktiviteter/rediger-aktivitet/${activity.id}`}>
          <Button>Se mere</Button>
        </Link>
      </div>
    </Box>
  );
}
