'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import ProviderAuth from '@/components/auth/ProviderAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { LogIn, ArrowLeft, SmilePlus } from 'lucide-react';
import Or from '@/components/auth/Or';
import Link from 'next/link';

// Validation of input
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  // Initializing SupaBase client
  const supabase = createClient();
  // Initializing router to redirect user on successful login
  const router = useRouter();
  // State to validate if email and password is correct
  const [error, setError] = useState(false);

  // 1. Define your form.
  const form = useForm({
    // zodResolver will validate your form values against your schema - hover on it... Bish..
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler - Will run AFTER the zodResolver has validated the form (OPTIMUS FORM)
  // NOTICE - Async function
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (!error) {
      setError(false);
      router.push('/');
    } else {
      setError(true);
    }
  }

  return (
    <section className="max-w-[471px] p-5 shadow-shad rounded-md border border-zinc-200">
      <div className="w-full items-center justify-between flex">
        <Button onClick={() => router.back()} className="items-center flex">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Tilbage</span>
        </Button>

        <img
          src="/logo.png"
          alt="ruskær-logo"
          className="w-[84px] object-contain"
        />
      </div>
      <div className="flex gap-2 items-center my-5">
        <LogIn />
        <h1 className="text-xl font-semibold">Login</h1>
      </div>
      <p className="text-zinc-700 mb-5">
        Login med din foretrukne loginmetode.
      </p>
      <Form {...form}>
        <div className="flex justify-between gap-[11px]">
          <ProviderAuth provider={'facebook'} />
          <ProviderAuth provider={'google'} />
          <ProviderAuth provider={'linkedin_oidc'} />
        </div>
        <Or />
        {/* form.handleSubmit() is from the 'React Hook Form' library */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Emailadresse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adgangskode</FormLabel>
                <FormControl>
                  <Input placeholder="Adgangskode" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <p className="text-[0.8rem] font-medium text-destructive">
              Email og adgangskode stemmer ikke overens
            </p>
          )}
          <div className="pt-5">
            <Button type="submit" className="w-full items-center">
              <LogIn className="mr-2 h-4 w-4" /> <span>Login</span>
            </Button>
            <Or />
            <Link href={'/sign-up'}>
              <Button className="w-full items-center" variant="outline">
                <SmilePlus className="mr-2 h-4 w-4" /> <span>Bliv medlem</span>
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </section>
  );
}
