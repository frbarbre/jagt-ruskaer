import EditActivityForm from "@/components/admin-activities/EditActivityForm";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Box from "@/components/shared/Box";
import Registrations from "@/components/admin-activities/Registrations";

export default async function EditActivity({ params, searchParams }) {
  const placeId = searchParams.place_id;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("id", params.id)
    .single();

  const registrations = await supabase
    .from("registrations")
    .select("*, profile:profiles(*)")
    .eq("activity_id", params.id)
    .eq("isPayed", true);

  const registrationUserIds = registrations.data.map(
    (registration) => registration.profile.id
  );

  const { data: profilesData, error: profilesError } = await supabase
    .from("profiles")
    .select()
    .order("first_name", { ascending: true });

  if (profilesError) {
    console.error(profilesError);
  }

  console.log(registrationUserIds);

  let profiles = profilesData;

  if (registrationUserIds.length > 0) {
    profiles = profiles.filter(
      (profile) => !registrationUserIds.includes(profile.id)
    );
  }

  const currentDogs = registrations.data.reduce(
    (acc, registration) => acc + registration.dogs,
    0
  );

  return (
    <section className="flex gap-6 flex-col lg:flex-row">
      <EditActivityForm activity={data} placeId={placeId} />
      <Box maxWidth={"w-full lg:max-w-[570px]"}>
        <Registrations
          activity={data}
          registrations={registrations.data}
          maxParticipants={data.participants}
          profiles={profiles}
          currentDogs={currentDogs}
        />
      </Box>
    </section>
  );
}
