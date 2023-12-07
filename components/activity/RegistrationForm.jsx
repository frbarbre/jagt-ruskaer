import { cookies } from 'next/headers';
import Heading from '../shared/Heading';
import { CalendarPlus, LogIn, SmilePlus } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import RegistrationClients from './RegistrationClients';
import { Button } from '../ui/button';
import Link from 'next/link';

export default async function RegistrationForm({
  pricePerPerson,
  maxDogs,
  maxParticipants,
  activityId,
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('profiles')
    .select()
    .eq('id', session?.user?.id)
    .single();

  const registrations = await supabase
    .from('registrations')
    .select('dogs, participants, user_id')
    .eq('activity_id', activityId);

  const currentDogs = registrations.data.reduce((acc, curr) => {
    return acc + curr.dogs;
  }, 0);

  const currentParticipants = registrations.data.reduce((acc, curr) => {
    return acc + curr.participants;
  }, 0);

  const currentUsers = registrations.data.map(
    (registration) => registration.user_id
  );

  console.log(currentUsers);

  return (
    <>
      <Heading title={'Tilmelding'} icon={<CalendarPlus />} />
      {session ? (
        <>
          {!currentUsers.includes(session.user.id) ? (
            <>
              {currentParticipants < maxParticipants ? (
                <RegistrationClients
                  currentUser={data}
                  currentDogs={currentDogs}
                  currentParticipants={currentParticipants}
                  pricePerPerson={pricePerPerson}
                  maxDogs={maxDogs}
                  maxParticipants={maxParticipants}
                  activityId={activityId}
                />
              ) : (
                <div className="flex h-pay items-center justify-center">
                  <p className="text-s my-6">
                    Der er ikke flere ledige pladser 😥
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex h-pay items-center justify-center">
              <div className="flex flex-col items-center my-6 gap-5">
                <p className="text-s ">
                  Du er allerede tilmeldt denne aktivitet 😎
                </p>
                <Link href="/mine-aktiviteter">
                  <Button className="w-max">
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Vis tilmeldinger
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-pay items-center justify-center">
          <div className="flex flex-col items-center my-6 gap-5">
            <p className="text-s ">
              Du skal logge ind for at tilmelde dig en aktivitet 🫡
            </p>
            <div className='flex gap-3 flex-wrap justify-center'>
              <Link href="/login">
                <Button className="w-max">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" className="w-max">
                  <SmilePlus className="h-4 w-4 mr-2" />
                  Bliv medlem
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
