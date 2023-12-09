// Upcoming events on the home page

// SHARED component imports
import Box from '@/components/shared/Box';
import Heading from '@/components/shared/Heading';
import ActivityCard from '@/components/shared/ActivityCard';

// UI component imports
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// icon import
import { CalendarDays } from 'lucide-react';

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
      />
    );
  });

  return (
    <Box className="w-full flex flex-col gap-3 overflow-auto px-0 pb-1 lg:max-w-[526px]">
      <div className="flex justify-between px-5">
        <Heading title={'Kommende begivenheder'} icon={<CalendarDays />} />
        <Button variant={'outline'}>Gå til aktiviteter</Button>
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-5 pb-4 px-5">{activities}</div>
        <ScrollBar orientation="horizontal" className="px-5" />
      </ScrollArea>
    </Box>
  );
}
