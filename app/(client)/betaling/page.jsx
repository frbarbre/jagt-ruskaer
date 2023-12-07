import PaymentClient from "@/components/payment/PaymentClient";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Payment({ searchParams }) {
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
    .select("activity_id, id")
    .eq("user_id", session.user.id);

  if (error) {
    console.log(error);
  }
  const currentUserActivityRegistrations = data.map((item) => item.activity_id);

  return (
    <>
      <PaymentClient
        currentUserActivityRegistrations={currentUserActivityRegistrations}
        searchParams={searchParams}
      />
    </>
  );
}
