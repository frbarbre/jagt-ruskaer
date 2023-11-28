import { createClient } from '@/utils/supabase/server';
import AuthButton from '../components/auth/AuthButton';
import { cookies } from 'next/headers';
import User from '@/components/User';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from('profiles').select();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let isSuperAdmin = null;

  if (session) {
    isSuperAdmin = session.user.app_metadata.claims_admin;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>
      {isSuperAdmin !== null && (
        <h1>This is User is {!isSuperAdmin && 'not'} a Super Admin</h1>
      )}
      {data.map((profile) => (
        <User
          key={profile.id}
          isSuperAdmin={profile.isSuperAdmin}
          email={profile.email}
          user_id={profile.id}
        />
      ))}
    </div>
  );
}
