// Upcoming events on the ADMIN overview page

// SHARED component imports
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import ActivityCard from "@/components/shared/ActivityCard";

// UI component imports
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// ICON component imports
import { CalendarDays } from "lucide-react";

// NEXT component imports
import Link from "next/link";

export default function ComingActivities({ comingEvents }) {
  let activities = comingEvents.map((activity) => {
    let people = 0;

    for (let i = 0; i < activity.registrations.length; i++) {
      people += activity.registrations?.[i].participants;
    }
    return (
      <ActivityCard
        key={activity.id}
        activity={activity}
        currentParticipants={people}
        showParticipants={true}
        showDelete={true}
        isOnOverview={true}
      />
    );
  });

  return (
    <Box
      className="w-full flex flex-col gap-3 overflow-auto px-0 pb-1 lg:max-w-[526px] lg:min-h-[875px] lg:h-calender"
      isOuterBox={true}
    >
      <div className="flex justify-between flex-wrap gap-3">
        <Heading title={"Kommende begivenheder"} icon={<CalendarDays />} />
        <Link href={"/admin/aktiviteter"}>
          <Button variant={"outline"}>Gå til aktiviteter</Button>
        </Link>
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-5 sm:pb-4 ">{activities}</div>
        {/* TODO - tag stilling til om dette har en effekt eller om det bare er et lævn fra UpcomingEvents komponentet som bruges på forsiden */}
        {/* <ScrollBar orientation="horizontal" className="px-5" /> */}
      </ScrollArea>
    </Box>
  );
}
