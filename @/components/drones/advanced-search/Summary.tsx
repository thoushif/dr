import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { roboto_mono } from "@/lib/utils/fonts";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MdOutlineManageSearch } from "react-icons/md";

type SelectedOptions = {
  [key: string]: string;
};

interface SummaryPageProps {
  selectedOptions: SelectedOptions;
  isHistory: boolean;
}

const Summary: React.FC<SummaryPageProps> = ({
  selectedOptions,
  isHistory,
}) => {
  const [summary, setSummary] = useState<string>("");
  useEffect(() => {
    console.log("selected Options changed..........", selectedOptions);
    generateSearchDescription();
  }, [selectedOptions]); // Call generateSearchDescription whenever selectedOptions change

  const generateSearchDescription = () => {
    console.log("called generateSearchDescription");

    const getDescription = (
      category: string,
      optionValue: string,
      optionLabel: string
    ) => {
      return selectedOptions[category] === optionValue
        ? optionLabel
        : undefined;
    };

    const descriptions: string[] = [];

    // Append description for "Budget" category
    const budgetDescription =
      getDescription("Budget", "price_less_than_99", "costs less than $99") ||
      getDescription("Budget", "price_more_than_99", "costs more than $99");
    if (budgetDescription) descriptions.push(budgetDescription);

    // Append description for "Camera Quality" category
    const cameraDescription =
      getDescription("Camera Quality", "basic_camera", "with a basic camera") ||
      getDescription(
        "Camera Quality",
        "higher_resolution_camera",
        "with a higher resolution camera"
      );
    if (cameraDescription) descriptions.push(cameraDescription);

    // Append description for "Flight Time" category
    const flightTimeDescription =
      getDescription(
        "Flight Time",
        "short_flight_time",
        "with short flight time"
      ) ||
      getDescription(
        "Flight Time",
        "medium_flight_time",
        "with medium flight time"
      ) ||
      getDescription(
        "Flight Time",
        "long_flight_time",
        "with long flight time"
      );
    if (flightTimeDescription) descriptions.push(flightTimeDescription);

    // Append description for "Ease of Use" category
    const easeOfUseDescription =
      getDescription(
        "Ease of Use",
        "beginner_friendly",
        "which are beginner-friendly"
      ) ||
      getDescription(
        "Ease of Use",
        "intermediate",
        "which are intermediate level"
      ) ||
      getDescription("Ease of Use", "advanced", "which are advanced");
    if (easeOfUseDescription) descriptions.push(easeOfUseDescription);

    // Append description for "Portability" category
    const portabilityDescription =
      getDescription(
        "Portability",
        "compact_portable",
        "compact and portable"
      ) ||
      getDescription(
        "Portability",
        "size_not_concern",
        "where size is not a concern"
      );
    if (portabilityDescription) descriptions.push(portabilityDescription);

    // Append description for "Battery Type" category
    const batteryTypeDescription =
      getDescription(
        "Battery Type",
        "lipo",
        "with LiPo (Lithium Polymer) battery"
      ) ||
      getDescription(
        "Battery Type",
        "li_ion",
        "with Li-ion (Lithium-ion) battery"
      );
    if (batteryTypeDescription) descriptions.push(batteryTypeDescription);

    // Append description for "Charging Time" category
    const chargingTimeDescription =
      getDescription(
        "Charging Time",
        "fast_charging",
        "can do fast charging (less than 1 hour)"
      ) ||
      getDescription(
        "Charging Time",
        "standard_charging",
        "can do standard charging (1-2 hours)"
      );
    if (chargingTimeDescription) descriptions.push(chargingTimeDescription);

    // Append description for "Battery Life" category
    const batteryLifeDescription =
      getDescription(
        "Battery Life",
        "standard_battery_life",
        "with standard battery life (around 15-20 minutes)"
      ) ||
      getDescription(
        "Battery Life",
        "extended_battery_life",
        "with extended battery life (20-30 minutes)"
      ) ||
      getDescription(
        "Battery Life",
        "long_battery_life",
        "with long battery life (30 minutes or more)"
      );
    if (batteryLifeDescription) descriptions.push(batteryLifeDescription);

    // Combine descriptions into the summary
    const summary = `${descriptions.join(", ")}${
      descriptions.length ? ", " : ""
    }...`;
    setSummary(summary);
  };

  return (
    <>
      <span className={`${!isHistory && "text-2xl"}`}>
        {!isHistory && (
          <span className="flex items-center justify-center w-full h-10 my-10">
            <p
              className={cn(
                "text-transparent text-7xl bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase",
                roboto_mono.className
              )}
            >
              Exploring drones
            </p>
          </span>
        )}
        {summary}
      </span>
    </>
  );
};

export default Summary;
