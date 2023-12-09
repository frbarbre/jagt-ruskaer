import Box from '@/components/shared/Box';
import Heading from './Heading';
import {
  Dog,
  Target,
  Rabbit,
  Crosshair,
  CalendarDays,
  Clock,
  Coins,
  User,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import ActivityDropdown from '@/components/shared/ActivityDropdown';

export default function ActivityCard({
  activity,
  isOnAdminPage,
  isOnFrontPage,
  isRegistration,
  registration,
  currentParticipants,
  showParticipants,
  showDelete,
}) {
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
  }
  const timeFromSplit = activity.timeFrom.split(':');
  const timeFrom = timeFromSplit[0] + ':' + timeFromSplit[1];

  let timeTo = null;

  if (activity.timeTo) {
    const timeToSplit = activity.timeTo.split(':');
    timeTo = timeToSplit[0] + ':' + timeToSplit[1];
  }

  function formatDateToArray(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = date.getMonth();
    const monthNames = [
      'jan',
      'feb',
      'mar',
      'apr',
      'maj',
      'jun',
      'jul',
      'aug',
      'sep',
      'okt',
      'nov',
      'dec',
    ];
    const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    return [year, day, monthNames[month]];
  }

  async function deleteRegistration(FormData) {
    'use server';
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const activityId = FormData.get('activityId');

    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('activity_id', activityId);

    if (error) {
      console.log(error);
    }
  }

  let isExpired = false;

  if (activity.date < new Date().toISOString()) {
    isExpired = true;
  }

  const date = formatDateToArray(activity.date);

  return (
    <Box
      maxWidth={`${
        isOnFrontPage ? 'min-w-[335px]' : ''
      } flex items-center gap-5`}
    >
      {!isOnAdminPage && (
        <article className="text-center font-bold w-[45px]">
          <h3 className="text-[12px] translate-y-1">{date[0]}</h3>
          <h3 className="text-[30px]">{date[1]}</h3>
          <h3 className="uppercase text-[14px] -translate-y-1">{date[2]}</h3>
        </article>
      )}
      <section className="w-full">
        <div className="flex justify-between items-center">
          <Heading isTiny={true} title={activity.category} icon={icon} />
          <div className='flex items-center gap-4'>
            {showParticipants && activity.participants && !isExpired && (
              <div className="flex gap-1 items-center">
                <User />
                <p className="text-[10px] font-semibold">
                  {currentParticipants}/{activity.participants}
                </p>
              </div>
            )}
            {showDelete && <ActivityDropdown activityId={activity.id} />}
          </div>
          {isRegistration && (
            <article className="flex items-center gap-3">
              <InfoIcon
                value={`${registration.total_price},00 dkk`}
                icon={<Coins className="w-4 h-4 opacity-70" />}
              />
              {registration.dogs !== 0 && registration.dogs && (
                <InfoIcon
                  value={registration.dogs}
                  icon={<Dog className="w-4 h-4 opacity-70" />}
                />
              )}
              <InfoIcon
                value={registration.participants}
                icon={<User className="w-4 h-4 opacity-70" />}
              />
            </article>
          )}
        </div>
        <Separator className="my-3" />
        {isOnAdminPage && (
          <h2 className="font-semibold text-[14px]">{activity.title}</h2>
        )}
        {isOnAdminPage && (
          <p className="text-[14px] h-[40px] overflow-hidden mt-2 mb-3">
            {activity.description}
          </p>
        )}
        <div className="flex justify-between items-end flex-wrap gap-3">
          <div>
            {!isOnAdminPage && (
              <h2 className="font-semibold text-[14px] mb-1">
                {activity.title}
              </h2>
            )}
            {isOnAdminPage && (
              <div className="flex gap-1 items-center opacity-70 mb-2">
                <CalendarDays className="w-4 h-4" />
                <p className="text-[12px]">{formatDate(activity.date)}</p>
              </div>
            )}
            <div className="flex gap-1 items-center opacity-70">
              <Clock className="w-4 h-4" />
              <p className="capitalize text-[12px]">
                {timeFrom}
                {timeTo && ` - ${timeTo}`}
              </p>
            </div>
          </div>
          {isOnFrontPage ? (
            <Link href={`/aktiviteter/${activity.id}`}>
              <Button>Læs mere</Button>
            </Link>
          ) : isOnAdminPage ? (
            <Link href={`/admin/aktiviteter/rediger-aktivitet/${activity.id}`}>
              <Button>Se mere</Button>
            </Link>
          ) : isRegistration ? (
            <div>
              <Link className="mr-3" href={`/aktiviteter/${activity.id}`}>
                <Button>Læs mere</Button>
              </Link>
              <form action={deleteRegistration} className="inline">
                <input type="hidden" name="activityId" value={activity.id} />
                <Button type="submit" variant="destructive">
                  Meld afbud
                </Button>
              </form>
            </div>
          ) : (
            <Link href={`/aktiviteter/${activity.id}`}>
              <Button>Læs mere</Button>
            </Link>
          )}
        </div>
      </section>
    </Box>
  );
}

function InfoIcon({ icon, value }) {
  return (
    <div className="flex items-center gap-1">
      <p className="text-[10px] font-semibold">{value}</p>
      <div>{icon}</div>
    </div>
  );
}
