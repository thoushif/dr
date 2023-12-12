import React, { createContext, useContext, useState } from "react";

interface DroneCompareContextProps {
  selectedDrones: Drone[];
  addDroneToCompare: (droneId: Drone) => void;
  removeDroneFromCompare: (droneId: Drone) => void;
}

const DroneCompareContext = createContext<DroneCompareContextProps | undefined>(
  undefined
);

export const DroneCompareProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [selectedDrones, setSelectedDrones] = useState<Drone[]>([]);

  const addDroneToCompare = (drone: Drone) => {
    console.log("adding", drone._id);

    setSelectedDrones((prevSelectedDrones) => [...prevSelectedDrones, drone]);
  };

  const removeDroneFromCompare = (droneToRemove: Drone) => {
    setSelectedDrones((prevSelectedDrones) =>
      prevSelectedDrones.filter((drone) => drone._id !== droneToRemove._id)
    );
  };

  return (
    <DroneCompareContext.Provider
      value={{ selectedDrones, addDroneToCompare, removeDroneFromCompare }}
    >
      {children}
    </DroneCompareContext.Provider>
  );
};

export const useDroneCompare = (): DroneCompareContextProps => {
  const context = useContext(DroneCompareContext);

  if (!context) {
    throw new Error(
      "useDroneCompare must be used within a DroneCompareProvider"
    );
  }

  return context;
};
