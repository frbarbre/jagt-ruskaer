"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Trash2, UserPlus, Loader2 } from "lucide-react";
import UploadImage from "@/components/shared/UploadImage";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Validation of input
const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z
    .string()
    .min(8)
    .max(8)
    .regex(phoneRegex, "Ikke et gyldigt telefonnummer"),
  wantsNewsletter: z.boolean().optional().default(false),
});

export default function ProfileForm({
  avatar,
  user_id,
  firstN,
  lastN,
  phoneN,
  hasNewsletter,
  isAdminPage,
}) {
  // Initializing SupaBase client
  const supabase = createClient();

  // initializing the router
  const router = useRouter();

  const [image, setImage] = useState(avatar || "");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    isActive: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm({
    // zodResolver will validate your form values against your schema - hover on it... Bish..
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: firstN || "",
      lastName: lastN || "",
      phoneNumber: phoneN || "",
      wantsNewsletter: hasNewsletter || false,
    },
  });

  // 2. Define a submit handler - Will run AFTER the zodResolver has validated the form (OPTIMUS FORM)
  // NOTICE - Async function
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phoneNumber,
        wantNewsletter: values.wantsNewsletter,
        avatar_url: isDeleting ? "" : images[0]?.url,
      })
      .eq("id", user_id);
    if (!error) {
      if (isAdminPage) {
        router.push("/admin/medlemmer");
      } else {
        router.push("/");
      }
    } else {
      setIsSubmitting(false);
      console.log(error);
    }
  }

  function removeImage() {
    setImage("");
    setImages([]);
    setIsDeleting(true);
  }

  return (
    <section className="max-w-[471px] sm:p-5 sm:shadow-shad rounded-md sm:border border-zinc-200">
      <div className="w-full items-center justify-between flex flex-wrap gap-3">
        <div className="flex gap-2 items-center my-5">
          <UserPlus />
          <h1 className="text-xl font-semibold">Rediger Profil</h1>
        </div>
        <img
          src="/logo.png"
          alt="ruskær-logo"
          className="w-[84px] object-contain"
        />
      </div>

      <p className="text-zinc-700 my-5">
        Indtast oplysninger for at redigere{" "}
        {isAdminPage ? firstN + " " + lastN + "s" : "din"} profil.
      </p>
      <div className="relative w-max mx-auto">
        <UploadImage
          image={image}
          images={images}
          setImages={setImages}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
          setIsDeleting={setIsDeleting}
        />
        {!isDeleting && (image !== "" || images[0]) && (
          <Button
            className="absolute top-1 right-1 bg-white px-2.5"
            variant="outline"
            onClick={removeImage}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Form {...form}>
        {/* form.handleSubmit() is from the 'React Hook Form' library */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fornavn</FormLabel>
                  <FormControl>
                    <Input
                      className="md:max-w-[154px]"
                      placeholder="Fornavn"
                      {...field}
                    />
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
          </div>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefonnr.</FormLabel>
                <FormControl>
                  <Input placeholder="Telefonnr." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="wantsNewsletter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Jeg vil gerne modtage nyhedsbrev</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="pt-5">
            <Button
              type="submit"
              className="w-full items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              <span>Opdater Profil</span>
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
