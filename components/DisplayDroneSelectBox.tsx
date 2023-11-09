"use client";

import { ChangeEvent, useState } from "react";

import urlFor from "@lib/urlFor";
import AddImage from "./AddImage";

type Props = {
  drones: Drone[];
};

const DronesList = ({ drones }: Props) => {
  const [selectedDrone, setSelectedDrone] = useState<Drone>();
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedDroneId = e.target.value;
    const selectedDrone = drones.find((drone) => drone._id === selectedDroneId);
    setSelectedDrone(selectedDrone);
  };

  return (
    <div>
      <h1>List of Drones</h1>
      <select onChange={handleSelectChange}>
        <option value="">Select a drone</option>
        {drones.map((drone) => (
          <option key={drone._id} value={drone._id}>
            {drone.name} - {urlFor(drone.drone_image.image).url()}
          </option>
        ))}
      </select>

      {selectedDrone && <AddImage drone={selectedDrone} />}
    </div>
  );
};

export default DronesList;
