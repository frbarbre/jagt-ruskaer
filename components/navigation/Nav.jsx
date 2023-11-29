import Link from 'next/link';
import { Button } from '../ui/button';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import ProfileMenu from './ProfileMenu';

export default async function Nav() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let user = null;

  if (session) {
    const { data } = await supabase
      .from('profiles')
      .select()
      .eq('id', session.user.id);
    user = data[0];
  }

  return (
    <header className="shadow-shad fixed top-0 right-0 left-0 bg-white px-6 md:px-12 py-9 flex items-center justify-between">
      <Link href={'/'}>
        <img
          src="/logo.png"
          alt="ruskær logo"
          className="w-[84px] object-contain"
        />
      </Link>
      {session ? (
        <ProfileMenu user={user} />
      ) : (
        <div className="flex gap-5">
          <Link href={'/sign-up'}>
            <Button>Bliv medlem</Button>
          </Link>
          <Link href={'/login'}>
            <Button variant="outline" className="border-zinc-600">
              Login
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
