// Upcoming events on the home page

// SHARED component imports
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import ActivityCard from "@/components/shared/ActivityCard";

// UI component imports
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

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
    <Box className="w-full flex flex-col gap-3 overflow-auto lg:max-w-[890px] pr-0">
      <div className="flex justify-between pr-5">
        <Heading title={"Kommende begivenheder"} icon={<CalendarDays />} />
        <Button variant={"outline"}>Se alle</Button>
      </div>
      <ScrollArea>
				<div className="flex gap-5 py-4 pr-5">
					{activities}
				</div>
				<ScrollBar orientation='horizontal' className='pr-5' />
      </ScrollArea>
    </Box>
  );
}
