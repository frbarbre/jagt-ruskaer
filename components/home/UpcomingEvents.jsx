// Upcoming events on the home page

// SHARED component imports
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import ActivityCard from "@/components/shared/ActivityCard";
import Link from "next/link";

// UI component imports
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// icon import
import { CalendarDays } from "lucide-react";

export default function UpcomingEvents({ comingEvents }) {
  let activities = comingEvents.map((activity) => {
    return (
      <ActivityCard
        isOnAdminPage={true}
        isOnFrontPage={true}
        key={activity.id}
        activity={activity}
      />
    );
  });

  return (
    <Box
      className="w-full flex flex-col gap-3 overflow-auto sm:px-0 sm:pb-1 lg:max-w-[890px]"
      isOuterBox={true}
    >
      <div className="flex justify-between sm:px-5 flex-wrap gap-3 mt-6 sm:mt-0">
        <Heading title={"Kommende begivenheder"} icon={<CalendarDays />} />
        <Link href={"/kalender"}>
          <Button variant={"outline"}>Se alle</Button>
        </Link>
      </div>
      <ScrollArea>
        <div className="flex gap-5 sm:px-5 pb-4">
          {activities}
        </div>
        <ScrollBar orientation="horizontal" className="sm:px-5" />
      </ScrollArea>
    </Box>
  );
}
