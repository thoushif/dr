"use client";

import React, { useState } from "react";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { chainCaseToWords } from "@/lib/sanity/queryMaker";
interface DroneCompareTableProps {
  drones: Drone[];
}

const DroneCompareTable: React.FC<DroneCompareTableProps> = ({ drones }) => {
  const [showDifferencesOnly, setShowDifferences] = useState(false);
  const aircraftHeadings: (keyof Aircraft)[] = [
    "description",

    "manufacturer",
    "takeoff_weight",
    "length_folded",
    "width_folded",
    "height_folded",
  ];

  const flightSpecHeadings: (keyof FlightSpecifications)[] = [
    "max_ascent_speed",
    "max_descent_speed",
    "max_horizontal_speed",
  ];

  const cameraHeadings: (keyof Camera)[] = [
    "color_mode",
    "digital_zoom",
    "iso_range",
  ];

  const renderSubHeadingRow = (
    label: string,
    headingType: keyof Drone,
    headings: (
      | keyof FlightSpecifications
      | keyof Camera
      | keyof Aircraft
      | string
    )[]
  ) => (
    <React.Fragment key={label}>
      <TableRow>
        <TableHeader className="text-lg text-slate-800">{label}</TableHeader>
      </TableRow>
      {headings.map((heading) => {
        const hasDifferentSubRow = hasDifferentSubRowValues(
          headingType,
          heading
        );
        return (
          (!showDifferencesOnly || hasDifferentSubRow) && (
            <TableRow
              key={`${String(headingType)}-${String(heading)}`}
              className={
                !showDifferencesOnly && hasDifferentSubRow ? "bg-slate-100" : ""
              }
            >
              <TableHeader className="w-16 h-10 text-base">
                {chainCaseToWords(String(heading))}
              </TableHeader>
              {drones.map((drone) => {
                const subElement: any = drone[headingType as keyof Drone];
                if (subElement) {
                  return (
                    <TableCell
                      className="w-16 h-10"
                      key={`${String(headingType)}-${String(heading)}-${String(
                        drone._id
                      )}`}
                    >
                      {drone[headingType as keyof Drone] && subElement[heading]}
                    </TableCell>
                  );
                }

                return undefined;
              })}
            </TableRow>
          )
        );
      })}
    </React.Fragment>
  );

  const hasDifferentSubRowValues = (
    headingType: keyof Drone | string,
    heading: keyof FlightSpecifications | keyof Camera | keyof Aircraft | string
  ) => {
    const values = drones.map((drone) => {
      const subElement: any = drone[headingType as keyof Drone];
      if (subElement) {
        return subElement[heading];
      }

      return undefined;
    });

    return !values.every((value, index, array) => value === array[0]);
  };

  return (
    <>
      <label className="ml-2">
        <input
          type="checkbox"
          checked={showDifferencesOnly}
          onChange={() => setShowDifferences(!showDifferencesOnly)}
        />
        Show Differences Only
      </label>
      <ShadcnTable>
        <TableBody>
          <TableRow>
            <TableCell className="w-16 h-10"> </TableCell>
            {drones.map((drone) => (
              <TableCell className="w-16 h-10 font-bold" key={drone._id}>
                {drone.aircraft.name}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
        <TableBody>
          {renderSubHeadingRow("AirCraft", "aircraft", aircraftHeadings)}
          {renderSubHeadingRow(
            "Flight Specifications",
            "flight_specs",
            flightSpecHeadings
          )}
          {renderSubHeadingRow("Camera Details", "camera", cameraHeadings)}
        </TableBody>
      </ShadcnTable>
    </>
  );
};

export default DroneCompareTable;
