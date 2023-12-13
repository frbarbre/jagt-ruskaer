"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Rabbit, Dog, Target, Crosshair } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

//
const components = [
  {
    title: "Bestyrelsen",
    href: "/",
    description: "Bestyrelser er flotte i tøjet og har styr på det hele.",
  },
  {
    title: "Riffeludvalget",
    href: "/",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Hundeudvalget",
    href: "/",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Flugtskydningsudvalget",
    href: "/",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Nyjægerudvalget",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
];

const activityTexts = [
  {
    activity: "jagt",
    text: "Naturoplevelser og spor i skovens dyb: Del jagtglæden med os",
  },
  {
    activity: "riffelskydning",
    text: "Præcision og fællesskab: Udforsk riffelskydning med os",
  },
  {
    activity: "flugtskydning",
    text: "Tag sikringen af: Fællesskab og sjov ved flugtskydningsbanen",
  },
  {
    activity: "hundetræning",
    text: "Styrk båndet med din jagtkammeret",
  },
];

export default function DesktopMenu() {
  const [activeActivity, setActiveActivity] = useState("jagt");
  const activityText = activityTexts.find((a) => a.activity === activeActivity);

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Forside
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/kalender" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Kalender
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Aktiviteter</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4 relative flex items-end min-h-[159px]">
                <NavigationMenuLink asChild>
                  <a
                    className="flex select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div
                      className="absolute inset-0 rounded-sm h-full flex items-center justify-center bg-cover bg-center"
                      style={{
                        backgroundImage: `url('/${activeActivity}.png')`,
                      }}
                    />
                    <div className="bg-black/20 inset-0 absolute rounded-sm" />
                    <div className="relative z-10">
                      {activeActivity === "jagt" ? (
                        <Rabbit className="h-6 w-6" color="#FFF" />
                      ) : activeActivity === "riffelskydning" ? (
                        <Crosshair className="h-6 w-6" color="#FFF" />
                      ) : activeActivity === "flugtskydning" ? (
                        <Target className="h-6 w-6" color="#FFF" />
                      ) : activeActivity === "hundetræning" ? (
                        <Dog className="h-6 w-6" color="#FFF" />
                      ) : (
                        <Rabbit className="h-6 w-6" color="#FFF" />
                      )}
                      <div className="mb-2 mt-4 text-lg font-medium capitalize text-white">
                        {activeActivity}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground text-zinc-200 overflow-hidden">
                        {activityText.text}
                      </p>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/jagt"
                title="Jagt"
                onMouseOver={() => setActiveActivity("jagt")}
              >
                {activityTexts[0].text}
              </ListItem>
              <ListItem
                href="/riffelskydning"
                title="Riffelskydning"
                onMouseOver={() => setActiveActivity("riffelskydning")}
              >
                {activityTexts[1].text}
              </ListItem>
              <ListItem
                href="/flugtskydning"
                title="Flugtskydning"
                onMouseOver={() => setActiveActivity("flugtskydning")}
              >
                {activityTexts[2].text}
              </ListItem>
              <ListItem
                href="/hundetraening"
                title="Hundetræning"
                onMouseOver={() => setActiveActivity("hundetræning")}
              >
                {activityTexts[3].text}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Indlæg
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Kontakt</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Om os
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({ className, title, onMouseOver, children, ...props }) {
  return (
    <li onMouseOver={onMouseOver}>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
ListItem.displayName = "ListItem";
