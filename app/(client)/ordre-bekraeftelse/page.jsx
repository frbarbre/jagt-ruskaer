import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CreditCard, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Receipt from "@/components/order-confirmation/Receipt";
import { sendOrderConfirmation } from "../../../actions/email.actions";

export default async function OrderConfirmation({ searchParams }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!searchParams.activity_id) {
    redirect("/");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const profile = await supabase
    .from("profiles")
    .select()
    .eq("id", session.user.id)
    .single();

  const { data, error } = await supabase
    .from("activities")
    .select()
    .eq("id", searchParams.activity_id)
    .single();

  if (error) {
    console.log(error);
  }

  return (
    <Box>
      <div className="flex justify-between items-center flex-wrap">
        <Heading title={"Ordrebekræftelse"} icon={<CreditCard />} />
        <Link href={"/"}>
          <Button>Til forsiden</Button>
        </Link>
      </div>
      <div className="mt-8 flex flex-col items-center w-full mb-8">
        <div className="flex flex-col max-w-[560px] w-full">
          <h1 className="text-[28px] font-semibold">
            Tak {profile.data.first_name}!
          </h1>
          <p className="my-3">
            Du er hermed tilmeldt aktiviteten “{data.title}”. Du modtager også
            din kvittering på mail.
          </p>
          <Box>
            <Heading
              className={"mb-5"}
              title={"Kvittering"}
              icon={<ScrollText />}
            />
            <Receipt
              activity={data}
              name={profile.data.first_name}
              email={profile.data.email}
            />
          </Box>
        </div>
      </div>
    </Box>
  );
}
