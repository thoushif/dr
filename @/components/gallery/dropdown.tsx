// DroneDropdown.tsx
import urlFor from "@/lib/sanity/urlFor";
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
        <img
          src={urlFor(drone.drone_image.image).url()}
          alt={drone.name}
          className="w-8 h-8 mr-2 rounded-full"
        />
        {drone.name}
      </div>
    ),
  }));

  const handleSelectChange = (selectedOption: any) => {
    onSelect(selectedOption?.value);
  };

  return (
    <div className="mb-4">
      <Select
        options={options}
        onChange={handleSelectChange}
        isSearchable={false}
        placeholder="Which drone you got?"
      />
    </div>
  );
};

export default DroneDropdown;
