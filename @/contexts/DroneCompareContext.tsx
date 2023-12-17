import { toast } from "@/components/ui/use-toast";
import React, { createContext, useContext, useState } from "react";

interface DroneCompareContextProps {
  selectedDrones: Drone[];
  addDroneToCompare: (droneId: Drone) => void;
  removeDroneFromCompare: (droneId: Drone) => void;
  isCompareDrawerMinimized: boolean;
  setCompareDrawerMinimized: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isCompareDrawerMinimized, setCompareDrawerMinimized] =
    useState<boolean>(true);
  const addDroneToCompare = (drone: Drone) => {
    if (selectedDrones.length < 5) {
      setCompareDrawerMinimized(false);
      setSelectedDrones((prevSelectedDrones) => [...prevSelectedDrones, drone]);
      toast({
        description: "Added to compare!!",
      });
    } else {
      toast({
        description: " You can compare only 5 drones at most!, sorry!!",
      });
    }
  };

  const removeDroneFromCompare = (droneToRemove: Drone) => {
    setSelectedDrones((prevSelectedDrones) =>
      prevSelectedDrones.filter((drone) => drone._id !== droneToRemove._id)
    );
  };

  return (
    <DroneCompareContext.Provider
      value={{
        selectedDrones,
        addDroneToCompare,
        removeDroneFromCompare,
        isCompareDrawerMinimized,
        setCompareDrawerMinimized,
      }}
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
