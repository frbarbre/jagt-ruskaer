import { cookies } from 'next/headers';
import Heading from '../shared/Heading';
import { CalendarPlus } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function RegistrationForm() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: {
      session: { user },
    },
  } = await supabase.auth.getSession();

  console.log(user);

  return (
    <>
      <Heading title={'Tilmelding'} icon={<CalendarPlus />} />
    </>
  );
}
