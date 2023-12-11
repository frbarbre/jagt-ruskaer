// Upcoming events on the home page

// SHARED component imports
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import ActivityCard from "@/components/shared/ActivityCard";

// UI component imports
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// icon import
import { CalendarDays } from "lucide-react";

import Link from "next/link";

export default function ActivityCalender({ comingEvents, category }) {
  let activities = comingEvents.map((activity) => {
    return <ActivityCard key={activity.id} activity={activity} />;
  });

  return (
    <Box
      isOuterBox={true}
      className="w-full flex flex-col gap-3 overflow-auto px-0 pb-1 lg:max-w-[526px] lg:min-h-[836px] lg:h-calender"
    >
      <div className="flex justify-between flex-wrap gap-3">
        <Heading title={`${category}kalender`} icon={<CalendarDays />} />
        <Link href={"/kalender"}>
          <Button variant={"outline"}>Gå til kalender</Button>
        </Link>
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-5 sm:pb-4">{activities}</div>
        <ScrollBar orientation="horizontal" className="px-5" />
      </ScrollArea>
    </Box>
  );
}
