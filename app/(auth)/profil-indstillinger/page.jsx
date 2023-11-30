import ProfileForm from '@/components/auth/ProfileForm';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function ProfileSettings() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from('profiles')
    .select()
    .eq('id', session.user.id);

  return (
    <ProfileForm
      avatar={data[0].avatar_url}
      firstN={data[0].first_name}
      lastN={data[0].last_name}
      phoneN={data[0].phone_number}
      hasNewsletter={data[0].wantNewsletter}
      user_id={data[0].id}
    />
  );
}
