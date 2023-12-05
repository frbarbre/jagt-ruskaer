"use client";

import { useEffect, useState, Fragment } from "react";
import Heading from "../shared/Heading";
import { Newspaper } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Rss({ xml }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let document = null;
  if (typeof window !== "undefined") {
    document = new DOMParser().parseFromString(xml, "text/xml");
  }

  let articles = [];

  if (document) {
    const item = document.querySelectorAll("item");
    for (let i = 0; i < 8; i++) {
      const title = item[i].querySelector("title").textContent;
      const description = item[i].querySelector("description").textContent;
      const link = item[i].querySelector("link").textContent;
      const pubDate = item[i].querySelector("pubDate").textContent;
      const guid = item[i].querySelector("guid").textContent;
      const image = item[i].querySelector("enclosure").getAttribute("url");
      

      //----------------- DATE --------------------

      // formatting the date
      const pubDateObject = new Date(pubDate);
      let formattedPubDate = pubDateObject.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      
      // splitting the formatted date - parts is now an array
      let parts = formattedPubDate.split(' ')

      // capitalizing the first letter of 'weekday' and 'month'
      parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      parts[3] = parts[3].charAt(0).toUpperCase() + parts[3].slice(1);

      // changing 'den' to 'd.'
      parts[1] = 'd.';

      // joining the parts back together
      formattedPubDate = parts.join(' ');

      //----------------- DATE END --------------------


      // pushing the article to our articles array
      articles.push({ title, description, link, formattedPubDate, guid, image });
    }
  }




  return (
    <>
      {isClient && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <Heading title={"Sidste nyt fra DJ"} icon={<Newspaper />} />
            <Button variant={"outline"}>Se alle</Button>
          </div>
          {articles?.map((article) => (
            <Fragment key={article.guid}>
              <a className="flex gap-5" href={article.link} target="_blank">
                <img
                  src={article.image}
                  alt=""
                  className="h-44 object-cover rounded-[5px]"
                />
                <div className="flex flex-col justify-between gap-5">
                  <h2 className="font-semibold leading-none">
                    {article.title}
                  </h2>
                  <p className="text-slate-500 text-sm h-20 overflow-hidden">
                    {article.description}
                  </p>
                  <p className="text-xs">{article.formattedPubDate}</p>
                </div>
              </a>
              <Separator className="last:hidden" />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
