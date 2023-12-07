import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Box from "../shared/Box";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const numberRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([\s]?[0-9])+$/
);

const FormSchema = z.object({
  cardNumber: z.string().min(16).max(16).regex(numberRegex, "Skal være tal"),
});

export default function PayDetails({ payMethod, totalPrice }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cardNumber: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box className={"mb-9"}>
          <h3 className="text-[16px] font-semibold mb-3">
            Betalingsoplysninger
          </h3>
          <div className="lg:max-w-[342px] relative">
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
          </div>
        </Box>
        <div>
          <p className="text-[14px] font-semibold opacity-70 mb-1">Total</p>
          {isClient ? (
            <h2 className="font-semibold text-[20px] mb-4">
              {totalPrice},00 dkk
            </h2>
          ) : (
            <Skeleton className={"h-[30px] w-[100px] mb-4"} />
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
