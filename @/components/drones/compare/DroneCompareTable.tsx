"use client";

import React, { useEffect, useState } from "react";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { chainCaseToWords } from "@/lib/sanity/queryMaker";
import { MdOutlineArrowOutward, MdRemove } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import urlFor from "@/lib/sanity/urlFor";
import {
  DisplayDroneCompatibilityMobile,
  DisplayDroneCompatibilityOS,
  DisplayDroneCompatibilityVR,
} from "../DisplayDroneCompatibility";
import CompareDrawer from "./ComapareDrawer";
import { useDroneCompare } from "@/contexts/DroneCompareContext";

interface DroneCompareTableProps {
  drones: Drone[];
}

const DroneCompareTable: React.FC<DroneCompareTableProps> = ({ drones }) => {
  const { setCompareDrawerMinimized } = useDroneCompare();
  useEffect(() => {
    setCompareDrawerMinimized(true);
  }, []);

  const [showDifferencesOnly, setShowDifferences] = useState(false);
  const aircraftHeadings: (keyof Aircraft)[] = [
    "description",
    "price",
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
  const gimbalHeadings: (keyof Gimbal)[] = [
    "mechanical_range",
    "controllable_range",
  ];
  const sensingHeadings: (keyof Sensing)[] = [
    "sensing_type",
    "forward_measurement_range",
    "forward_detection_range",
  ];
  const videoTransmissionHeadings: (keyof VideoTransmission)[] = [
    "video_transmission_system",
    "live_view_quality",
  ];
  const batteryHeadings: (keyof Battery)[] = [
    "capacity",
    "weight",
    "nominal_voltage",
  ];
  const remoteControllerHeadings: (keyof RemoteController)[] = [
    "max_operating_time",
    "max_supported_mobile_device_size",
  ];
  const compatibilityHeadings: (keyof Compatibility)[] = [
    "mobile_devices",
    "supported_oss",
    "vr_headsets",
  ];
  const accessoriesHeadings: (keyof Accessories)[] = [
    "extra_batteries",
    "propeller_guards",
    "additional_propellers",
    "carrying_case",
    "charger_and_hub",
    "remote_controller_accessories",
    "camera_filters",
    "landing_pad",
    "gps_tracker",
    "fpv_goggles",
    "sunshade",
    "spare_memory_cards",
    "drone_skins_decals",
    "drone_lights",
    "range_extenders",
    "gimbal_stabilizers",
    "wind_gauges",
    "tool_kit",
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
      <TableRow className="m-8 border-b-4">
        <TableHeader className="pt-8 text-lg font-bold text-slate-800">
          {label}
        </TableHeader>
      </TableRow>
      {headings.map((heading) => {
        const hasDifferentSubRow = hasDifferentSubRowValues(
          headingType,
          heading
        );
        return (
          (!showDifferencesOnly || hasDifferentSubRow) && (
            <TableRow key={`${String(headingType)}-${String(heading)}`}>
              <TableHeader className="w-16 h-10 text-lg ">
                {chainCaseToWords(String(heading))}
              </TableHeader>
              {drones.map((drone) => {
                const subElement: any = drone[headingType as keyof Drone];
                if (subElement) {
                  if (headingType == "compatibility") {
                    return (
                      <TableCell
                        className={
                          !showDifferencesOnly && hasDifferentSubRow
                            ? "bg-slate-100 "
                            : ""
                        }
                        key={`${String(headingType)}-${String(
                          heading
                        )}-${String(drone._id)}`}
                      >
                        {heading === "mobile_devices" ? (
                          <DisplayDroneCompatibilityMobile
                            mobile_devices={subElement[heading]}
                          />
                        ) : heading === "supported_oss" ? (
                          <DisplayDroneCompatibilityOS
                            supported_oss={subElement[heading]}
                          />
                        ) : heading === "vr_headsets" ? (
                          <DisplayDroneCompatibilityVR
                            vr_headsets={subElement[heading]}
                          />
                        ) : (
                          subElement[heading]
                        )}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        className={
                          !showDifferencesOnly && hasDifferentSubRow
                            ? "bg-slate-100 "
                            : ""
                        }
                        key={`${String(headingType)}-${String(
                          heading
                        )}-${String(drone._id)}`}
                      >
                        {/* {drone[headingType as keyof Drone] && subElement[heading]} */}
                        {headingType === "accessories" &&
                        typeof subElement[heading] === "boolean"
                          ? subElement[heading]
                            ? "Included"
                            : "Not Included"
                          : subElement[heading]}
                        {/* {headingType} */}
                      </TableCell>
                    );
                  }
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

  const prepareCompareRemoveURL = (drones: Drone[], _id: string): string => {
    const filteredDrones = drones
      .filter((drone) => drone._id !== _id)
      .map((drone) => drone._id)
      .join(",");
    return `/drones/compare?d=${filteredDrones}`;
  };
  const prepareOpenURL = (_id: string): string => {
    return `/drones/${_id}`;
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          className="m-2"
          checked={showDifferencesOnly}
          onChange={() => setShowDifferences(!showDifferencesOnly)}
        />
        Show Differences Only
      </label>
      <ShadcnTable className="ml-2">
        <TableBody>
          <TableRow>
            <TableCell className="w-16 h-10"> </TableCell>
            {drones.map((drone) => (
              <TableCell className="w-16 h-10 font-bold" key={drone._id}>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center ">
                    {drone.aircraft.name}
                    <Link target="_blank" href={prepareOpenURL(drone._id)}>
                      <MdOutlineArrowOutward className="mx-2 rounded-full hover:bg-slate-600 text-slate-600 hover:text-slate-200" />
                    </Link>
                    {drones && drones.length > 2 && (
                      <Link href={prepareCompareRemoveURL(drones, drone._id)}>
                        <MdRemove className="mx-2 rounded-full hover:bg-slate-600 text-slate-600 hover:text-slate-200" />
                      </Link>
                    )}
                  </div>
                  <div>
                    <Image
                      src={urlFor(drone.drone_image.image).url()}
                      alt="Main Thumbnail"
                      width={250}
                      height={250}
                      className="rounded-md"
                    />
                  </div>
                </div>
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
          {renderSubHeadingRow("Camera", "camera", cameraHeadings)}
          {renderSubHeadingRow("Battery ", "battery", batteryHeadings)}
          {renderSubHeadingRow("Gimbal", "gimbal", gimbalHeadings)}
          {renderSubHeadingRow("Sensing", "sensing", sensingHeadings)}
          {renderSubHeadingRow(
            "Remote Controller",
            "remote_controller",
            remoteControllerHeadings
          )}
          {renderSubHeadingRow(
            "VideoTransmission ",
            "video_transmission",
            videoTransmissionHeadings
          )}
          {renderSubHeadingRow(
            "Accessories",
            "accessories",
            accessoriesHeadings
          )}
          {renderSubHeadingRow(
            "Compatibility",
            "compatibility",
            compatibilityHeadings
          )}
        </TableBody>
      </ShadcnTable>
      <CompareDrawer />
    </>
  );
};

export default DroneCompareTable;
