import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import ActivityWindow from "@/components/activity/ActivityWindow";
import Box from "@/components/shared/Box";
import RegistrationForm from "@/components/activity/RegistrationForm";

export default async function Activity({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let mapJSON = null;

  const { data } = await supabase
    .from("activities")
    .select("*, registrations(*)")
    .eq("id", params.id)
    .single();

  if (data?.place_id) {
    const mapUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_API_KEY}&place_id=${data.place_id}`;
    const mapData = await fetch(mapUrl);
    mapJSON = await mapData.json();
  }

  return (
    <section className="flex gap-6 w-full flex-col lg:flex-row">
      <ActivityWindow
        values={data}
        position={mapJSON?.result.geometry.location}
      />
      <Box className="w-full lg:max-w-[530px]" isOuterBox={true}>
        <RegistrationForm
          date={data.date}
          pricePerPerson={data.price}
          maxDogs={data.dogs}
          maxParticipants={data.participants}
          activityId={data.id}
          activityCategory={data.category}
        />
      </Box>
    </section>
  );
}
