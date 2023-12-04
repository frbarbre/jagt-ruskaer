'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { setClaim } from '@/utils/setClaim';

export default function User({ isSuperAdmin, email, user_id }) {
  const supabase = createClient();
  const router = useRouter();

  function handleClick() {
    setClaim({
      router: router,
      supabase: supabase,
      uid: user_id,
      claim: 'userrole',
      value: isSuperAdmin ? 'bruger' : 'admin',
    });
    setClaim({
      router: router,
      supabase: supabase,
      uid: user_id,
      claim: 'claims_admin',
      value: isSuperAdmin ? false : true,
    });
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div>{email}</div>
      <Button onClick={handleClick}>{isSuperAdmin.toString()}</Button>
    </div>
  );
}
