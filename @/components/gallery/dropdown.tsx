"use client";
// DroneDropdown.tsx
import urlFor from "@/lib/sanity/urlFor";
import Image from "next/image";
import React from "react";
import Select from "react-select";

interface DroneDropdownProps {
  drones: Drone[];
  onSelect: (drone: Drone) => void;
}

const DroneDropdown: React.FC<DroneDropdownProps> = ({ drones, onSelect }) => {
  const options = drones.map((drone) => ({
    value: drone,
    label: (
      <div className="flex items-center">
        <Image
          src={urlFor(drone.drone_image.image).url()}
          alt={drone && drone.name ? drone.name : " Drone Image "}
          className="w-8 h-8 mr-2 rounded-full"
          width={18}
          height={18}
        />
        {drone && drone.name ? drone.name : " Drone name "}
      </div>
    ),
  }));

  const handleSelectChange = (selectedOption: any) => {
    onSelect(selectedOption?.value);
  };

  return (
    <Select
      options={options}
      onChange={handleSelectChange}
      isSearchable={false}
      placeholder="Which drone you got?"
    />
  );
};

export default DroneDropdown;
