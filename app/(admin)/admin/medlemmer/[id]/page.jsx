import ProfileForm from '@/components/auth/ProfileForm';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function EditUser({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from('profiles')
    .select()
    .eq('id', params.id)
    .single();

  return (
    <div className="flex items-center justify-center w-full">
      <ProfileForm
        avatar={data.avatar_url}
        firstN={data.first_name}
        lastN={data.last_name}
        phoneN={data.phone_number}
        hasNewsletter={data.wantNewsletter}
        user_id={data.id}
        isAdminPage={true}
      />
    </div>
  );
}
