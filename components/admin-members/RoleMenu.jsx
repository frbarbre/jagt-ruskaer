import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { UserCog } from 'lucide-react';
import Heading from '../shared/Heading';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { setClaim } from '@/utils/setClaim';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

const formMessages = [
  {
    role: 'bruger',
    message: 'Bruger rolen har ingen specielle beføjelser',
  },
  {
    role: 'jagt',
    message:
      'Jagt rolen, kan giver adgang til at lave vigtige beskeder på jagt undersiden',
  },
  {
    role: 'flugtskydning',
    message:
      'Flugtskydnings rolen, kan giver adgang til at lave vigtige beskeder på flugtskydning undersiden',
  },
  {
    role: 'riffelskydning',
    message:
      'Riffelskydning rolen, kan giver adgang til at lave vigtige beskeder på Riffelskydning undersiden',
  },
  {
    role: 'hundetræning',
    message:
      'Hundetræning rolen, kan giver adgang til at lave vigtige beskeder på hundetræning undersiden',
  },
  {
    role: 'admin',
    message:
      'Admin rollen giver adgang til admin panelet, og alt hvad der følger med det.',
  },
];

const FormSchema = z.object({
  role: z.string({
    required_error: 'Du skal vælge en rolle',
  }),
});

export default function RoleMenu({ user_id, setActive }) {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const selectedUserRole = useStore((state) => state.selectedUserRole);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: selectedUserRole,
    },
  });

  const currentChoice = form.watch();

  const currentMessage = formMessages.find(
    (message) => message.role === currentChoice.role
  );

  function onSubmit(data) {
    setClaim({
      router: router,
      supabase: supabase,
      uid: user_id,
      claim: 'userrole',
      value: data.role,
    });
    if (data.role === 'admin') {
      setClaim({
        router: router,
        supabase: supabase,
        uid: user_id,
        claim: 'claims_admin',
        value: true,
      });
    } else {
      setClaim({
        router: router,
        supabase: supabase,
        uid: user_id,
        claim: 'claims_admin',
        value: false,
      });
    }
    setActive(false);
  }

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user_id)
        .single();
      setUser(data);
      if (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <Heading title={'Skift rolle'} icon={<UserCog />} />
      <p className="opacity-70 my-5">
        Skift {user?.first_name} {user?.last_name}s rolle.
      </p>
      {user && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rolle</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Vælg en rolle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bruger">Bruger</SelectItem>

                      <SelectItem value="jagt">Jagt</SelectItem>
                      <SelectItem value="flugtskydning">
                        Flugtskydning
                      </SelectItem>
                      <SelectItem value="riffelskydning">
                        Riffelskydning
                      </SelectItem>
                      <SelectItem value="hundetræning">Hundetræning</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>{currentMessage?.message}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end w-full gap-2">
              <Button onClick={() => setActive(false)} variant="outline">
                Annuler
              </Button>
              <Button type="submit">
                <UserCog className="h-4 w-4 mr-2" /> Skift
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
