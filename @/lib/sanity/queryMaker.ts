import {
  allEventsQueryDefaultSort,
  freeEventsQuery,
  getDronesBaseQuery,
  privateEventsQuery,
  privateFreeEventsQuery,
} from "./sanity.queries";

export const getQueryByFiltersFromURL = (
  filter: string | string[] | undefined
) => {
  if (filter && filter.includes("Free") && filter.includes("Private")) {
    return privateFreeEventsQuery;
  } else if (filter && filter.includes("Free")) {
    return freeEventsQuery;
  } else if (filter && filter.includes("Private")) {
    return privateEventsQuery;
  }
  return allEventsQueryDefaultSort;
};

export const getQueryBySortFromURL = (sort: string | undefined) => {
  if (sort && sort.includes("Free") && sort.includes("Private")) {
    return privateFreeEventsQuery;
  } else if (sort && sort.includes("Free")) {
    return freeEventsQuery;
  } else if (sort && sort.includes("Private")) {
    return privateEventsQuery;
  }
  return allEventsQueryDefaultSort;
};

export const getDefaultEventForForm = () => {
  var today = new Date();
  var aWeekFromToday = new Date();
  aWeekFromToday.setDate(today.getDate() + 7);
  let baseEvent = {
    _id: "12345",
    title: "Drone Racing Championship",
    description: "Experience the thrill of high-speed drone racing!",
    location: {
      name: "Sky Racetrack",
      address: "123 Drone Avenue, Drone City, DC 12345",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    },
    dateTime: {
      start: today,
      end: aWeekFromToday,
    },
    organizer: {
      name: "Drone Enthusiasts Club",
      contactEmail: "info@dronezone.com",
    },
    category: [],
    isPrivateEvent: true,
    eventSiteLink: "https://www.droneclub.com/events/racing-championship",
    eventImage: "",
    additionalDetails: {
      eventCapacity: 100,
      registrationDeadline: "2023-11-25T23:59:59Z",
      entryFee: 20.0,
      prizes: ["1st Place Trophy", "2nd Place Medal", "3rd Place Certificate"],

      entryRequirements: "Submit up to 3 high-resolution photos.",
      judgingCriteria: "Creativity, Composition, Technical Skill",
      speakers: ["Dr. Tech Expert", "Drone Industry Pioneer"],
      topicsCovered: [
        "AI in Drones",
        "Future Trends",
        "Applications in Industry",
      ],
    },
  };
  return baseEvent;
};

// DRONES**********
export const getQueryByDroneSearch = (
  data: DroneSearchState,
  brand: string | undefined
) => {
  const {
    selectedBatteryLife,
    selectedWeightClasses,
    selectedCameraQuality,
    selectedBatteryType,
    selectedChargingTime,
    selectedUsage,
    selectedEaseOfUse,
    selectedFlightTime,
    selectedPortability,
    selectedCompatibility,
    selectedPriceRanges,
  } = data;
  let finalFilter = "";
  if (brand) {
    finalFilter += `&& lower(aircraft.manufacturer) == "${brand}" `;
  }
  const addFilter = (filter: string | undefined) => {
    if (filter) {
      finalFilter += `&& (${filter}) `;
    }
  };

  addFilter(getBatteryLifeFilter(selectedBatteryLife));
  addFilter(getWeightClassesFilter(selectedWeightClasses));
  addFilter(getCameraQualityFilter(selectedCameraQuality));
  addFilter(getBatteryTypeFilter(selectedBatteryType));
  addFilter(getChargingTimeFilter(selectedChargingTime));
  addFilter(getUsageFilter(selectedUsage));
  addFilter(getEaseOfUseFilter(selectedEaseOfUse));
  addFilter(getFlightTimeFilter(selectedFlightTime));
  addFilter(getPortabilityFilter(selectedPortability));
  addFilter(getCompatibilityFilter(selectedCompatibility));
  addFilter(getPriceRangeFilter(selectedPriceRanges));

  // console.log("finalFilter is:", finalFilter);
  return getDronesBaseQuery(finalFilter);
};

