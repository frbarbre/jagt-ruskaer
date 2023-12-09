import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// SHARED component imports
import Heading from '@/components/shared/Heading';
import Box from '@/components/shared/Box';

// ADMIN component imports
import ComingActivities from '@/components/admin-overview/ComingActivities';
import LatestRegistrations from '@/components/admin-overview/LatestRegistrations';
import NewestMembers from '@/components/admin-overview/NewestMembers';

// ICON import

export default async function AdminPage() {
  // Initializing SupaBase with cookies to authorize the user from the server
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //------------- DATA FOR 'KOMMENDE BEGIVENHEDER' -------------

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
    .select('*, registrations(*)')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(5);

  // data of the 5 closest, future events following 'currentEvent'
  let comingEvents = query?.data;

  //--------------------------------------------------------------

  //--------------- DATA FOR 'NYESTE MEDLEMMER' ------------------

  let { data } = await supabase
    .from('profiles')
    .select()
    .eq('onboarded', true)
    .order('created_at', { ascending: false })
    .limit(3);

  let newestMembers = data;

  //--------------------------------------------------------------

  //--------------- DATA FOR 'SENESTE TILMELDINGER' ------------------

  // let regs = await supabase
  //   .from('registrations')
  //   .select()
  //   .order('created_at', { ascending: false })
  //   .limit(3);

  // let latestRegistrations = regs.data;

  //--------------------------------------------------------------

  return (
    <div>
      <div className="flex gap-6 flex-col lg:flex-row max-w-screen">
        <div className="flex-1 w-full flex flex-col gap-6 items-center">
          <NewestMembers newestMembers={newestMembers} />
          {/* <LatestRegistrations latestRegistrations={latestRegistrations} /> */}
        </div>
        <ComingActivities comingEvents={comingEvents} />
      </div>
    </div>
  );
}

// <div className="flex justify-between items-center w-full pr-4">
//  <Heading title={"Sidste nyt fra DJ"} icon={<Newspaper />} />
//  <Button variant={"outline"}>Se alle</Button>
// </div>
