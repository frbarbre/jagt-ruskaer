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

  let query = supabase.from('activities').select();

  if (filter) {
    query = query.eq('category', filter);
  }

  const { data, error } = await query;

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
        <FilterMenu />
        <div className="grid grid-cols-fluid gap-5">
          {data.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </Box>
    </div>
  );
}
