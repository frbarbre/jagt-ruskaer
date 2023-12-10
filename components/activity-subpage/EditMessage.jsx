'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import Modal from '../shared/Modal';
import { useState } from 'react';
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

import { createClient } from '@/utils/supabase/client';
import Heading from '../shared/Heading';
import { Textarea } from '@/components/ui/textarea';

export default function EditMessage({ message, currentUser, category }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="px-2.5"
              variant="outline"
              onClick={() => setShowModal(true)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Rediger besked</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {showModal && (
        <Modal maxWidth={'max-w-[520px]'} setActive={setShowModal}>
          <EditForm message={message} setShowModal={setShowModal} />
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

function EditForm({ message, setShowModal }) {
  const supabase = createClient();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: message?.message,
    },
  });

  async function onSubmit(data) {
    console.log(data);
    const { error } = await supabase
      .from('messages')
      .update({ message: data.message, updated_at: new Date() })
      .eq('id', message.id);

    if (error) {
      console.log(error);
    } else {
      setShowModal(false);
    }
  }

  return (
    <>
      <Heading title={'Rediger besked'} icon={<Pencil />} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-5'>
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
            <Pencil className='w-4 h-4 mr-2' />Rediger
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
