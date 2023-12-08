import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MyActivities() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data, error } = await supabase
    .from("registrations")
    .select()
    .eq("user_id", session.user.id)
    .eq("isPayed", true);

  if (error) {
    console.log(error);
  }

  console.log(data);
  return (
    <Box>
      <div className="flex justify-between items-center">
        <Heading title={"Mine aktiviteter"} icon={<CalendarDays />} />
        <Link href={"/kalender"}>
          <Button variant="outline">Gå til kalender</Button>
        </Link>
      </div>
      <p className="my-3">
        Her er en oversigt over dine tilmeldte aktiviteter.
      </p>
    </Box>
  );
}
