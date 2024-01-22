"use client";
import { DataTable } from "@/components/drones/compare/DataTable";
import {
  chainCaseToWords,
  compareDronesKeysMap,
} from "@/lib/sanity/queryMaker";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const CompareLoadingPage = ({ drones }: { drones: Drone[] }) => {
  const columns: ColumnDef<DroneCompare>[] = [
    { header: "loading...", accessorKey: "attribute" },
    ...[0, 1].map((_, index) => ({
      header: "loading...",
      accessorKey: `drone${index}`,
    })),
  ];

  const data = prepareDroneCompareData(drones);

  return <DataTable columns={columns} data={data} />;
};

export default CompareLoadingPage;

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
        drone0: "loading...",
        drone1: "loading...",

        isHeader: false,
      };

      droneCompareData.push(attributeData);
    });
  });

  return droneCompareData;
}
