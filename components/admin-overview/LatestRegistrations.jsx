// SHARED component imports
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import RegistrationCard from "@/components/shared/RegistrationCard";

// UI component import
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// ICON import
import { CalendarPlus } from "lucide-react";

export default function LatestRegistrations({ latReg }) {
  let latestRegs = latReg.map((reg) => {
    return <RegistrationCard key={reg.author.id} reg={reg} />;
  });

  return (
    <Box
      padding={"pb-0 pl-5 pt-5 pr-1"}
      className="flex flex-col gap-5 w-full lg:h-registrations lg:min-h-[400px] lg:max-w-[890px]"
    >
      <Heading title={"Seneste tilmeldinger"} icon={<CalendarPlus />} />
      <ScrollArea>
        <div className="flex flex-col gap-3 pb-3 pr-4">{latestRegs}</div>
      </ScrollArea>
    </Box>
  );
}
