'use client';

import { useEffect, useState, Fragment } from 'react';
import Heading from '../shared/Heading';
import { CalendarDays } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Rss({ xml }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let document = null;
  if (typeof window !== 'undefined') {
    document = new DOMParser().parseFromString(xml, 'text/xml');
  }

  let articles = [];

  if (document) {
    const item = document.querySelectorAll('item');
    for (let i = 0; i < 8; i++) {
      const title = item[i].querySelector('title').textContent;
      const description = item[i].querySelector('description').textContent;
      const link = item[i].querySelector('link').textContent;
      const pubDate = item[i].querySelector('pubDate').textContent;
      const guid = item[i].querySelector('guid').textContent;
      const image = item[i].querySelector('enclosure').getAttribute('url');

      //----------------- DATE --------------------

      // formatting the date
      const pubDateObject = new Date(pubDate);
      let formattedPubDate = pubDateObject.toLocaleDateString('da-DK', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      // splitting the formatted date - parts is now an array
      let parts = formattedPubDate.split(' ');

      // capitalizing the first letter of 'weekday' and 'month'
      parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      parts[3] = parts[3].charAt(0).toUpperCase() + parts[3].slice(1);

      // changing 'den' to 'd.'
      parts[1] = 'd.';

      // joining the parts back together
      formattedPubDate = parts.join(' ');

      //----------------- DATE END --------------------

      // pushing the article to our articles array
      articles.push({
        title,
        description,
        link,
        formattedPubDate,
        guid,
        image,
      });
    }
  }

  return (
    <>
      {isClient && (
        <div className="flex flex-col gap-5 lg:h-[1294px]">
          <ScrollArea>
            <div className="flex flex-col gap-5 sm:pr-4">
              {articles?.map((article) => (
                <Fragment key={article.guid}>
                  <a
                    className="flex gap-5 flex-col sm:flex-row lg:flex-col xl:flex-row"
                    href={article.link}
                    target="_blank"
                  >
                    <img
                      src={article.image}
                      alt=""
                      className="h-44 object-cover rounded-[5px]"
                    />
                    <div className="flex flex-col justify-between gap-5">
                      <h2 className="font-semibold leading-none h-[32px] overflow-hidden">
                        {article.title}
                      </h2>
                      <p className="text-zinc-500 text-sm h-20 overflow-hidden">
                        {article.description}
                      </p>
                      <p className="flex items-center opacity-70 text-xs">
                        <CalendarDays className="h-4 opacity-70 -ml-1" />
                        {article.formattedPubDate}
                      </p>
                    </div>
                  </a>
                  <Separator className="last:hidden" />
                </Fragment>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
}
