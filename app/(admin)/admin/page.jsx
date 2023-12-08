import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// SHARED component imports
import Heading from '@/components/shared/Heading';
import Box from '@/components/shared/Box';

// ADMIN component imports
import ComingActivities from '@/components/admin-overview/ComingActivities'
import LatestRegistrations from '@/components/admin-overview/LatestRegistrations'
import NewestMembers from '@/components/admin-overview/NewestMembers'

// ICON import


export default async function AdminPage() {


  return (
    <div>
      AdminPage
      <div className="flex gap-6 flex-col lg:flex-row max-w-screen">
        <div className="flex-1 w-full flex flex-col gap-6 items-center">
          <NewestMembers />
          <LatestRegistrations />
        </div>

        <Box className="flex w-full lg:max-w-[526px] min-h-screen flex-col items-center gap-3 pr-1 pb-0">
          <ComingActivities />
        </Box>
      </div>
    </div>
  );
}


// <div className="flex justify-between items-center w-full pr-4">
//  <Heading title={"Sidste nyt fra DJ"} icon={<Newspaper />} />
//  <Button variant={"outline"}>Se alle</Button>
// </div>