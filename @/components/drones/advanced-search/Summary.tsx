import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { roboto_mono } from "@/lib/utils/fonts";
import React from "react";
import { ReactNode } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface SummaryPageProps {
  selectedOptions: DroneSearchState;
  isHistory: boolean;
}

const Summary: React.FC<SummaryPageProps> = ({
  selectedOptions,
  isHistory,
}) => {
  const [summary, setSummary] = useState<ReactNode[]>();
  useEffect(() => {
    generateSearchDescription();
  }, [selectedOptions]); // Call generateSearchDescription whenever selectedOptions change

  const generateSearchDescription = () => {
    const getDescription = (
      category: string,
      optionValue: string,
      optionLabel: string
    ) => {
      return selectedOptions[category] === optionValue ? (
        <motion.span
          className="mr-4 underline"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          key={optionLabel}
        >
          {optionLabel}
        </motion.span>
      ) : undefined;
    };

    const descriptions: ReactNode[] = [];

    // Append description for "Budget" category
    const budgetDescription =
      getDescription("selectedPriceRanges", "0-99", "costs less than $99") ||
      getDescription("selectedPriceRanges", ">99", "costs more than $99");
    if (budgetDescription) descriptions.push(budgetDescription);

    // Append description for "Camera Quality" category
    const cameraDescription =
      getDescription(
        "selectedCameraQuality",
        "basic_camera",
        "with a basic camera"
      ) ||
      getDescription(
        "selectedCameraQuality",
        "higher_resolution_camera",
        "with a higher resolution camera"
      );
    if (cameraDescription) descriptions.push(cameraDescription);

    // Append description for "Flight Time" category
    const flightTimeDescription =
      getDescription(
        "selectedFlightTime",
        "short_flight_time",
        "with short flight time"
      ) ||
      getDescription(
        "selectedFlightTime",
        "medium_flight_time",
        "with medium flight time"
      ) ||
      getDescription(
        "selectedFlightTime",
        "long_flight_time",
        "with long flight time"
      );
    if (flightTimeDescription) descriptions.push(flightTimeDescription);

    // Append description for "Ease of Use" category
    const easeOfUseDescription =
      getDescription(
        "selectedEaseOfUse",
        "beginner_friendly",
        "which are beginner-friendly"
      ) ||
      getDescription(
        "selectedEaseOfUse",
        "intermediate",
        "which are intermediate level"
      ) ||
      getDescription("selectedEaseOfUse", "advanced", "which are advanced");
    if (easeOfUseDescription) descriptions.push(easeOfUseDescription);

    // Append description for "Portability" category
    const portabilityDescription =
      getDescription(
        "selectedPortability",
        "compact_portable",
        "compact and portable"
      ) ||
      getDescription(
        "selectedPortability",
        "size_is_not_a_concern",
        "where size is not a concern"
      );
    if (portabilityDescription) descriptions.push(portabilityDescription);

    // Append description for "Battery Type" category
    const batteryTypeDescription =
      getDescription(
        "selectedBatteryType",
        "lithium_polymer",
        "with LiPo (Lithium Polymer) battery"
      ) ||
      getDescription(
        "selectedBatteryType",
        "lithium_ion",
        "with Li-ion (Lithium-ion) battery"
      );
    if (batteryTypeDescription) descriptions.push(batteryTypeDescription);

    // Append description for "Charging Time" category
    const chargingTimeDescription =
      getDescription(
        "selectedChargingTime",
        "fast_charging",
        "can do fast charging (less than 1 hour)"
      ) ||
      getDescription(
        "selectedChargingTime",
        "standard_charging",
        "can do standard charging (1-2 hours)"
      );
    if (chargingTimeDescription) descriptions.push(chargingTimeDescription);

    // Append description for "selectedBatteryLife" category
    const batteryLifeDescription =
      getDescription(
        "selectedBatteryLife",
        "standard_battery_life",
        "with standard battery life (around 15-20 minutes)"
      ) ||
      getDescription(
        "selectedBatteryLife",
        "extended_battery_life",
        "with extended battery life (20-30 minutes)"
      ) ||
      getDescription(
        "selectedBatteryLife",
        "long_battery_life",
        "with long battery life (30 minutes or more)"
      );
    if (batteryLifeDescription) descriptions.push(batteryLifeDescription);

    // Combine descriptions into the summary
    // const summary = `${descriptions.join(", ")}${
    //   descriptions.length ? ", " : ""
    // }...`;
    setSummary(descriptions);
  };

  return (
    <>
      <span className={`${!isHistory && "text-2xl"}`}>
        {!isHistory && (
          <span className="flex items-center justify-center w-full h-4 md:h-10">
            <p
              className={cn(
                "text-transparent md:text-7xl text-2xl bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase",
                roboto_mono.className
              )}
            >
              Exploring drones
            </p>
          </span>
        )}
        <div className="my-2">{summary}</div>
      </span>
    </>
  );
};

export default Summary;
