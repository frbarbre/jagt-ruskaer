'use client';

import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';

export default function ProviderAuth({ provider }) {
  const supabase = createClient();
  async function signInWithProvider() {
    supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Button
      onClick={signInWithProvider}
      variant={'outline'}
      className="capitalize gap-2 w-full text-[14px]"
    >
      <img src={`/${provider}.png`} className="w-4 h-4 aspect-square" />
      {provider.includes('linkedin') ? 'linkedIn' : provider}
    </Button>
  );
}
