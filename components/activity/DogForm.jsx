"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Box from "../shared/Box";

const FormSchema = z.object({
  dogs: z.string({
    required_error: "Vælg et antal hunde",
  }),
});

export default function DogForm({
  clients,
  setClients,
  setIsDogsOpen,
  currentDogs,
  maxDogs,
}) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dogs: clients[0].dogs.toString(),
    },
  });

  function onSubmit(values) {
    setIsDogsOpen(false);
    const newMainClient = {
      ...clients[0],
      dogs: parseInt(values.dogs),
    };
    setClients([newMainClient, ...clients.slice(1)]);
  }

  return (
    <Box>
      <div className="flex gap-1 items-center mb-4">
        <img src="/dog-plus.svg" alt="" />
        <h4 className="text-[14px] font-semibold">Tilføj hund(e)</h4>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="dogs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antal</FormLabel>
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
          <div className="flex flex-col gap-2">
            <Button type="submit">
              <img src="/dog-plus.svg" className="invert mr-1" alt="" />
              Tilføj
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsDogsOpen(false)}
            >
              Annuller
            </Button>
          </div>
        </form>
      </Form>
    </Box>
  );
}
