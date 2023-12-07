import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import User from '@/components/User';
import { redirect } from 'next/navigation';
import Rss from '@/components/home/Rss';
import Box from '@/components/shared/Box';
import Current from '@/components/home/Current';

export default async function Home({ searchParams }) {
  // Initializing SupaBase with cookies to authorize the user from the server
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetching data from SupaBase
  const { data } = await supabase.from('profiles').select();

  // Fetching the current users data, with the getSession method from Supabase
  const {
    data: { session },
    // getSession() returns the currently logged in user object(s)
  } = await supabase.auth.getSession();

  //------------- DATA FOR 'AKTUELT' -------------

  // attempting to get activity from supabase

  function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so add 1 and format as 2 digits
    const day = ('0' + date.getDate()).slice(-2); // Format as 2 digits
    return `${year}-${month}-${day}`;
  }

  const today = getToday();

  let query = await supabase
    .from('activities')
    .select()
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(1)
    .single();

  // console.log(query)

  //----------------------------------------------

  // -------------- RSS FEED FROM DJ ----------------

  // fetching the rss feed - using rssData and not data as in example
  const rssData = await fetch('https://jaegerforbundet.dk/rss/', {
    cache: 'no-store',
  });

  const xml = await rssData.text();

  // ------------------ RSS END ------------------

  let isSuperAdmin = null;

  // Checking if the user is logged in
  if (session) {
    // Checking if the user is a Super Admin
    const { data } = await supabase
      .from('profiles')
      .select('isSuperAdmin, onboarded')
      .eq('id', session.user.id);

    if (!data[0].onboarded) {
      redirect('/onboarding');
    }
    // Setting the isSuperAdmin variable to true or false
    isSuperAdmin = data[0].isSuperAdmin;
  }

  return (
    <div className="flex gap-6 flex-col lg:flex-row">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Current query={query} />
      </div>
      <Box className="flex w-full lg:max-w-[526px] min-h-screen flex-col items-center justify-between p-5">
        <Rss xml={xml} />
      </Box>
    </div>
  );
}
