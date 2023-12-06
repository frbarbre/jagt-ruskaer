'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function RegistrationDropDown({ user_id, registration_id }) {
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  async function deleteUser() {
    const { data, error } = await supabase.auth.admin.deleteUser(user_id);
    if (error) {
      console.log(error);
    } else {
      router.refresh();
    }
  }

  function editUser() {
    router.push(`/admin/medlemmer/${user_id}`);
  }

  async function deleteRegistration() {
    const { data, error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', registration_id);
    if (error) {
      console.log(error);
    } else {
      router.refresh();
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Valg</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(user_id)}
        >
          Kopier bruger ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteRegistration}>
          Slet tilmelding
        </DropdownMenuItem>
        <DropdownMenuItem onClick={editUser}>Rediger bruger</DropdownMenuItem>
        <DropdownMenuItem onClick={deleteUser}>Slet bruger</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
