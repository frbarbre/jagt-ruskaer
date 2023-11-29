'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HoverCard } from '@/components/ui/hover-card';
import { LogOut } from 'lucide-react';
import { CalendarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function ProfileMenu({ user }) {
  const supabase = createClient();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    router.refresh();
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  function formatNumber(num) {
    return num
      .toString()
      .split('')
      .reverse()
      .join('')
      .match(/.{1,2}/g)
      .join(' ')
      .split('')
      .reverse()
      .join('');
  }

  return (
    <>
      <Avatar
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="cursor-pointer self-center justify-self-end"
      >
        <AvatarImage src={user.avatar_url} />
        <AvatarFallback>
          {user.first_name?.[0]}
          {user.last_name?.[0]}
        </AvatarFallback>
      </Avatar>
      {isMenuOpen && (
        <>
          <div className="absolute z-50 right-6 md:right-12 top-[110px] md:top-[92px] bg-white shadow-shad rounded-md p-6 border border-zinc-200 w-nav md:max-w-[302px]">
            <HoverCard>
              <div className="flex gap-3.5 items-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>
                    {user.first_name?.[0]}
                    {user.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-semibold">
                    {user?.first_name} {user?.last_name}
                  </h4>
                  {user?.phone_number && (
                    <p className="text-sm">
                      +45 {formatNumber(user?.phone_number)}
                    </p>
                  )}
                  {user?.created_at && (
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1 h-4 w-4 opacity-70" />
                      <span className="text-xs text-muted-foreground">
                        Tilmeldt {formatDate(user?.created_at)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col pt-8 gap-3">
                {user.isSuperAdmin && (
                  <Link href="/admin">
                    <Button variant="outline" className="w-full">
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Link href={'/my-activities'}>
                  <Button variant="outline" className="w-full">
                    Mine Aktiviteter
                  </Button>
                </Link>
                <Link href={'/profile-setting'}>
                  <Button variant="outline" className="w-full">
                    Profilindstillinger
                  </Button>
                </Link>
                <Button onClick={signOut} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </HoverCard>
          </div>

          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsMenuOpen(false)}
          />
        </>
      )}
    </>
  );
}