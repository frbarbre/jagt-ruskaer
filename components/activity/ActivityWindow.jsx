"use client";

import Box from "../shared/Box";
import Heading from "../shared/Heading";
import {
  Coins,
  DogIcon,
  MapPinned,
  User,
  Rabbit,
  Target,
  Dog,
  Crosshair,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import GoogleMaps from "../shared/GoogleMaps";

export default function ActivityWindow({ values, position }) {
  let participants = 0;

  for (let i = 0; i < values.registrations.length; i++) {
    participants += values.registrations[i].participants;
  }

  let dogs = 0;

  for (let i = 0; i < values.registrations.length; i++) {
    dogs += values.registrations[i].dogs;
  }

  const category =
    values.category === "jagt" ? (
      <Rabbit className="w-4 h-4" />
    ) : values.category === "flugtskydning" ? (
      <Target className="w-4 h-4" />
    ) : values.category === "hundetræning" ? (
      <Dog className="w-4 h-4" />
    ) : values.category === "riffelskydning" ? (
      <Crosshair className="w-4 h-4" />
    ) : null;

  function formatDate(dateString) {
    if (dateString) {
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
    } else return null;
  }

  let timeFrom = null;

  if (values.timeFrom) {
    const timeFromSplit = values.timeFrom.split(":");
    timeFrom = timeFromSplit[0] + ":" + timeFromSplit[1];
  }

  let timeTo = null;

  if (values.timeTo) {
    const timeToSplit = values.timeTo.split(":");
    timeTo = timeToSplit[0] + ":" + timeToSplit[1];
  }
  return (
    <section className="flex gap-5 flex-col w-full lg:max-w-[866px]">
      <Box className="flex gap-5 flex-col">
        <img
          src={values?.image}
          alt="image"
          className="w-full h-[258px] object-cover rounded-md"
        />

        <section className="flex justify-between items-end">
          <article className="flex flex-col gap-2">
            <Heading icon={category} title={values.category} isMedium={true} />

            <h1 className="text-[20px] font-semibold">{values.title}</h1>

            <p className="text-[12px] opacity/70 min-h-[40px] max-w-[600px] white-space-preline w-full overflow-hidden break-before-right mb-1">
              {values.description}
            </p>

            <div>
              <div className="flex gap-1 items-center opacity-70 mb-2">
                <MapPin className="w-4 h-4" />
                <p className="text-[12px]">{values.location}</p>
              </div>

              <div className="flex gap-1 items-center opacity-70 mb-2">
                <CalendarDays className="w-4 h-4" />
                <p className="text-[12px]">{formatDate(values.date)}</p>
              </div>

              <div className="flex gap-1 items-center opacity-70">
                <Clock className="w-4 h-4" />
                <p className="capitalize text-[12px]">
                  {timeFrom}
                  {timeTo && ` - ${timeTo}`}
                </p>
              </div>
            </div>
          </article>
          <article className="flex flex-col gap-2">
            {values.dogs && (
              <article>
                <div className="flex items-center opacity-70 justify-end">
                  <h4 className="text-[10px]">Hunde</h4>
                  <DogIcon className="w-4 h-4 ml-1" />
                </div>
                <p className="font-semibold text-[10px] text-right mt-1">
                  {dogs}/{values.dogs}
                </p>
              </article>
            )}
            {values.participants && (
              <article>
                <div className="flex items-center opacity-70 justify-end">
                  <h4 className="text-[10px]">Deltagere</h4>
                  <User className="w-4 h-4 ml-1" />
                </div>
                <p className="font-semibold text-[10px] text-right mt-1">
                  {participants}/{values.participants}
                </p>
              </article>
            )}

            <article>
              <div className="flex items-center opacity-70 justify-end">
                <h4 className="text-[10px]">Pris</h4>
                <Coins className="w-4 h-4 ml-1" />
              </div>
              <p className="font-semibold text-[10px] text-right mt-1">
                {!values.price || values.price === "0"
                  ? "Gratis"
                  : `${values.price} kr. pr. person`}
              </p>
            </article>
          </article>
        </section>
      </Box>
      <Box maxWidth={"h-full flex flex-col gap-5"}>
        <Heading icon={<MapPinned />} title={"Kort"} />
        <GoogleMaps position={position} />
      </Box>
    </section>
  );
}
