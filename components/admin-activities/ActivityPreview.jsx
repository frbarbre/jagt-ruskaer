import Box from '../shared/Box';
import Heading from '../shared/Heading';
import { ScanEye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Rabbit,
  Target,
  Dog,
  Crosshair,
  CalendarDays,
  Clock,
} from 'lucide-react';

export default function ActivityPreview({ currentValues, image }) {
  const category =
    currentValues.category === 'jagt' ? (
      <Rabbit className="w-4 h-4" />
    ) : currentValues.category === 'flugtskydning' ? (
      <Target className="w-4 h-4" />
    ) : currentValues.category === 'hundetræning' ? (
      <Dog className="w-4 h-4" />
    ) : currentValues.category === 'riffelskydning' ? (
      <Crosshair className="w-4 h-4" />
    ) : null;

  function formatDate(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      let formattedDate = date.toLocaleString('da-DK', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      let words = formattedDate.split(' ');
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' d.';
      words[2] = words[2].charAt(0).toUpperCase() + words[2].slice(1);
      return words.join(' ');
    } else return null;
  }

  const date = formatDate(currentValues.date);

  console.log(currentValues);
  let timeFrom = null;

  if (currentValues.timeFrom) {
    const timeFromSplit = currentValues.timeFrom.split(':');
    timeFrom = timeFromSplit[0] + ':' + timeFromSplit[1];
  }

  let timeTo = null;

  if (currentValues.timeTo) {
    const timeToSplit = currentValues.timeTo.split(':');
    timeTo = timeToSplit[0] + ':' + timeToSplit[1];
  }

  return (
    <section className="flex gap-5 flex-col">
      <Heading
        icon={<ScanEye className="h-4 w-4 mr-2" />}
        title={'Forhåndsvisning'}
      />
      <Box className="flex gap-5 flex-col">
        {image ? (
          <img
            src={image}
            alt="image"
            className="w-full h-[258px] object-cover rounded-md"
          />
        ) : (
          <Skeleton className="w-full h-[258px] object-cover" />
        )}
        <section>
          <article className="flex flex-col gap-2">
            {category ? (
              <Heading
                icon={category}
                title={currentValues.category}
                isMedium={true}
              />
            ) : (
              <Skeleton className="h-[18px] w-[100px]" />
            )}
            {currentValues.title !== '' ? (
              <h1 className="text-[20px] font-semibold">
                {currentValues.title}
              </h1>
            ) : (
              <Skeleton className="h-[30px] w-[120px]" />
            )}
            {currentValues.description !== '' ? (
              <p className="text-[12px] opacity/70 h-[40px] w-[150px] overflow-hidden break-before-right mb-1">
                {currentValues.description}
              </p>
            ) : (
              <Skeleton className="h-[40px] w-[150px] mb-1" />
            )}

            {date ? (
              <div className="flex gap-1 items-center opacity-70 mb-2">
                <CalendarDays className="w-4 h-4" />
                <p className="text-[12px]">{formatDate(currentValues.date)}</p>
              </div>
            ) : (
              <Skeleton className="h-[18px] w-[130px]" />
            )}
            {timeFrom ? (
              <div className="flex gap-1 items-center opacity-70">
                <Clock className="w-4 h-4" />
                <p className="capitalize text-[12px]">
                  {timeFrom}
                  {timeTo && ` - ${timeTo}`}
                </p>
              </div>
            ) : (
              <Skeleton className="h-[18px] w-[130px]" />
            )}
          </article>
          <article></article>
        </section>
      </Box>
    </section>
  );
}
