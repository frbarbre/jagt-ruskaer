"use client";

import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RealtimeProvider({ children, session }) {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(getCurrentDateFormatted());

  function getCurrentDateFormatted() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
  }

  setTimeout(() => {
    setCurrentTime(getCurrentDateFormatted());
  }, 1000);

  async function removeReservation() {
    const { error } = await supabase
      .from("registrations")
      .delete()
      .eq("isPayed", false)
      .eq("user_id", session.user.id)
      .lt("expireDate", currentTime);
    if (error) {
      console.log(error);
    }
  }

  if (session) {
    removeReservation();
  }

  useEffect(() => {
    const channel = supabase
      .channel("realtime-db")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return <>{children}</>;
}
