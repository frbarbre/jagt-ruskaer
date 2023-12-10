'use client';

import { Plus, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import Modal from '../shared/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Heading from '../shared/Heading';
import { Separator } from '../ui/separator';
import { createClient } from '@/utils/supabase/client';

export default function AddUser({
  activity,
  profiles,
  maxParticipants,
  currentParticipants,
  currentDogs,
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Tilføj medlem
      </Button>
      {showModal && (
        <Modal maxWidth={'max-w-[520px]'} setActive={setShowModal}>
          <AddUserForm
            activity={activity}
            profiles={profiles}
            maxParticipants={maxParticipants}
            currentParticipants={currentParticipants}
            setShowModal={setShowModal}
            currentDogs={currentDogs}
          />
        </Modal>
      )}
    </>
  );
}

const FormSchema = z.object({
  profile: z
    .string({
      required_error: 'Du skal vælge en bruger.',
    })
    .min(1, { message: 'Du skal vælge en bruger.' }),
  guest: z.boolean().default(false).optional(),
  dogs: z.string({
    required_error: 'Vælg et antal hunde',
  }),
  discount: z.boolean().optional().default(false),
});

function AddUserForm({
  activity,
  profiles,
  maxParticipants,
  currentParticipants,
  setShowModal,
  currentDogs,
}) {
  const supabase = createClient();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profile: '',
      guest: false,
      dogs: '0',
      discount: false,
    },
  });

  async function onSubmit(data) {
    console.log(data);
    const { error } = await supabase.from('registrations').insert({
      activity_id: activity.id,
      user_id: data.profile,
      dogs: parseInt(data.dogs),
      isPayed: true,
      participants: data.guest ? 2 : 1,
      total_price: totalPrice,
    });

    if (error) {
      console.error(error);
    } else {
      setShowModal(false);
    }
  }

  const currentValues = form.watch();
  useEffect(() => {
    if (!currentValues.guest) {
      form.setValue('discount', false);
    }
  }, [currentValues.guest]);

  const maxDogs = activity.dogs;

  const basePrice = activity.price;
  let totalPrice = basePrice;
  if (currentValues.guest) {
    let discount = 2;
    totalPrice = basePrice * discount;
    if (currentValues.discount) {
      discount = 1.5;
      totalPrice = basePrice * discount;
    }
  }

  return (
    <>
      <Heading title={'Tilføj medlem'} icon={<UserPlus />} />
      <p className="text-[12px] opacity-70 my-5">
        Udfyld felterne nedenfor for at tilmelde en bruger til aktiviteten.{' '}
        <br />{' '}
        <span className="text-red-600">
          OBS: Denne handling springer over betalingen, det skal derfor løses
          internt
        </span>
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="profile"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Medlem</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between w-full',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? profiles.find(
                              (profile) => profile.id === field.value
                            )?.first_name +
                            ' ' +
                            profiles.find(
                              (profile) => profile.id === field.value
                            ).last_name
                          : 'Vælg et medlem'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="sm:w-[478px] p-0 z-[100]">
                    <Command>
                      <CommandInput placeholder="Søg efter et medlem..." />
                      <CommandEmpty>Inget medlem fundet.</CommandEmpty>
                      <CommandGroup>
                        {profiles.map((profile) => (
                          <CommandItem
                            value={`${profile.first_name} ${profile.last_name}`}
                            key={profile.id}
                            onSelect={() => {
                              form.setValue('profile', profile.id);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                profile.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {profile.first_name} {profile.last_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dogs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antal hunde</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Vælg antal hunde" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1" disabled={currentDogs + 1 > maxDogs}>
                      1
                    </SelectItem>
                    <SelectItem value="2" disabled={currentDogs + 2 > maxDogs}>
                      2
                    </SelectItem>
                    <SelectItem value="3" disabled={currentDogs + 3 > maxDogs}>
                      3
                    </SelectItem>
                    <SelectItem value="4" disabled={currentDogs + 4 > maxDogs}>
                      4
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {maxParticipants > currentParticipants + 1 && (
            <FormField
              control={form.control}
              name="guest"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Medlemmet har en gæst med</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}

          {currentValues.guest && activity.category === 'jagt' && (
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Gæsten deltager ikke aktivt jagten (50% pris)
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}

          <div className="flex flex-col gap-2">
            <Separator />
            <p className="text-[14px] font-semibold opacity-70">Total</p>
            <h2 className="font-semibold text-[20px]">{totalPrice},00 dkk</h2>
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit">
              <UserPlus className="w-4 h-4 mr-2" />
              Opret tilmeldning
            </Button>
            <Button onClick={() => setShowModal(false)} variant="outline">
              Annuller
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
