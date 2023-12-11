// SHARED component imports
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import UserCard from "@/components/shared/UserCard";
import Link from "next/link";

// UI component imports
import { Button } from "@/components/ui/button";

// ICON imports
import { UserCheck } from "lucide-react";

export default function NewestMembers({ newestMembers }) {
  let newMembers = newestMembers.map((member) => {
    return (
      <UserCard
        key={member.id}
        user_id={member.id}
        avatar={member.avatar_url}
        firstName={member.first_name}
        lastName={member.last_name}
        email={member.email}
        phone={member.phone_number}
        isOnOverview={true}
      />
    );
  });

  // console.log(newestMembers[0].last_name)

  return (
    <Box className="flex flex-col gap-5 w-full lg:max-w-[890px]">
      <div className="flex justify-between items-center">
        <Heading
          title={"Nyeste medlemmer"}
          icon={<UserCheck />}
        />
        <Link href={"/admin/medlemmer"}>
          <Button variant={"outline"}>Gå til medlemmer</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">{newMembers}</div>
    </Box>
  );
}
