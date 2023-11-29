import Link from 'next/link';
import { Button } from '../ui/button';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import ProfileMenu from './ProfileMenu';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

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
    <header className="shadow-shad fixed top-0 right-0 left-0 bg-white px-6 md:px-12 py-4 md:py-6 grid grid-cols-3 md:flex md:items-center md:justify-between">
      <MobileMenu />
      <div className="flex items-center gap-12">
        <Link href={'/'} className="mx-auto md:mx-0">
          <img
            src="/logo.png"
            alt="ruskær logo"
            className="w-[84px] object-contain"
          />
        </Link>
        <DesktopMenu />
      </div>

      {session ? (
        <ProfileMenu user={user} />
      ) : (
        <div className="flex gap-5 items-center justify-end">
          <Link href={'/sign-up'} className="hidden md:block">
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
