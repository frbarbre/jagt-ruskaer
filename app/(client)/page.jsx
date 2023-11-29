import { createClient } from '@/utils/supabase/server';
import AuthButton from '../../components/auth/AuthButton';
import { cookies } from 'next/headers';
import User from '@/components/User';
import { redirect } from 'next/navigation';

export default async function Home() {
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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>
      {session && <h1>This user is {!isSuperAdmin && 'not '}a Super Admin</h1>}
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
