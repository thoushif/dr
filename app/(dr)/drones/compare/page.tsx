import ComparePage from "@/components/drones/compare/Compare";
import { queryForDrone } from "@/lib/sanity/sanity.queries";
import { getDronesDetails } from "@/lib/sanity/sanity.util";
import React from "react";
type Props = {
  searchParams: {
    [key: string]: string;
  };
};
export const dynamic = "force-dynamic";

const page = async ({ searchParams }: Props) => {
  const filterValue = searchParams.d;
  //   const params1 = { documentId: "9f2084c9-6313-44c4-9e30-656030eb394e" }; // Replace with the actual _id value
  //   const drone1 = await getDronesDetails(queryForDrone, params1);
  //   const params2 = { documentId: "094aaa1f-61c4-4861-b41c-ffe5bc5556a1" }; // Replace with the actual _id value
  //   const drone2 = await getDronesDetails(queryForDrone, params2);
  //   const drones = new Array(drone1[0], drone2[0]);
  const drones = await getDronesArray(queryForDrone, filterValue);
  return <>{drones && <ComparePage drones={drones} />}</>;
};

export default page;
async function getDronesArray(queryForDrone: string, filterValue: string) {
  const droneIds = filterValue.split(",", 2);

  const dronesArray = [];
  for (const droneId of droneIds) {
    const params = { documentId: droneId };
    const droneDetails = await getDronesDetails(queryForDrone, params);
    dronesArray.push(droneDetails);
  }

  const extractedDrones = dronesArray.map((droneArray) => droneArray[0]);
  return extractedDrones;
}
