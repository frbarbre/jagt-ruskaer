"use client";

import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import { createClient } from "@/utils/supabase/client";
import { CalendarPlus, CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import ActivityPreview from "@/components/admin-activities/ActivityPreview";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

const numberRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([\s]?[0-9])+$/
);

const timeRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([:]?[\s]?[0-9])+$/
);

const scriptOptions = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  libraries: ["places"],
};

const formSchema = z.object({
  title: z.string().min(2),
  date: z.date().min(new Date()),
  category: z.string().min(2),
  timeFrom: z
    .string()
    .min(5, { message: "Ugyldigt" })
    .max(5, { message: "Ugyldigt" })
    .regex(timeRegex, "Ugyldigt")
    .includes(":", { message: "Ugyldigt" }),
  timeTo: z.union([
    z
      .string()
      .min(5, { message: "Ugyldigt" })
      .max(5, { message: "Ugyldigt" })
      .regex(timeRegex, "Ugyldigt")
      .includes(":", { message: "Ugyldigt" })
      .optional(),
    z.literal(""),
  ]),
  participants: z.union([
    z.string().regex(numberRegex, "Skal være et tal").optional(),
    z.literal(""),
  ]),
  dogs: z.union([
    z.string().regex(numberRegex, "Skal være et tal").optional(),
    z.literal(""),
  ]),
  price: z.union([
    z.string().regex(numberRegex, "Skal være et tal").optional(),
    z.literal(""),
  ]),
  location: z.string().min(2),
  description: z.string().min(2),
  image: z.string(),
});

export default function CreateActivityForm({ position, placeId }) {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript(scriptOptions);
  const [autocomplete, setAutocomplete] = useState(null);

  const timeStamp = new Date().getTime();

  useEffect(() => {
    router.push("/admin/aktiviteter/opret-aktivitet");
  }, []);

  const onLoad = (autocompleteObj) => {
    setAutocomplete(autocompleteObj);
  };

  async function handleUpload(e) {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
    }

    setImageError(null);
    setIsSubmitting(true);
    const { data, error } = await supabase.storage
      .from("images")
      .upload(timeStamp + file?.name, e.target.files[0]);
    if (error) {
      console.log(error);
    } else {
      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(timeStamp + file.name);
      setImage(data.publicUrl);
      setIsSubmitting(false);
      console.log("uploaded");
    }
  }

  const form = useForm({
    // zodResolver will validate your form values against your schema - hover on it... Bish..
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: "",
      category: "",
      timeFrom: "",
      timeTo: "",
      participants: "",
      dogs: "",
      price: "",
      location: "",
      description: "",
      image: "",
    },
  });

  const onPlaceChanged = (e) => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if ("place_id" in place) {
        router.push(`?place_id=${place.place_id}`);
        form.setValue("location", place.formatted_address);
      }
    }
  };

  const currentValues = form.watch();

  useEffect(() => {
    if (
      currentValues.category !== "hundetræning" &&
      currentValues.category !== "jagt"
    ) {
      form.setValue("dogs", "");
    }
  }, [currentValues.category]);
  // 2. Define a submit handler - Will run AFTER the zodResolver has validated the form (OPTIMUS FORM)
  // NOTICE - Async function
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (image) {
      setIsSubmitting(true);
      let dogs = values.dogs === "" ? null : values.dogs;

      const { error } = await supabase.from("activities").insert({
        title: values.title,
        date: new Date(values.date.getTime() + 1000 * 60 * 60 * 2),
        category: values.category,
        timeFrom: values.timeFrom,
        timeTo: values.timeTo === "" ? null : values.timeTo,
        participants: values.participants === "" ? null : values.participants,
        dogs: dogs,
        price: values.price === "" ? null : values.price,
        location: values.location,
        description: values.description,
        image: image,
        place_id: placeId,
      });

      if (!error) {
        router.push("/admin/aktiviteter");
      } else {
        console.log(error);
      }
    } else {
      setImageError("Du skal uploade et billede");
    }
  }

  return (
    <section className="flex gap-5 h-full">
      <Box maxWidth={"lg:max-w-[822px] w-full"} isOuterBox={true}>
        <Heading title={"Opret Aktivitet"} icon={<CalendarPlus />} />
        <p className="opacity-70 my-5">Her kan der oprettes en aktivitet</p>
        <Form {...form}>
          {/* form.handleSubmit() is from the 'React Hook Form' library */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 flex flex-col justify-between h-container"
          >
            <div className="flex flex-col gap-3">
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

              <div className="grid sm:grid-cols-2 gap-5 items-end">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="h-[16.8px] mb-[1.8px]">
                        Dato
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "P")
                              ) : (
                                <span>Vælg en dato</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date <= new Date() ||
                              date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="w-full"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Vælg kategori" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jagt">Jagt</SelectItem>
                          <SelectItem value="flugtskydning">
                            Flugtskydning
                          </SelectItem>
                          <SelectItem value="riffelskydning">
                            Riffelskydning
                          </SelectItem>
                          <SelectItem value="hundetræning">
                            Hundetræning
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between flex-wrap gap-5">
                <div className="flex gap-1.5 w-max">
                  <FormField
                    control={form.control}
                    name="timeFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tidspunkt</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00:00"
                            className="max-w-[65px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="mt-[38px]">-</p>
                  <FormField
                    control={form.control}
                    name="timeTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="opacity-0">Tidspunkt</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00:00"
                            className="max-w-[65px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-5 w-max">
                  <FormField
                    control={form.control}
                    name="participants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Antal deltagere</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="40"
                            {...field}
                            className="max-w-[115px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {(currentValues.category === "hundetræning" ||
                    currentValues.category === "jagt" ||
                    currentValues.category === "") && (
                    <FormField
                      control={form.control}
                      name="dogs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Antal hunde</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="8"
                              {...field}
                              className="max-w-[115px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pris</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="500"
                          {...field}
                          className="max-w-[115px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokation</FormLabel>
                    <FormControl>
                      {isLoaded && (
                        <Autocomplete
                          onLoad={onLoad}
                          fields={["place_id", "formatted_address"]}
                          onPlaceChanged={onPlaceChanged}
                        >
                          <Input placeholder="Adresse" {...field} />
                        </Autocomplete>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beskrivelse</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Skriv beskrivelse her..."
                        className="resize-none min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      Vælg et billede, der er under 6mb. Billeder i 16:9 format
                      virker bedst.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-5">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full items-center"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CalendarPlus className="mr-2 h-4 w-4" />
                )}
                <span>Opret Aktivitet</span>
              </Button>
            </div>
          </form>
        </Form>
      </Box>
      <Box maxWidth={"w-full hidden max-w-[570px] lg:block"} isOuterBox={true}>
        <ActivityPreview
          currentValues={currentValues}
          image={image}
          position={position}
        />
      </Box>
    </section>
  );
}
