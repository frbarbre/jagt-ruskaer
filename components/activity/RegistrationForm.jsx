import { cookies } from 'next/headers';
import Heading from '../shared/Heading';
import { CalendarPlus } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import RegistrationClients from './RegistrationClients';

export default async function RegistrationForm({
  pricePerPerson,
  maxDogs,
  maxParticipants,
  activityId,
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: {
      session: { user },
    },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('profiles')
    .select()
    .eq('id', user.id)
    .single();

  const registrations = await supabase
    .from('registrations')
    .select('dogs, participants')
    .eq('activity_id', activityId);

  const currentDogs = registrations.data.reduce((acc, curr) => {
    return acc + curr.dogs;
  }, 0);

  const currentParticipants = registrations.data.reduce((acc, curr) => {
    return acc + curr.participants;
  }, 0);

  return (
    <>
      <Heading title={'Tilmelding'} icon={<CalendarPlus />} />
      <RegistrationClients
        currentUser={data}
        currentDogs={currentDogs}
        currentParticipants={currentParticipants}
        pricePerPerson={pricePerPerson}
        maxDogs={maxDogs}
        maxParticipants={maxParticipants}
        activityId={activityId}
      />
    </>
  );
}
