"use client";

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
import { Input } from "@/components/ui/input";
import Box from "../shared/Box";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus } from "lucide-react";
import { useStore } from "@/store";
import { shallow } from "zustand/shallow";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const FormSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z
    .string()
    .min(8)
    .max(8)
    .regex(phoneRegex, "Ikke et gyldigt telefonnummer"),
  email: z.string().email(),
  hasDiscount: z.boolean().optional().default(false),
});

export default function GuestForm({
  clients,
  setClients,
  setIsGuestsOpen,
  pricePerPerson,
}) {
  const [currentGuest, setCurrentGuest] = useStore(
    (state) => [state.currentGuest, state.setCurrentGuest],
    shallow
  );

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: currentGuest?.firstName || "",
      lastName: currentGuest?.lastName || "",
      phoneNumber: currentGuest?.phoneNumber || "",
      email: currentGuest?.email || "",
      hasDiscount: currentGuest?.hasDiscount || false,
    },
  });

  function onSubmit(values) {
    const newGuest = {
      avatar: null,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phoneNumber,
      email: values.email,
      discount: values.hasDiscount,
      isGuest: true,
      price: values.hasDiscount ? pricePerPerson / 2 : pricePerPerson,
      dogs: 0,
    };
    setCurrentGuest(values);
    setClients([...clients, newGuest]);
    setIsGuestsOpen(false);
  }

  return (
    <Box>
      <div className="flex gap-1 items-center mb-4">
        <UserPlus className="w-4 h-4 mr-1" />
        <h4 className="text-[14px] font-semibold">Tilføj gæst</h4>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornavn</FormLabel>
                <FormControl>
                  <Input placeholder="Fornavn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Efternavn</FormLabel>
                <FormControl>
                  <Input placeholder="Efternavn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input placeholder="Telefon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasDiscount"
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

          <div className="flex flex-col gap-2 mt-3">
            <Button type="submit">
              <UserPlus className="h-4 w-4 mr-2" />
              Tilføj
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsGuestsOpen(false)}
            >
              Annuller
            </Button>
          </div>
        </form>
      </Form>
    </Box>
  );
}
