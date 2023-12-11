import FilterMenu from "@/components/admin-activities/FilterMenu";
import ActivityCard from "@/components/shared/ActivityCard";
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import { createClient } from "@/utils/supabase/server";
import { CalendarDays } from "lucide-react";
import { cookies } from "next/headers";

export default async function Calender({ searchParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let filter = searchParams.filter;
  let showPast = searchParams.past;
  let search = searchParams.search;
  function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so add 1 and format as 2 digits
    const day = ("0" + date.getDate()).slice(-2); // Format as 2 digits
    return `${year}-${month}-${day}`;
  }

  const today = getToday();

  let query = supabase.from("activities").select();

  if (filter) {
    query = query.eq("category", filter);
  }
  if (showPast !== "true") {
    query = query.gte("date", today);
  }
  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error } = await query.order("date", { ascending: true });

  return (
    <Box isOuterBox={true}>
      <Heading title="Kalender" icon={<CalendarDays />} />
      <FilterMenu searchParams={searchParams} isCalender={true} />
      <div className="grid grid-cols-1 gap-5">
        {data.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </Box>
  );
}
