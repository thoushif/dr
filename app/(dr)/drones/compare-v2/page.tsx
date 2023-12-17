// pages/drones/compare.tsx

import DroneCompareTable from "@/components/drones/compare/DroneCompareTable";
import dronesData from "../drones.json";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};

import React from "react";

const DroneComparePage = ({ searchParams }: Props) => {
  //   const filterValue = searchParams.id;
  //   const droneIds = filterValue.split(",", 5);
  //   // Fetch drones data based on the provided ids (replace with your logic)
  //   console.log(droneIds);
  //   const drones = dronesData.filter((drone) =>
  //     droneIds.includes(drone!._id!.toString())
  //   );
  //   console.log(drones);
  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-3xl font-bold">Drone Comparison</h1>
      {/* <DroneCompareTable drones={drones} /> */}
    </div>
  );
};

export default DroneComparePage;
