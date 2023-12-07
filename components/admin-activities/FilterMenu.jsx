"use client";

import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";

export default function FilterMenu({ searchParams, isCalender }) {
  const filter = searchParams.filter;
  const past = searchParams.past;
  const search = searchParams.search;
  const [activeFilter, setActiveFilter] = useState(filter);
  const [searchValue, setSearchValue] = useState(search || "");
  const baseUrl = isCalender ? "/kalender" : "/admin/aktiviteter";
  const router = useRouter();

  function getFilterParams() {
    if (past && search) {
      return `&past=${past}&search=${search}`;
    }
    if (past) {
      return `&past=${past}`;
    }
    if (search) {
      return `&search=${search}`;
    }
    return "";
  }

  const filterParams = getFilterParams();

  function getPastParams() {
    if (filter && search) {
      return `&filter=${filter}&search=${search}`;
    }
    if (filter) {
      return `&filter=${filter}`;
    }
    if (search) {
      return `&search=${search}`;
    }
    return "";
  }

  const pastParams = getPastParams();

  function getSearchParams() {
    if (filter && past) {
      return `&filter=${filter}&past=${past}`;
    }
    if (filter) {
      return `&filter=${filter}`;
    }
    if (past) {
      return `&past=${past}`;
    }
    return "";
  }

  const searchValueParams = getSearchParams();

  function handlePastChange() {
    const query = "?past=";
    router.push(
      `${baseUrl}${query}${
        !past ? "true" : past === "true" ? "false" : "true"
      }${pastParams}`
    );
  }

  function handleFilterChange(filter) {
    const query = "?filter=";
    setActiveFilter(filter);
    router.push(`${baseUrl}${query}${!filter ? "" : filter}${filterParams}`);
  }

  //Dynamisk søgning
  useEffect(() => {
    const timer = setTimeout(() => {
      const query = "?search=";
      router.push(`${baseUrl}${query}${searchValue}${searchValueParams}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="flex justify-between items-center my-5 flex-wrap gap-5">
      <Menubar className="w-max flex-wrap">
        <MenubarMenu>
          <MenubarTrigger
            className={`data-[state=open]:bg-white ${
              activeFilter === "alle" || !activeFilter
                ? "bg-accent data-[state=open]:bg-accent"
                : "bg-white"
            }`}
            onClick={() => handleFilterChange()}
          >
            Alle
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className={`data-[state=open]:bg-white ${
              activeFilter === "jagt"
                ? "bg-accent data-[state=open]:bg-accent"
                : "bg-white"
            }`}
            onClick={() => handleFilterChange("jagt")}
          >
            Jagt
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className={`data-[state=open]:bg-white ${
              activeFilter === "flugtskydning"
                ? "bg-accent data-[state=open]:bg-accent"
                : "bg-white"
            }`}
            onClick={() => handleFilterChange("flugtskydning")}
          >
            Flugtskydning
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className={`data-[state=open]:bg-white ${
              activeFilter === "riffelskydning"
                ? "bg-accent data-[state=open]:bg-accent"
                : "bg-white"
            }`}
            onClick={() => handleFilterChange("riffelskydning")}
          >
            Riffelskydning
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            className={`data-[state=open]:bg-white ${
              activeFilter === "hundetræning"
                ? "bg-accent data-[state=open]:bg-accent"
                : "bg-white"
            }`}
            onClick={() => handleFilterChange("hundetræning")}
          >
            Hundetræning
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <div className="flex gap-x-2 gap-y-4 items-center w-full max-w-[516px] flex-wrap-reverse">
        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={past === "true" ? true : false}
            onClick={handlePastChange}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-max"
          >
            Vis afsluttede aktiviteter
          </label>
        </div>

        <Input
          placeholder="Søg efter en aktivitet"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full max-w-[320px]"
        />
      </div>
    </div>
  );
}
