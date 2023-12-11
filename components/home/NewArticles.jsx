// 'Nyeste indlæg' component for the homepage

// SHARED component imports
import Box from "@/components/shared/Box";
import Heading from "@/components/shared/Heading";
import Article from "@/components/shared/Article";

// UI component imports
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// ICON imports
import { Mails, HelpingHand, Info, Image } from "lucide-react";

export default function NewArticles() {
  const mockArticles = [
    {
      category: "Guide",
      icon: <HelpingHand />,
      img: "/riffelproeve.png",
      title: "Guide til haglskydeprøve",
      description:
        "Skal du til haglskydeprøve - se her for at få en fornemmelse.",
    },
    {
      category: "Information",
      icon: <Info />,
      img: "/praemie.png",
      title: "Jagt og regulering af råvildt",
      description:
        "Husk at indsamle haler/fødder fra råvildt til foreningens konkurrence.",
    },
    {
      category: "Galleri",
      icon: <Image />,
      img: "/deterenhjort.png",
      title: "Se årets bukke 2023",
      description:
        "Se billederne af disse prægtige og ikke mindst, nu, utætte klovdyr.",
    },
  ];

  let articles = mockArticles.map((article) => {
    return <Article key={article.title} article={article} />;
  });
  return (
    <Box
      className="w-full flex flex-col gap-3 pb-1 overflow-auto px-0 lg:max-w-[890px]"
      isOuterBox={true}
    >
      <div className="sm:px-5">
        <Heading title={"Nyeste indlæg"} icon={<Mails />} />
      </div>
      <ScrollArea>
        <div className="flex gap-5 pb-4 sm:px-5">{articles}</div>
        <ScrollBar orientation="horizontal" className="sm:px-5" />
      </ScrollArea>
    </Box>
  );
}
