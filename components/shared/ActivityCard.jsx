import Box from '@/components/shared/Box';
import Heading from './Heading';
import {
  Dog,
  Target,
  Rabbit,
  Crosshair,
  CalendarDays,
  Clock,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ActivityCard({ activity }) {
  const icon =
    activity.category === 'jagt' ? (
      <Rabbit />
    ) : activity.category === 'flugtskydning' ? (
      <Target />
    ) : activity.category === 'hundetræning' ? (
      <Dog />
    ) : activity.category === 'riffelskydning' ? (
      <Crosshair />
    ) : (
      <Rabbit />
    );

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('da-DK', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  const timeFromSplit = activity.timeFrom.split(':');
  const timeFrom = timeFromSplit[0] + ':' + timeFromSplit[1];

  let timeTo = null;

  if (activity.timeTo) {
    const timeToSplit = activity.timeTo.split(':');
    timeTo = timeToSplit[0] + ':' + timeToSplit[1];
  }

  return (
    <Box maxWidth={''}>
      <Heading isTiny={true} title={activity.category} icon={icon} />
      <Separator className="my-3" />
      <h2 className="font-semibold text-[14px]">{activity.title}</h2>
      <p className="text-[14px] h-[40px] overflow-hidden mt-2 mb-3">
        {activity.description}
      </p>
      <div className="flex gap-1 items-center opacity-70 mb-2">
        <CalendarDays className="w-4 h-4" />
        <p className="capitalize text-[12px]">{formatDate(activity.date)}</p>
      </div>
      <div className="flex gap-1 items-center opacity-70">
        <Clock className="w-4 h-4" />
        <p className="capitalize text-[12px]">
          {timeFrom}
          {timeTo && ` - ${timeTo}`}
        </p>
      </div>
    </Box>
  );
}
