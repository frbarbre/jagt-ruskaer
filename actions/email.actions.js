"use server";

import { Resend } from "resend";
import Newsletter from "../email/NewsLetter";
import OrderConfirmation from "../email/OrderConfirmation";
import ActivityChange from '../email/ActivityChange'
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNewsletter({ title, subtitle, message, image }) {

  // Getting the recipients from the database
  const cookieStore = new cookies();
  const supabase = createClient(cookieStore);


  // Creating an array of recipients for the newsletter
  const { data } = await supabase
    .from("profiles")
    .select("wantNewsletter, email")
    .eq("wantNewsletter", true);

  const emailArr = data.map((item) => item.email);


  // Sending the actual newsletter to the recipients
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

export async function sendOrderConfirmation({
  activity,
  clients,
  price,
  name,
  email,
}) {
  try {
    await resend.emails.send({
      from: "Ruskær Jagtforening <contact@ruskaer.frederikbarbre.dk>",
      to: email,
      subject: "Ordrebekræftelse",
      reply_to: "fr.barbre@gmail.com",
      react: OrderConfirmation({
        activity: activity,
        clients: clients,
        price: price,
        name: name,
      }),
    });
    console.log("Email sent");
  } catch (error) {
    console.log("Error sending email", error);
  }
}

export async function sendActivityChange({ title, date, image, link, activityId }) {

  const cookieStore = new cookies();
  const supabase = createClient(cookieStore);

  // TODO - must be finished
  // const { data } = await supabase
  //   .from('registrations')
  //   .select('*')
  //   .eq('activityId', activityId);

  // const emailArr = data.map((item) => item.email);



  try {
    await resend.emails.send({
      from: "Ruskær Jagtforening <contact@ruskaer.frederikbarbre.dk>",
      to: email,
      subject: "Ændring i begivenhed",
      reply_to: "fr.barbre@gmail.com",
      react: ActivityChange({
        title: title,
        date: date,
        image: image,
        link: link,
      }),
    });
    console.log("Email sent");
  } catch (error) {
    console.log("Error sending email", error);
  }
}