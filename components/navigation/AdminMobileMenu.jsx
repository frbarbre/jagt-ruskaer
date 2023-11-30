'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { AnimatePresence, motion as m } from 'framer-motion';

export default function AdminMobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activityLinks = [
    {
      title: 'Jagt',
      href: '/aktivitet/jagt',
    },
    {
      title: 'Riffelskydning',
      href: '/aktivitet/riffelskydning',
    },
    {
      title: 'Flugtskydning',
      href: '/aktivitet/flugtskydning',
    },
    {
      title: 'Hundetræning',
      href: '/aktivitet/hundetræning',
    },
  ];

  const contactLinks = [
    {
      title: 'Bestyrelsen',
      href: '/',
    },
    {
      title: 'Riffeludvalget',
      href: '/',
    },
    {
      title: 'Hundeudvalget',
      href: '/',
    },
    {
      title: 'Flugtskydningsudvalget',
      href: '/',
    },
    {
      title: 'Nyjægerudvalget',
      href: '/docs/primitives/tabs',
    },
  ];

  return (
    <>
      <button className="md:hidden self-center w-max">
        {isMenuOpen ? (
          <X
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        ) : (
          <Menu
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className=" absolute top-[92px] w-full md:hidden"
          >
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white px-6 h-nav overflow-y-scroll"
            >
              <AccordionItem value="item-1">
                <Link href={'/admin'} onClick={() => setIsMenuOpen(false)}>
                  <AccordionTrigger className="link">Overblik</AccordionTrigger>
                </Link>
              </AccordionItem>

              <AccordionItem value="item-2">
                <Link
                  href={'/admin/aktiviteter'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AccordionTrigger className="link">
                    Aktiviteter
                  </AccordionTrigger>
                </Link>
              </AccordionItem>

              <AccordionItem value="item-3">
                <Link
                  href={'/admin/medlemmer'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AccordionTrigger className="link">
                    Medlemmer
                  </AccordionTrigger>
                </Link>
              </AccordionItem>

              <AccordionItem value="item-4">
                <Link
                  href={'/admin/nyhedsbrev'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AccordionTrigger className="link">
                    Nyhedsbrev
                  </AccordionTrigger>
                </Link>
              </AccordionItem>
            </Accordion>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
