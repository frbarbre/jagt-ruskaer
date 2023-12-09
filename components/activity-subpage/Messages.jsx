import Heading from "../shared/Heading";
import { Megaphone, ThumbsUp, Pencil, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Box from "../shared/Box";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default function Messages({ category, messages, currentUser }) {
  const isAdmin = currentUser?.role === "admin";
  const isCategoryAdmin = currentUser?.role === `${category}`;

  const isAuthorized = isAdmin || isCategoryAdmin;

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Vigtige beskeder`} icon={<Megaphone />} />
        {isAuthorized && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Ny besked
          </Button>
        )}
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-3 mt-5">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              currentUser={currentUser}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

function Message({ message, currentUser }) {
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    const formattedDate = date
      .toLocaleDateString("da", options)
      .replace(",", "");
    const formattedDateSplit = formattedDate.split(" ");
    const time = formattedDateSplit[3].replace(".", ":");
    return `${time}, ${formattedDateSplit[0]} ${formattedDateSplit[1]} ${formattedDateSplit[2]}`;
  }

  return (
    <Box className="flex gap-4 justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
        <Avatar className="cursor-pointer self-center justify-self-end z-20 relative md:w-11 md:h-11">
          <AvatarImage src={message.author.avatar_url} />
          <AvatarFallback>
            {message.author.first_name?.[0]}
            {message.author.slast_name?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h2 className="text-[14px] font-semibold">
            {message.author.first_name} {message.author.last_name}
          </h2>
          <p>{message.message}</p>
          <p className="text-[12px] opacity-70 capitalize">
            {formatDate(message.updated_at)}
          </p>
        </div>
      </div>
      {currentUser?.id === message.author.id ? (
        <div className="flex gap-3">
          <Button className="px-2.5" variant="outline">
            <Pencil className="w-4 h-4" />
          </Button>
          <Delete message={message} />
        </div>
      ) : currentUser?.role === "admin" ? (
        <div className="flex gap-3">
          <Button className="px-2.5" variant="outline">
            <Pencil className="w-4 h-4" />
          </Button>
          <Delete message={message} />
          <Like message={message} currentUser={currentUser} />
        </div>
      ) : (
        <Like message={message} currentUser={currentUser} />
      )}
    </Box>
  );
}

function Like({ message, currentUser }) {
  async function likeMessage(FormData) {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const messageId = FormData.get("messageId");
    const userId = FormData.get("userId");

    const { data } = await supabase
      .from("likes")
      .select()
      .eq("message_id", messageId)
      .eq("user_id", userId);

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
        .insert([{ message_id: messageId, user_id: userId }]);

      if (error) {
        console.log(error);
      }
    }
  }

  return (
    <form action={likeMessage}>
      <p>{message.likes.length}</p>
      <input type="hidden" name="messageId" value={message.id} />
      <input type="hidden" name="userId" value={currentUser.id} />
      <Button className="px-2.5" variant="outline">
        <ThumbsUp className="w-4 h-4" />
      </Button>
    </form>
  );
}

function Delete({ message }) {
  async function deleteMessage(FormData) {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const messageId = FormData.get("messageId");

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      console.log(error);
    }
  }

  return (
    <form action={deleteMessage}>
      <input type="hidden" name="messageId" value={message.id} />
      <Button className="px-2.5" variant="outline">
        <Trash2 className="w-4 h-4" />
      </Button>
    </form>
  );
}
