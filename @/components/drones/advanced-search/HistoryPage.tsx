"use client";
import { useDroneSearch } from "@/contexts/DroneSearchProvider";
import { initialSearchState } from "@/lib/utils";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Summary from "./Summary";

// Function to retrieve the recent searches from localStorage
const getRecentSearches = (): [] => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  } else {
    return [];
  }
};
const HistoryPage = () => {
  const { appliedGlobalSearch, setAppliedGlobalSearch } = useDroneSearch();
  const router = useRouter();

  const continueToFullSearch = (selectedOptions: DroneSearchState) => {
    const updatedSearch = _.cloneDeep(initialSearchState);
    // get the choices in the selected options till now
    console.log("uptill now appliedGlobalSearch", appliedGlobalSearch);
    console.log("uptill now selectedOptions", selectedOptions);
    // Loop through each category in selectedOptions
    Object.keys(selectedOptions).forEach((cat) => {
      // Check if the selected option is not already in the array
      const selectedOption = selectedOptions[cat];
      if (
        selectedOption.length > 0 &&
        !updatedSearch[cat].includes(selectedOption)
      ) {
        // Update the corresponding category in updatedSearch
        updatedSearch[cat].push(selectedOption);
      } else {
        // Remove the field if it's empty
        delete updatedSearch[cat];
      }
    });

    console.log("after merging appliedGlobalSearch", appliedGlobalSearch);
    // set to global search again
    setAppliedGlobalSearch(updatedSearch);
    router.push("/drones/search/all");
  };
  const [pastSearches, setPastSearches] = useState<any[]>([]);
  useEffect(() => {
    setPastSearches(getRecentSearches());
  }, []);
  return getRecentSearches().length > 0 ? (
    <>
      <span className="text-lg font-bold">Your Past Searches</span>
      {pastSearches.map(({ uuid, search }, index) => (
        <div key={uuid} className="flex items-center mt-2 space-x-2">
          <span className="text-gray-500">{index + 1}.</span>
          <Summary selectedOptions={search} isHistory={true} />
          <span
            onClick={() => continueToFullSearch(search)}
            className="cursor-pointer"
          >
            ..search
          </span>
        </div>
      ))}
    </>
  ) : null;
};

export default HistoryPage;
