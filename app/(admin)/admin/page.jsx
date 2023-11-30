import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data } = await supabase
      .from('profiles')
      .select('isSuperAdmin')
      .eq('id', session.user.id);

    if (!data[0].isSuperAdmin) {
      redirect('/');
    }
  } else {
    redirect('/');
  }

  return <div>AdminPage</div>;
}
