"use client";
import { useEffect, useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getSearchedDrones } from "@/lib/sanity/sanity.util";
import {
  chainCaseToWords,
  getQueryByDroneSearch,
} from "@/lib/sanity/queryMaker";
import { useForm } from "react-hook-form";
import DroneSearchContent from "./DroneSearchContent";
import DisplayDroneThumbNails from "../DisplayDroneThumbNails";
import { roboto_mono } from "@/lib/utils/fonts";
import { cleanupFilters, cn } from "@/lib/utils";
import {
  MdClose,
  MdFilterList,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";
import _ from "lodash";
import { useDroneSearch } from "@/contexts/DroneSearchProvider";
import { Button } from "@/components/ui/button";
import { FaRegSadCry } from "react-icons/fa";

const DroneSearch = ({
  drones,
  brand,
  slug,
}: {
  drones: DroneThumbnail[] | undefined;
  brand: string;
  slug: string;
}) => {
  const { appliedGlobalSearch, appliedBrand, setAppliedBrand } =
    useDroneSearch();
  const [results, setResults] = useState<DroneThumbnail[] | undefined>(drones);
  const [appliedSearch, setAppliedSearch] =
    useState<DroneSearchState>(appliedGlobalSearch);
  // console.log("global search in search", appliedGlobalSearch);
  // console.log("slug search", slug);

  switch (slug) {
    case "beginner-friendly":
      cleanupFilters(appliedSearch);
      appliedSearch.selectedEaseOfUse = ["beginner_friendly"];
      break;
    case "fun":
      cleanupFilters(appliedSearch);
      if (!appliedSearch.selectedUsage.includes("Fun")) {
        appliedSearch.selectedUsage.push("Fun");
      }
      break;
    case "racing":
      cleanupFilters(appliedSearch);
      if (!appliedSearch.selectedUsage.includes("Racing")) {
        appliedSearch.selectedUsage.push("Racing");
      }
      break;
    case "photography":
      cleanupFilters(appliedSearch);
      if (!appliedSearch.selectedUsage.includes("Photography")) {
        appliedSearch.selectedUsage.push("Photography");
      }
      break;
    default:
      // Default case if type is not recognized
      break;
  }
  // console.log("global search in search after setting slug is", appliedSearch);
  const {
    register,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<DroneSearchState>({
    defaultValues: appliedSearch,
  });

  const handleCheckboxChange = (name: string, value: string) => {
    const selectedValues: string[] = watch(name) || []; // Retrieve the current selected values
    setValue(
      name,
      selectedValues &&
        selectedValues.length > 0 &&
        selectedValues?.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
  };
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [allDronesDone, setAllDronesDone] = useState<boolean>(false);

  const applySearch = async () => {
    const selectedValues = watch() || []; // Retrieve the current selected values
    // console.log("+=========start========+");
    // console.log(selectedValues);
    // console.log(appliedSearch);
    // console.log(appliedBrand);
    // console.log("+==========end=======+");
    const isFilterSame = _.isEqual(appliedSearch, selectedValues);
    // Perform search based on the selected criteria
    const query = getQueryByDroneSearch(selectedValues, appliedBrand);
    const newDrones = await getSearchedDrones(
      query,
      !isFilterSame ? 0 : pageIndex
    );
    if (!isFilterSame) {
      setPageIndex(0);
      setAllDronesDone(false);
    }
    // console.log("drones are:", newDrones);
    setAppliedSearch(selectedValues);
    setResults(newDrones);
  };

  useEffect(() => {
    setAppliedBrand(brand);
    applySearch();
  }, []);
  const loadMoreDrones = async () => {
    const query = getQueryByDroneSearch(appliedSearch, appliedBrand);
    const newDrones = await getSearchedDrones(query, pageIndex + 1);
    if (newDrones.length == 0) {
      setAllDronesDone(true);
    }
    setResults((prevDrones) =>
      prevDrones ? [...prevDrones, ...newDrones] : newDrones
    );
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };
  return (
    <Sheet>
      <div className="flex items-center justify-center">
        <p
          className={cn(
            "text-transparent text-7xl items-center justify-center  bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase",
            roboto_mono.className
          )}
        >
          {appliedBrand}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap mb-4">
          {appliedSearch &&
            Object.entries(appliedSearch).map(([key, values]) => {
              if (Array.isArray(values) && values.length > 0) {
                return values.map((value: string) => (
                  <span
                    key={`${key}-${value}`}
                    className="flex items-center p-1 px-3 m-1 bg-gray-300 rounded-md "
                  >
                    {chainCaseToWords(`${value}`)}
                    {!slug && (
                      <MdClose
                        className="ml-2 text-red-600"
                        onClick={() => {
                          handleCheckboxChange(key, value);
                          applySearch();
                        }}
                      />
                    )}
                  </span>
                ));
              }
              return null;
            })}
        </div>
        {!slug && (
          <SheetTrigger asChild className="flex items-center">
            <span className="justify-start mt-4 text-lg">
              <MdFilterList className="ml-4" />
            </span>
          </SheetTrigger>
        )}
      </div>

      {!slug && (
        <SheetContent
          side={"left"}
          className="max-h-screen overflow-y-auto bg-white"
        >
          <DroneSearchContent
            register={register}
            watch={watch}
            handleCheckboxChange={handleCheckboxChange}
            applySearch={applySearch}
            isDirty={isDirty}
          />
        </SheetContent>
      )}

      <div>
        <DisplayDroneThumbNails drones={results} />
      </div>
      {!allDronesDone ? (
        <Button
          onClick={loadMoreDrones}
          className="m-4 text-zinc-200 bg-slate-600 w-full"
        >
          <MdOutlineKeyboardDoubleArrowDown />
        </Button>
      ) : (
        <span className="flex items-center justify-center m-4">
          No more results <FaRegSadCry className="ml-4" />
        </span>
      )}
    </Sheet>
  );
};

export default DroneSearch;
