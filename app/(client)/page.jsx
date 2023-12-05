import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import User from "@/components/User";
import { redirect } from "next/navigation";
import Rss from "@/components/home/Rss";
import Box from "@/components/shared/Box";
import Current from '@/components/home/Current'


export default async function Home({ searchParams }) {
  // Initializing SupaBase with cookies to authorize the user from the server
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Fetching data from SupaBase
  const { data } = await supabase.from("profiles").select();

  // Fetching the current users data, with the getSession method from Supabase
  const {
    data: { session },
    // getSession() returns the currently logged in user object(s)
  } = await supabase.auth.getSession();

  
  //------------- DATA FOR 'AKTUELT' -------------

  // attempting to get activity from supabase

  // fetch data
  // map through data
  // sort by 'date'
  // if value of date < new Date()
  // keep activities with date > new Date()
  // show activity with lowest date value

  // const { data: activitydata } = await supabase.from("activities").select()
  // console.log(activitydata)

  //----------------------------------------------


  // -------------- RSS FEED FROM DJ ----------------

  // fetching the rss feed - using rssData and not data as in example
  const rssData = await fetch("https://jaegerforbundet.dk/rss/", {
    cache: "no-store",
  });

  const xml = await rssData.text();

  // ------------------ RSS END ------------------

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
    <div className="flex gap-6">
      <Box className="flex-1 w-full flex flex-col gap-20 items-center">
        hello
        <Current />
      </Box>
      <Box className="flex w-full max-w-[526px] min-h-screen flex-col items-center justify-between p-5">
        <Rss xml={xml} />
      </Box>
    </div>
  );
}
