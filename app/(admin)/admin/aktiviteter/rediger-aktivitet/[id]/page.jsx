import EditActivityForm from '@/components/admin-activities/EditActivityForm';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function EditActivity({ params, searchParams }) {
  const placeId = searchParams.place_id;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from('activities')
    .select()
    .eq('id', params.id)
    .single();

  return <EditActivityForm activity={data} placeId={placeId} />;
}
