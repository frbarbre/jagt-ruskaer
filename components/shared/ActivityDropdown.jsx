'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/utils/supabase/client';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function ActivityDropdown({ activityId }) {
  const supabase = createClient();
  async function deleteActivity() {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', activityId);
    if (error) {
      console.log(error);
      return;
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Valg</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/admin/aktiviteter/rediger-aktivitet/${activityId}`}>
          <DropdownMenuItem>Rediger aktivitet</DropdownMenuItem>
        </Link>
        <Link href={`/aktiviteter/${activityId}`}>
          <DropdownMenuItem>Se aktivitet</DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="text-red-600" onClick={deleteActivity}>
          Slet aktivitet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
