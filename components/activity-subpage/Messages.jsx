import Heading from "../shared/Heading";
import {
  Megaphone,
  ThumbsUp,
  Pencil,
  Trash2,
  Heart,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { SmilePlus, LogIn } from "lucide-react";
import Box from "../shared/Box";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import EditMessage from "./EditMessage";
import NewMessage from "./NewMessage";
import Link from "next/link";
import Like from "./Like";
import Delete from "./Delete";

export default function Messages({ category, messages, currentUser, session }) {
  const isAdmin = currentUser?.role === "admin";
  const isCategoryAdmin = currentUser?.role === `${category}`;

  const isAuthorized = isAdmin || isCategoryAdmin;

  return (
    <>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3 pr-5">
        <Heading title={`Vigtige beskeder`} icon={<Megaphone />} />
        {isAuthorized && (
          <NewMessage category={category} currentUser={currentUser} />
        )}
      </div>
      {session ? (
        <ScrollArea>
          <div className="flex flex-col gap-3 lg:min-h-[322px] sm:pr-4 lg:h-innerMessage">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                currentUser={currentUser}
                category={category}
              />
            ))}
            <div className="hidden lg:block h-5 text-[5px] text-white">
              hello
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div className="lg:min-h-[360px] lg:h-innerMessage h-full flex justify-center items-center flex-col gap-5 my-6 lg:my-0">
          <p>Du skal være logget ind for at se vigtige beskeder</p>
          <div className="flex gap-3">
            <Link href="/login">
              <Button>
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline">
                <SmilePlus className="w-4 h-4 mr-2" />
                Bliv medlem
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

async function Message({ message, currentUser, category }) {
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

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("likes")
    .select()
    .eq("message_id", message.id)
    .eq("user_id", currentUser.id);

  return (
    <Box className="flex gap-4 justify-between sm:items-center flex-col sm:flex-row relative">
      <div className="flex gap-3 items-center flex-wrap">
        <div
          className={`h-2.5 w-2.5 sm:right-0 rounded-full absolute top-1/2 -translate-y-1/2 sm:translate-y-0 right-5 sm:relative ${
            data.length > 0
              ? "bg-white"
              : message.user_id === currentUser.id
              ? "bg-white"
              : "bg-blue-600"
          }`}
        />

        <Avatar className="cursor-pointer self-center justify-self-end z-20 relative md:w-11 md:h-11">
          <AvatarImage src={message.author.avatar_url} />
          <AvatarFallback>
            {message.author.first_name?.[0]}
            {message.author.slast_name?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 justify-center sm:justify-start">
          <h2 className="text-[14px] font-semibold">
            {message.author.first_name} {message.author.last_name}
          </h2>
          <p>{message.message}</p>
          <p className="text-[12px] opacity-70 capitalize">
            {formatDate(message.updated_at)}{" "}
            {message.updated_at !== message.created_at && "(redigeret)"}
          </p>
        </div>
      </div>
      {currentUser?.id === message.author.id ? (
        <div className="flex gap-3">
          <EditMessage
            message={message}
            currentUser={currentUser}
            category={category}
          />
          <Delete message={message} />
        </div>
      ) : currentUser?.role === "admin" ? (
        <div className="flex gap-3">
          <EditMessage
            message={message}
            currentUser={currentUser}
            category={category}
          />
          <Delete message={message} />
          <Like message={message} currentUser={currentUser} data={data} />
        </div>
      ) : (
        <Like message={message} currentUser={currentUser} data={data} />
      )}
    </Box>
  );
}
