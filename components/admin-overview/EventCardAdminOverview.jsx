


// Imports
import Box from "@/components/shared/Box";

// ICON component imports
import { CalendarDays, Clock } from "lucide-react";



// The component

export default function EventCardAdminOverview({ activity }) {


    // Formatting the date
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

    let timeFrom = activity?.timeFrom?.split(":")[0] + ":" + activity?.timeFrom?.split(":")[1];

    let timeTo = null;

    if (activity?.timeTo) {
        timeTo = activity.timeTo.split(":")[0] + ":" + activity.timeTo.split(":")[1];
    }

    // The difference between 'EventCard' and 'EventCardAdminOverview' is 
    // 1. that everything in the return statement is wrapped in a div and not the Box component
    // 2. img height and width is 66px and not 80px
    // 3. the gap in the article element is 1.5 and not 2
    return (
        <div className="flex items-center gap-3">
            <img
            src={activity?.image}
            alt={activity?.title}
            className="w-[66px] h-[66px] object-cover rounded-md"
            />
            <article className="flex flex-col gap-1.5">
                <h3 className="text-[14px] font-semibold">{activity?.title}</h3>

                <div className="flex gap-1 items-center opacity-70">
                    <CalendarDays className="w-4 h-4" />
                    <p className="text-[12px]">{formatDate(activity?.date)}</p>
                </div>

                <div className="flex gap-1 items-center opacity-70">
                    <Clock className="w-4 h-4" />
                    <p className="capitalize text-[12px]">
                        {timeFrom}
                        {timeTo && ` - ${timeTo}`}
                    </p>
                </div>
            </article>
        </div>
    );
}
