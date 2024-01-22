"use client";
import {
  chainCaseToWords,
  compareDronesKeysMap,
} from "@/lib/sanity/queryMaker";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

const ComparePage = ({ drones }: { drones: Drone[] }) => {
  const columns: ColumnDef<DroneCompare>[] = [
    { header: " ", accessorKey: "attribute" },
    ...drones.map((drone, index) => ({
      header: drone?.aircraft?.name,
      id: drone?._id,
      accessorKey: `drone${index}`,
    })),
  ];

  const data = prepareDroneCompareData(drones);

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};

function prepareDroneCompareData(drones: Drone[]): DroneCompare[] {
  const droneCompareData: DroneCompare[] = [];

  compareDronesKeysMap.forEach((tableData) => {
    // Add a new line for each table
    droneCompareData.push({
      attribute: chainCaseToWords(`${tableData.table}`),
      drone0: "",
      drone1: "",

      isHeader: true,
    });

    tableData.keys.forEach((key) => {
      const attributeData: DroneCompare = {
        attribute: chainCaseToWords(key),
        drone0: "-",
        drone1: "-",

        isHeader: false,
      };

      const drone0 = drones[0][tableData.table as keyof Drone] as any;
      const drone1 = drones[1][tableData.table as keyof Drone] as any;

      attributeData["drone0"] = String(drone0 ? drone0[key] || "" : "");

      attributeData["drone1"] = String(drone1 ? drone1[key] || "" : "");

      droneCompareData.push(attributeData);
    });
  });

  return droneCompareData;
}

export default ComparePage;
