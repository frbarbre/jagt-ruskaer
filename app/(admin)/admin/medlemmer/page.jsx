import { cookies } from "next/headers";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { createClient } from "@/utils/supabase/server";
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import { User } from "lucide-react";

async function getData() {
  // Fetch data from your API here.
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("profiles")
    .select()
    .order("created_at", { ascending: false });

  return data.map((user) => {
    return {
      avatar: user.avatar_url,
      id: user.id,
      email: user.email,
      fornavn: user.first_name,
      efternavn: user.last_name,
      telefon: user.phone_number,
      admin: user.isSuperAdmin,
      rolle: user.role,
      nyhedsbrev: user.wantNewsletter,
    };
  });
}

export default async function Users() {
  const data = await getData();

  return (
    <Box isOuterBox={true}>
      <Heading title={"Medlemmer"} icon={<User />} />
      <div className="mx-auto mt-5">
        <DataTable columns={columns} data={data} />
      </div>
    </Box>
  );
}
