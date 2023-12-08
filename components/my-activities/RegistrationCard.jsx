import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ActivityCard from "../shared/ActivityCard";

export default async function RegistrationCard({ registration }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("activities")
    .select()
    .eq("id", registration.activity_id)
    .single();

  if (error) {
    console.log(error);
  }
  return (
    <ActivityCard
      activity={data}
      isRegistration={true}
      registration={registration}
    />
  );
}
