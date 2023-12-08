import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { Input } from '@/components/ui/input';

import Box from '../shared/Box';
import { CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { createClient } from '@/utils/supabase/client';

const numberRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([\s]?[0-9])+$/
);

const FormSchema = z.object({
  cardNumber: z.string().regex(numberRegex, 'Skal være tal').min(16).max(16),
  name: z.string().min(2).max(50),
  expireDate: z.string().regex(numberRegex, 'Skal være tal').min(2).max(2),
  expireYear: z.string().regex(numberRegex, 'Skal være tal').min(2).max(2),
  cvc: z.string().regex(numberRegex, 'Skal være tal').min(3).max(3),
});

export default function PayDetails({
  payMethod,
  totalPrice,
  userId,
  activityId,
}) {
  const [isClient, setIsClient] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cardNumber: '',
      name: '',
      expireDate: '',
      expireYear: '',
      cvc: '',
    },
  });

  async function onSubmit(values) {
    console.log(values);
    const { error } = await supabase
      .from('registrations')
      .update({
        isPayed: true,
        expireDate: null,
      })
      .eq('user_id', userId)
      .eq('activity_id', activityId);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box className={'mb-9'}>
          <h3 className="text-[16px] font-semibold mb-3">
            Betalingsoplysninger
          </h3>
          <div className="lg:max-w-[342px] max-w-[600px] relative flex flex-col gap-6">
            <FormField
              control={form.control}
              name="cardNumber"
              className="relative"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="relative">Kortnummer</FormLabel>
                  <FormControl>
                    <Input placeholder="Indtast kortnummer" {...field} />
                  </FormControl>
                  <img
                    className="absolute h-6 top-0 translate-y-[30px] right-2 rounded-[1.2px]"
                    src={`/${payMethod}.png`}
                    alt=""
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              className="relative"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="relative">
                    Kortindehavers navn
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Indtast navn på kortet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div className="flex gap-1.5 flex-wrap">
                <FormField
                  control={form.control}
                  name="expireDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="relative">Udløbsdato</FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-[100px]"
                          placeholder="MM"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="mt-[38px] hidden xxs:block">-</p>
                <FormField
                  control={form.control}
                  name="expireYear"
                  render={({ field }) => (
                    <FormItem className="xxxs:translate-y-[6px]">
                      <FormLabel className="relative text-white hidden xxxs:block mb-2.5 h-[16.8px]">
                        YY
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="max-w-[100px]"
                          placeholder="YY"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="cvc"
                className="relative"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="relative">Kontrolcifre</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[100px]"
                        placeholder="CVV/CVC"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Box>
        <div>
          <p className="text-[14px] font-semibold opacity-70 mb-1">Total</p>
          {isClient ? (
            <h2 className="font-semibold text-[20px] mb-4">
              {totalPrice},00 dkk
            </h2>
          ) : (
            <Skeleton className={'h-[30px] w-[100px] mb-4'} />
          )}
          <Button type="submit" className="w-full">
            <CreditCard className="w-4 h-4 mr-2" />
            Betal
          </Button>
        </div>
      </form>
    </Form>
  );
}
