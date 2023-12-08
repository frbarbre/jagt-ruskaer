import Box from "./Box";
import { CalendarDays, Clock } from "lucide-react";

export default function EventCard({ activity }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    let formattedDate = date.toLocaleString("da-DK", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    let words = formattedDate.split(" ");
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1) + " d.";
    words[2] = words[2].charAt(0).toUpperCase() + words[2].slice(1);
    return words.join(" ");
  }

  let timeFrom =
    activity.timeFrom.split(":")[0] + ":" + activity.timeFrom.split(":")[1];

  let timeTo = null;

  if (activity.timeTo) {
    timeTo =
      activity.timeTo.split(":")[0] + ":" + activity.timeTo.split(":")[1];
  }

  return (
    <Box className="flex items-center gap-3">
      <img
        src={activity.image}
        alt={activity.title}
        className="w-[80px] h-[80px] object-cover rounded-md"
      />
      <article className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold">{activity.title}</h3>

        <div className="flex gap-1 items-center opacity-70">
          <CalendarDays className="w-4 h-4" />
          <p className="text-[12px]">{formatDate(activity.date)}</p>
        </div>

        <div className="flex gap-1 items-center opacity-70">
          <Clock className="w-4 h-4" />
          <p className="capitalize text-[12px]">
            {timeFrom}
            {timeTo && ` - ${timeTo}`}
          </p>
        </div>
      </article>
    </Box>
  );
}
