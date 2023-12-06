import Box from '@/components/shared/Box';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { CalendarDays, Plus } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import ActivityCard from '@/components/shared/ActivityCard';
import FilterMenu from '@/components/admin-activities/FilterMenu';

export default async function AdminActivities({ searchParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let filter = searchParams.filter;
  let showPast = searchParams.past;
  let search = searchParams.search;
  
  function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so add 1 and format as 2 digits
    const day = ('0' + date.getDate()).slice(-2); // Format as 2 digits
    return `${year}-${month}-${day}`;
  }

  const today = getToday();

  let query = supabase.from('activities').select();

  if (filter) {
    query = query.eq('category', filter);
  }
  if (showPast !== 'true') {
    query = query.gte('date', today);
  }
  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  const { data, error } = await query.order('date', { ascending: true });

  return (
    <div>
      <Box>
        <div className="flex justify-between gap-2 flex-wrap">
          <Heading icon={<CalendarDays />} title={'aktiviteter'} />
          <Link href={'/admin/aktiviteter/opret-aktivitet'}>
            <Button>
              <Plus className="mr-2 w-4 h-4" />
              Opret Aktivitet
            </Button>
          </Link>
        </div>
        <FilterMenu searchParams={searchParams} />
        <div className="grid grid-cols-fluid gap-5">
          {data.map((activity) => (
            <ActivityCard
              isOnAdminPage={true}
              key={activity.id}
              activity={activity}
            />
          ))}
        </div>
      </Box>
    </div>
  );
}
