"use client";
import { Button } from "@/components/ui/button";
import { useDroneCompare } from "@/contexts/DroneCompareContext";

const AddToCompareButton = ({ drone }: { drone: Drone }) => {
  const { addDroneToCompare, selectedDrones } = useDroneCompare();

  const handleCompareClick = () => {
    addDroneToCompare(drone);
  };
  const isDroneInCompareList = (droneId: Drone) =>
    selectedDrones.some((compareItem) => compareItem._id === droneId._id);

  return (
    <Button
      className="rounded-full"
      onClick={handleCompareClick}
      disabled={isDroneInCompareList(drone) || selectedDrones.length === 2}
    >
      {isDroneInCompareList(drone) ? "Already in Compare" : "Add to compare"}
    </Button>
  );
};

export default AddToCompareButton;
