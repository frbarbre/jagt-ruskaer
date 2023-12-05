"use server";

import { Resend } from "resend";
import Newsletter from "../email/NewsLetter";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter({ title, subtitle, message, image }) {
  const cookieStore = new cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("profiles")
    .select("wantNewsletter, email")
    .eq("wantNewsletter", true);

  const emailArr = data.map((item) => item.email);

  try {
    await resend.emails.send({
      from: "Ruskær Jagtforening <contact@ruskaer.frederikbarbre.dk>",
      to: emailArr,
      subject: "Nyhedsbrev fra Ruskær Jagtforening",
      reply_to: "fr.barbre@gmail.com",
      react: Newsletter({
        image: image,
        title: title,
        subtitle: subtitle,
        message: message,
      }),
    });
    console.log("Email sent");
  } catch (error) {
    console.log("Error sending email", error);
  }
}
