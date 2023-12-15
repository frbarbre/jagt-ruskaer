import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import ActivityCalender from "@/components/activity-subpage/ActivityCalender";
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import { Image } from "lucide-react";
import ImageSlider from "@/components/activity-subpage/ImageSlider";
import Messages from "@/components/activity-subpage/Messages";
import { LogIn, SmilePlus } from "lucide-react";
import { gallery } from "@/constants/index.js";

export default async function ActivityPage({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const routes = ["jagt", "flugtskydning", "hundetraening", "riffelskydning"];

  const category =
    params.activity === "hundetraening" ? "hundetræning" : params.activity;

  if (!routes.includes(params.activity)) {
    return (
      <div className="mx-auto w-max flex gap-4 mt-8 flex-col items-center">
        <p className="text-[28px] font-semibold">Siden findes ikke😥</p>
        <Link href="/">
          <Button>Til forsiden</Button>
        </Link>
      </div>
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("messages")
    .select("*, author:profiles(*), likes(*, author:profiles(*)))")
    .eq("category", category)
    .order("updated_at", { ascending: false });
  if (error) {
    console.log(error);
  }

  const currentUser = await supabase
    .from("profiles")
    .select()
    .eq("id", session?.user?.id)
    .single();

  if (currentUser.error) {
    console.log(currentUser.error);
  }

  function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so add 1 and format as 2 digits
    const day = ("0" + date.getDate()).slice(-2); // Format as 2 digits
    return `${year}-${month}-${day}`;
  }

  const today = getToday();

  const activities = await supabase
    .from("activities")
    .select()
    .eq("category", category)
    .gte("date", today)
    .order("date", { ascending: true });

  if (activities.error) {
    console.log(activities.error);
  }

  // images

  let images = gallery[category];

  return (
    <div className="flex gap-6 flex-col-reverse lg:flex-row h-full grid-container">
      <div className="flex-1 flex flex-col-reverse lg:flex-col gap-6 lg:max-w-[866px] h-full">
        <Box className={"flex flex-col gap-5"} isOuterBox={true}>
          <Heading title={`Galleri`} icon={<Image />} />
          <ImageSlider images={images} />
        </Box>
        <Box
          className={`lg:min-h-messages lg:max-h-[400px] sm:pr-1`}
          padding={"sm:p-5"}
          isOuterBox={true}
        >
          <Messages
            category={category}
            messages={data}
            currentUser={currentUser.data}
            session={session}
          />
        </Box>
      </div>
      <ActivityCalender comingEvents={activities.data} category={category} />
    </div>
  );
}