const getPriceRangeFilter = (selectedPriceRanges: string[]) => {
  return (
    selectedPriceRanges
      ?.map((priceRange) => {
        switch (priceRange) {
          case "0-99":
            return "aircraft.price >= 0 && aircraft.price < 100";
          case "100-499":
            return "aircraft.price >= 100 && aircraft.price < 500";
          case ">500":
            return "aircraft.price >= 500";
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};

const getBatteryLifeFilter = (selectedBatteryLife: string[]) => {
  return (
    selectedBatteryLife
      ?.map((batteryLife) => {
        switch (batteryLife) {
          case "standard_battery_life":
            return "battery.capacity < 3000";
          case "extended_battery_life":
            return "battery.capacity >= 3000 && battery.capacity <= 9000";
          case "long_battery_life":
            return "battery.capacity > 9000";
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};
const getBatteryTypeFilter = (selectedBatteryType: string[]) => {
  return (
    selectedBatteryType
      ?.map((batteryType) => {
        switch (batteryType) {
          case "lithium_polymer":
            return 'battery.type == "lithium_polymer"';
          case "lithium_ion":
            return 'battery.type == "lithium_ion"';
          case "Other":
            return 'battery.type == "Other"';
          // Add other cases as needed
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};
const getChargingTimeFilter = (selectedChargingTime: string[]) => {
  return (
    selectedChargingTime
      ?.map((chargingTime) => {
        switch (chargingTime) {
          case "fast_charging":
            return 'battery.charging_time == "fast_charging"';
          case "standard_charging":
            return 'battery.charging_time == "standard_charging"';
          // Add other cases as needed
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};

const getWeightClassesFilter = (selectedWeightClasses: string[]) => {
  return (
    selectedWeightClasses
      ?.map((weightClass) => {
        switch (weightClass) {
          case "mini_drones":
            return "aircraft.takeoff_weight < 500";
          case "lightweight":
            return "aircraft.takeoff_weight >= 500 && aircraft.takeoff_weight < 1000";
          case "medium":
            return "aircraft.takeoff_weight >= 1000 && aircraft.takeoff_weight < 3000";
          case "heavy_duty":
            return "aircraft.takeoff_weight >= 3000";
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};
const getCameraQualityFilter = (selectedCameraQuality: string[]) => {
  return (
    selectedCameraQuality
      ?.map((quality) => {
        switch (quality) {
          case "basic_camera":
            return "camera.quality == false";
          case "higher_resolution_camera":
            return "camera.quality == true";
          // Add other cases as needed
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};
const getEaseOfUseFilter = (selectedEaseOfUse: string[]): string => {
  return (
    selectedEaseOfUse
      ?.map((easeOption) => {
        switch (easeOption) {
          case "beginner_friendly":
            return 'aircraft.ease_of_use == "beginner_friendly"';
          case "intermediate":
            return 'aircraft.ease_of_use == "intermediate"';
          case "advanced":
            return 'aircraft.ease_of_use == "advanced"';
          // Add other cases as needed
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};

const getFlightTimeFilter = (selectedFlightTimes: string[]) => {
  return (
    selectedFlightTimes
      ?.map((flightTime) => {
        switch (flightTime) {
          case "short_flight_time":
            return 'flight_specs.flight_time == "short_flight_time"';
          case "medium_flight_time":
            return 'flight_specs.flight_time == "medium_flight_time"';
          case "long_flight_time":
            return 'flight_specs.flight_time == "long_flight_time"';
          // Add other cases as needed
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};

const getUsageFilter = (selectedUsage: string[]) => {
  return (
    selectedUsage
      ?.map((usage) => {
        return `"${usage}" in drone_type[]->name`;
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};
const getCompatibilityFilter = (selectedCompatibility: string[]) => {
  return (
    selectedCompatibility
      ?.map((compatibility) => {
        switch (compatibility) {
          case "vr_headsets":
            return "accessories.fpv_goggles == true";
          case "mobile_devices":
            return "compatibility.mobile_devices == true";
          case "accessories":
            return "accessories.accessories == true";
          // Add other cases as needed
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};

const getPortabilityFilter = (selectedPortability: string[]) => {
  return (
    selectedPortability
      ?.map((portabilityOption) => {
        switch (portabilityOption) {
          case "compact_portable":
            return 'aircraft.portability == "ultra_portable" || aircraft.portability == "travel_friendly"';
          case "size_is_not_a_concern":
            return '!defined(aircraft.portability) || aircraft.portability == "ultra_portable" || aircraft.portability == "travel_friendly" || aircraft.portability == "professional_rig" || aircraft.portability == "modular_design" || aircraft.portability == "industrial_size"';
          default:
            return ""; // Handle other cases if needed
        }
      })
      .filter(Boolean) // Remove empty strings
      .join(" || ") || ""
  );
};

export const camelCaseToWords = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Convert camelCase to camel Case
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
};

export const chainCaseToWords = (str: string) => {
  return str
    .replace(/_/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
};

export const compareDronesKeysMap = [
  {
    table: "aircraft",
    keys: [
      "length_folded",
      "manufacturer",
      "width_folded",
      "height_folded",
      "takeoff_weight",
    ],
  },
  {
    table: "flight_specs",
    keys: ["max_ascent_speed", "max_descent_speed", "max_horizontal_speed"],
  },
  {
    table: "camera",
    keys: ["color_mode", "digital_zoom", "iso_range"],
  },
  {
    table: "gimbal",
    keys: ["mechanical_range", "controllable_range"],
  },
  {
    table: "sensing",
    keys: [
      "sensing_type",
      "forward_measurement_range",
      "forward_detection_range",
    ],
  },
  {
    table: "video_transmission",
    keys: ["video_transmission_system", "live_view_quality"],
  },
  {
    table: "battery",
    keys: ["capacity", "weight", "nominal_voltage"],
  },
  {
    table: "remote_controller",
    keys: ["max_operating_time", "max_supported_mobile_device_size"],
  },
  // Add more tables and their corresponding keys based on the Drone schema
];
