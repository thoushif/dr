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
export const getQueryByDroneSearch = (data: DroneSearchState) => {
  // if (filter && filter.includes("Free") && filter.includes("Private")) {
  //   return privateFreeEventsQuery;
  // } else if (filter && filter.includes("Free")) {
  //   return freeEventsQuery;
  // } else if (filter && filter.includes("Private")) {
  //   return privateEventsQuery;
  // }
  console.log("search items", data);
  return getDronesBaseQuery("");
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
