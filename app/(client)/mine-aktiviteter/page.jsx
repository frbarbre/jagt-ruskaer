import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import RegistrationCard from "@/components/my-activities/RegistrationCard";
import { Plus } from "lucide-react";

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
      <div className="flex flex-col gap-4">
        {data.length > 0 ? (
          <>
            {data.map((registration) => (
              <RegistrationCard
                key={registration.id}
                registration={registration}
              />
            ))}
          </>
        ) : (
          <div className="my-6 flex flex-col justify-center items-center gap-4">
            <p>Du er ikke tilmeldt nogen aktiviteter</p>
            <Link href={"/kalender"}>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Find aktiviteter
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Box>
  );
}
