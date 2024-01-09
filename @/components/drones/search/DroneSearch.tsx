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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MdClose, MdFilterList } from "react-icons/md";
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

  const applySearch = async () => {
    const selectedValues = watch() || []; // Retrieve the current selected values
    console.log("searching state is", selectedValues);
    // Perform search based on the selected criteria
    const query = getQueryByDroneSearch(selectedValues);
    const drones = await getSearchedDrones(query);
    setAppliedSearch(selectedValues);
    setResults(drones);
  };

  useEffect(() => {
    applySearch();
  }, []);

  return (
    <Sheet>
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
                    <MdClose
                      className="ml-2 text-red-600"
                      onClick={() => {
                        handleCheckboxChange(key, value);
                        applySearch();
                      }}
                    />
                  </span>
                ));
              }
              return null;
            })}
        </div>
        <SheetTrigger asChild className="flex items-center">
          <span className="justify-start mt-4 text-lg">
            <MdFilterList className="ml-4" />
          </span>
        </SheetTrigger>
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
          isDirty={isDirty}
        />
      </SheetContent>

      <div>
        <DisplayDroneThumbNails drones={results} />
      </div>
    </Sheet>
  );
};

export default DroneSearch;
