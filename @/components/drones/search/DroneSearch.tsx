"use client";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getSearchedDrones } from "@/lib/sanity/sanity.util";
import { getQueryByDroneSearch } from "@/lib/sanity/queryMaker";
import { useForm } from "react-hook-form";
import DroneSearchContent from "./DroneSearchContent";
import DisplayDroneThumbNails from "../DisplayDroneThumbNails";
import { roboto_mono } from "@/lib/utils/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MdFilterList } from "react-icons/md";
import _ from "lodash";
import { useDroneSearch } from "@/contexts/DroneSearchProvider";

const DroneSearch = ({
  drones,
  brand,
}: {
  drones: DroneThumbnail[] | undefined;
  brand: string;
}) => {
  const { appliedGlobalSearch, appliedBrand } = useDroneSearch();
  const [results, setResults] = useState<DroneThumbnail[] | undefined>(drones);
  const [appliedSearch, setAppliedSearch] =
    useState<DroneSearchState>(appliedGlobalSearch);

  const { register, setValue, watch } = useForm<DroneSearchState>({
    defaultValues: appliedSearch,
  });

  const handleCheckboxChange = (name: string, value: string) => {
    const selectedValues = watch(name as keyof DroneSearchState) || []; // Retrieve the current selected values
    setValue(
      name as keyof DroneSearchState,
      selectedValues &&
        selectedValues.length > 0 &&
        selectedValues?.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
  };

  const applySearch = async () => {
    const selectedValues = watch() || []; // Retrieve the current selected values
    console.log("searching state is", selectedValues);
    // Perform search based on the selected criteria
    const query = getQueryByDroneSearch(selectedValues);
    const drones = await getSearchedDrones(query);
    setAppliedSearch(selectedValues);
    setResults(drones);
  };

  // useEffect(() => {
  //   first;

  //   return () => {
  //     second;
  //   };
  // }, [third]);

  return (
    <Sheet>
      <div className="flex items-center justify-between">
        <SheetTrigger asChild className="flex items-center">
          <span className="justify-start mt-4 text-lg">
            <MdFilterList className="ml-4" />
          </span>
        </SheetTrigger>
        <Link
          href={`${brand ? "/drones/search" : "/brands"}`}
          className={cn(
            "items-center justify-center bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase",
            roboto_mono.className
          )}
        >
          Search {brand ? "all drones" : "by brands"}
        </Link>
      </div>

      <div className="flex items-center justify-center w-full h-10 my-10 cursor-default">
        <p
          className={cn(
            "text-transparent text-7xl bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase",
            roboto_mono.className
          )}
        >
          {brand
            ? brand
            : _.isEqual(appliedSearch, appliedGlobalSearch)
            ? "featured"
            : "searching"}
        </p>
      </div>
      <SheetContent
        side={"left"}
        className="max-h-screen overflow-y-auto bg-white"
      >
        <DroneSearchContent
          register={register}
          watch={watch}
          handleCheckboxChange={handleCheckboxChange}
          applySearch={applySearch}
        />
      </SheetContent>
      <div className="flex mb-4">
        {appliedSearch &&
          Object.entries(appliedSearch).map(([key, values]) => {
            if (Array.isArray(values) && values.length > 0) {
              return values.map((value: string) => (
                <span
                  key={`${key}-${value}`}
                  className="p-1 px-3 m-1 bg-gray-300 rounded-md"
                >
                  {` ${value}`}
                </span>
              ));
            }
            return null;
          })}
      </div>
      <div>
        <DisplayDroneThumbNails drones={results} />
      </div>
    </Sheet>
  );
};

export default DroneSearch;
