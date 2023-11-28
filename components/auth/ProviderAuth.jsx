'use client';

import { createClient } from '@/utils/supabase/client';

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

  return <button onClick={signInWithProvider}>Sign In With {provider}</button>;
}
