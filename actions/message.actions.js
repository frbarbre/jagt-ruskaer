"use server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function likeMessage({ currentUser, message }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("likes")
    .select()
    .eq("message_id", message.id)
    .eq("user_id", currentUser.id);

  if (data.length > 0) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("id", data[0].id);

    if (error) {
      console.log(error);
    }
  } else {
    const { error } = await supabase
      .from("likes")
      .insert([{ message_id: message.id, user_id: currentUser.id }]);

    if (error) {
      console.log(error);
    }
  }
}

export async function deleteMessage({ message }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", message.id);

  if (error) {
    console.log(error);
  }
}
