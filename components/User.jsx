'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
export default function User({ isSuperAdmin, email, user_id }) {
  const supabase = createClient();
  const router = useRouter();

  async function setClaim(uid, claim, value) {
    const { data, error } = await supabase.rpc('set_claim', {
      uid,
      claim,
      value,
    });
    console.log(error ?? data);
    await supabase
      .from('profiles')
      .update({ isSuperAdmin: value })
      .eq('id', uid);
    router.refresh();
    return { data, error };
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div>{email}</div>
      <Button
        onClick={() =>
          setClaim(user_id, 'claims_admin', isSuperAdmin ? false : true)
        }
      >
        {isSuperAdmin.toString()}
      </Button>
    </div>
  );
}
