'use client';

import { Plus, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import Modal from '../shared/Modal';
import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import Heading from '../shared/Heading';
import { Textarea } from '@/components/ui/textarea';

export default function NewMessage({ category, currentUser }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Ny besked
      </Button>
      {showModal && (
        <Modal maxWidth={'max-w-[520px]'} setActive={setShowModal}>
          <NewMessageForm
            category={category}
            setShowModal={setShowModal}
            currentUser={currentUser}
          />
        </Modal>
      )}
    </>
  );
}

const FormSchema = z.object({
  message: z
    .string()
    .min(5, {
      message: 'Beskeden skal være mindst 5 tegn lang.',
    })
    .max(100, { message: 'Beskeden må maks være 100 tegn lang.' }),
});

function NewMessageForm({ category, setShowModal, currentUser }) {
  const supabase = createClient();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
    },
  });

  async function onSubmit(data) {
    console.log(data);
    const { error } = await supabase
      .from('messages')
      .insert({ message: data.message, category, user_id: currentUser.id });
    if (error) {
      console.log(error);
    } else {
      setShowModal(false);
    }
  }

  return (
    <>
      <Heading title={'Send besked'} icon={<Send />} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Besked</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Skriv din besked her..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-5" type="submit">
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
          <Button
            className="w-full mt-2"
            variant="outline"
            onClick={() => setShowModal(false)}
          >
            Annuller
          </Button>
        </form>
      </Form>
    </>
  );
}
