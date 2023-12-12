"use client";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getSearchedDrones } from "@/lib/sanity/sanity.util";
import { getQueryByDroneSearch } from "@/lib/sanity/queryMaker";
import { useForm } from "react-hook-form";
import DroneSearchContent from "./DroneSearchContent";
import Manufacturers from "./Manufacturers";
import DisplayDroneThumbNails from "../DisplayDroneThumbNails";

const DroneSearch = ({ drones }: { drones: DroneThumbnail[] }) => {
  const [results, setResults] = useState<DroneThumbnail[]>(drones);
  const manufacturers: string[] = [
    "DJI",
    "Parrot",
    "Autel Robotics",
    "Yuneec",
    "3DR",
    "Hubsan",
    "JJRC",
    "Holy Stone",
    "Potensic",
    "Contixo",
    "Ryze Tech",
    "PowerVision",
    "Snaptain",
    "Force1",
    "UDI RC",
    "Syma",
    "EACHINE",
    "Altair Aerial",
    "GoPro",
    "ZeroTech",
    "Walkera",
    "Xiaomi",
    "Skydio",
    "UVify",
    "Draganfly",
    "AEE Technology",
    "HGLRC",
    "Flyability",
  ];
  const { register, handleSubmit, setValue, watch } =
    useForm<DroneSearchState>();

  // Handle form submission
  const onSubmit = async (searchState: DroneSearchState) => {
    console.log(searchState);
    // Perform search based on the selected criteria
    const query = getQueryByDroneSearch(searchState);
    const drones = await getSearchedDrones(query);
    setResults(drones);
  };
  const selectedManufacturers = watch("selectedManufacturers") || [];

  const onSelectManufacturer = (manufacturer: string) => {
    const newSelectedManufacturers = selectedManufacturers.includes(
      manufacturer
    )
      ? selectedManufacturers
      : [...selectedManufacturers, manufacturer];

    setValue("selectedManufacturers", newSelectedManufacturers);
    handleSubmit(onSubmit)();
  };

  const onRemoveManufacturer = (manufacturer: string) => {
    setValue(
      "selectedManufacturers",
      (selectedManufacturers || []).filter((item) => item !== manufacturer)
    );
    handleSubmit(onSubmit)();
  };
  const handleCheckboxChange = (name: string, value: string) => {
    const selectedValues = watch(name as keyof DroneSearchState) || []; // Retrieve the current selected values
    console.log(selectedValues);
    setValue(
      name as keyof DroneSearchState,
      selectedValues &&
        selectedValues.length > 0 &&
        selectedValues?.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value]
    );
    handleSubmit(onSubmit)();
  };

  return (
    <Sheet>
      <Manufacturers
        manufacturers={manufacturers}
        selectedManufacturers={selectedManufacturers}
        onSelect={onSelectManufacturer}
        onRemove={onRemoveManufacturer}
      />

      <SheetTrigger asChild className="flex">
        <span className="justify-end mt-4 text-lg">🔍</span>
      </SheetTrigger>

      <SheetContent
        side={"left"}
        className="max-h-screen overflow-y-auto bg-white"
      >
        <DroneSearchContent
          register={register}
          watch={watch}
          handleCheckboxChange={handleCheckboxChange}
        />
      </SheetContent>

      <div className="flex mb-4">
        {Object.entries(watch()).map(([key, values]) => {
          if (Array.isArray(values) && values.length > 0) {
            return values.map((value: string) => (
              <span
                key={`${key}-${value}`}
                className="p-1 px-3 m-1 bg-gray-300 rounded-md"
              >
                {` ${value}`}
                <button
                  type="button"
                  className="ml-1 text-red-600"
                  onClick={() => handleCheckboxChange(key, value)}
                >
                  x
                </button>
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
