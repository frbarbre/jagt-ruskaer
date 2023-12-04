'use client';

import Box from '@/components/shared/Box';
import Heading from '@/components/shared/Heading';
import { createClient } from '@/utils/supabase/client';
import { Loader2, Mailbox, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { sendNewsletter } from '@/actions/email.actions';
import { useServerAction } from '@/hooks/useServerAction';

const formSchema = z.object({
  title: z.string().min(2),
  subtitle: z.union([z.string().min(2).optional(), z.literal('')]),
  message: z.string().min(2),
  image: z.string(),
});

export default function Newsletter() {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const fileReader = useRef(null);

  const [sendEmail, isEmailSending] = useServerAction(sendNewsletter);

  const timeStamp = new Date().getTime();

  async function handleUpload(e) {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
    }

    setImageError(null);
    setIsSubmitting(true);
    const { data, error } = await supabase.storage
      .from('images')
      .upload(timeStamp + file?.name, e.target.files[0]);
    if (error) {
      console.log(error);
    } else {
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(timeStamp + file.name);
      setImage(data.publicUrl);
      setIsSubmitting(false);
      console.log('uploaded');
    }
  }

  const form = useForm({
    // zodResolver will validate your form values against your schema - hover on it... Bish..
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      message: '',
      image: '',
    },
  });

  const currentValues = form.getValues();

  // 2. Define a submit handler - Will run AFTER the zodResolver has validated the form (OPTIMUS FORM)
  // NOTICE - Async function
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    sendEmail({
      title: values.title,
      subtitle: values.subtitle,
      message: values.message,
      image: image ? image : null,
    });
    form.reset();
    if (image) {
      setImage(null);
      fileReader.current.value = '';
      fileReader.current.type = 'text';
      fileReader.current.type = 'file';
      console.log(fileReader.current);
    }
  }

  return (
    <section>
      <Box maxWidth={'max-w-[822px]'}>
        <Heading title={'Nyhedsbrev'} icon={<Mailbox />} />
        <p className="opacity-70 my-5">
          Her kan du afsende et nyhedsbrev, alle brugere der har takket ja til
          nyhedsbrev vil modtage en email.
        </p>
        <Form {...form}>
          {/* form.handleSubmit() is from the 'React Hook Form' library */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billede</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Upload billede"
                      accept="image/*"
                      type="file"
                      ref={fileReader}
                      onChange={(e) => handleUpload(e)}
                    />
                  </FormControl>
                  <FormMessage />
                  {imageError && (
                    <p className="text-[0.8rem] font-medium text-destructive max-w-[360px]">
                      {imageError}
                    </p>
                  )}
                  <FormDescription>
                    Vælg et billede der er under 6mb, billeder i 16:9 format
                    virker bedst.
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input placeholder="Titel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Undertitel</FormLabel>
                  <FormControl>
                    <Input placeholder="Undertitel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Besked</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Skriv besked her..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-5">
              <Button
                type="submit"
                disabled={isSubmitting || isEmailSending}
                className="w-full items-center"
              >
                {isSubmitting || isEmailSending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                <span>Send</span>
              </Button>
            </div>
          </form>
        </Form>
      </Box>
    </section>
  );
}
