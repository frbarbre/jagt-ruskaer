import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Rss from "@/components/home/Rss";
import Box from "@/components/shared/Box";
import Current from "@/components/home/Current";
import { Fragment, Suspense } from "react";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import NewArticles from "@/components/home/NewArticles";
import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default async function Home({ searchParams }) {
  // Initializing SupaBase with cookies to authorize the user from the server
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetching the current users data, with the getSession method from Supabase
  const {
    data: { session },
    // getSession() returns the currently logged in user object(s)
  } = await supabase.auth.getSession();

  //------------- DATA FOR 'AKTUELT' AND 'KOMMENDE BEGIVENHEDER' -------------

  // attempting to get activity from supabase

  function getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based, so add 1 and format as 2 digits
    const day = ("0" + date.getDate()).slice(-2); // Format as 2 digits
    return `${year}-${month}-${day}`;
  }

  const today = getToday();

  let query = await supabase
    .from("activities")
    .select()
    .gte("date", today)
    .order("date", { ascending: true })
    .limit(6);

  let currentEvent = null;
  // data of the closest, future event for 'Aktuelt'
  if (query?.data) {
    currentEvent = query?.data?.[0];
  }

  let comingEvents = null;
  // data of the 5 closest, future events following 'currentEvent'
  if (query?.data?.length > 1) {
    comingEvents = query?.data?.slice(1);
  }

  //----------------------------------------------

  let isSuperAdmin = null;

  // Checking if the user is logged in
  if (session) {
    // Checking if the user is a Super Admin
    const { data } = await supabase
      .from("profiles")
      .select("isSuperAdmin, onboarded")
      .eq("id", session.user.id);

    if (!data[0].onboarded) {
      redirect("/onboarding");
    }
    // Setting the isSuperAdmin variable to true or false
    isSuperAdmin = data[0].isSuperAdmin;
  }

  return (
    <div className="flex gap-6 flex-col lg:flex-row max-w-screen">
      {/* The left-hand side of the Home page - 'Aktuelt', 'Kommende begivenheder', 'Nyeste indlæg' */}
      <div className="flex-1 w-full flex flex-col gap-6 items-center">
        {currentEvent && <Current currentEvent={currentEvent} />}
        {comingEvents && <UpcomingEvents comingEvents={comingEvents} />}
        <NewArticles />
      </div>
      {/* The whole RSS feed on the right-hand side of the Home page */}
      <Box
        isOuterBox={true}
        className="flex w-full lg:max-w-[526px] min-h-screen flex-col items-center gap-3 sm:pr-1 sm:pb-0 sm:pl-5 sm:pt-5"
        padding={"sm:pr-1 sm:pb-0 sm:pl-5 sm:pt-5"}
      >
        <div className="flex justify-between items-center w-full">
          <Heading title={"Sidste nyt fra DJ"} icon={<Newspaper />} />
          <a
            href="https://www.jaegerforbundet.dk/om-dj/dj-medier/nyhedsarkiv/"
            target="_blank"
            rel="noopener noreferrer"
            className="pr-4"
          >
            <Button variant={"outline"}>Se alle</Button>
          </a>
        </div>
        <Suspense fallback={<RssSkeleton />}>
          <RssFeed />
        </Suspense>
      </Box>
    </div>
  );
}

function RssSkeleton() {
  return (
    <div className="flex flex-col gap-5 h-[1294px] w-full">
      <ScrollArea>
        <div className="flex flex-col gap-5 sm:pr-4 pb-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <Fragment key={index}>
              <div className="flex sm:flex-row flex-col gap-5 lg:flex-col xl:flex-row">
                <Skeleton
                  className={
                    "h-[176px] w-full sm:max-w-[270px] lg:max-w-none xl:max-w-[270px]"
                  }
                />
                <div className="flex flex-col gap-5  sm:mt-0 w-full sm:justify-between xl:w-[193px]">
                  <Skeleton
                    className={"h-[16px] w-[260px] xl:w-full xl:h-[32px]"}
                  />
                  <Skeleton className={"h-[80px] w-full"} />
                  <Skeleton className={"h-[16px] w-[180px]"} />
                </div>
              </div>
              <Separator className="last:hidden" />
            </Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

async function RssFeed() {
  // -------------- RSS FEED FROM DJ ----------------

  // fetching the rss feed - using rssData and not data as in example
  const rssData = await fetch("https://www.jaegerforbundet.dk/rss?t=1223", {
    cache: "no-store",
  });

  const xml = await rssData.text();

  // ------------------ RSS END ------------------

  return <Rss xml={xml} />;
}
