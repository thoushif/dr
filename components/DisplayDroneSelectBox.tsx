"use client";

import { ChangeEvent, useState } from "react";

import AddImage from "./gallery/AddImage";
import DroneDropdown from "./gallery/dropdown";

type Props = {
  drones: Drone[];
};

const DronesList = ({ drones }: Props) => {
  const [selectedDrone, setSelectedDrone] = useState<Drone>();
  const handleDroneSelect = (drone: Drone) => {
    setSelectedDrone(drone);
    // You can perform other actions here based on the selected drone
    // console.log("Selected Drone ID:", drone);
  };

  return (
    <div>
      <DroneDropdown drones={drones} onSelect={handleDroneSelect} />

      {selectedDrone && <AddImage drone={selectedDrone} />}
    </div>
  );
};

export default DronesList;
