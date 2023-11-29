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

export default function MobileNav() {
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
      {isMenuOpen && (
        <Accordion
          type="single"
          collapsible
          className="w-full absolute top-[92px] bg-white px-6 h-nav overflow-y-scroll"
        >
          <AccordionItem value="item-1">
            <Link href={'/'} onClick={() => setIsMenuOpen(false)}>
              <AccordionTrigger className="link">Forside</AccordionTrigger>
            </Link>
          </AccordionItem>
          <AccordionItem value="item-2">
            <Link href={'/kalender'} onClick={() => setIsMenuOpen(false)}>
              <AccordionTrigger className="link">Kalender</AccordionTrigger>
            </Link>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Aktiviteter</AccordionTrigger>
            <AccordionContent>
              {activityLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.title}
                  onClick={() => setIsMenuOpen(false)}
                  className="block ml-4 opacity-80"
                >
                  <AccordionTrigger className="link">
                    {link.title}
                  </AccordionTrigger>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <Link href={'/'} onClick={() => setIsMenuOpen(false)}>
              <AccordionTrigger className="link">Indlæg</AccordionTrigger>
            </Link>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Kontakt</AccordionTrigger>
            <AccordionContent>
              {contactLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.title}
                  onClick={() => setIsMenuOpen(false)}
                  className="block ml-4 opacity-80"
                >
                  <AccordionTrigger className="link">
                    {link.title}
                  </AccordionTrigger>
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <Link href={'/'} onClick={() => setIsMenuOpen(false)}>
              <AccordionTrigger className="link">Om os</AccordionTrigger>
            </Link>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
}
