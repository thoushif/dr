import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useEffect } from "react";
import { MdFlightTakeoff, MdOutlineRestartAlt } from "react-icons/md";
import Summary from "./Summary";
import { v5 as uuidv5 } from "uuid";
import { getQueryByDroneSearch } from "@/lib/sanity/queryMaker";
import { useDroneSearch } from "@/contexts/DroneSearchProvider";
import { getSearchedDrones } from "@/lib/sanity/sanity.util";
import DisplayDroneThumbNails from "../DisplayDroneThumbNails";
import { useRouter } from "next/navigation";
import { initialSearchState } from "@/lib/utils";
import _ from "lodash";

// Assuming this is what your SelectedOptions type looks like
type SelectedOptions = {
  [key: string]: string;
};

interface ResultPageProps {
  selectedOptions: DroneSearchState;
  resetSelection: () => void;
}

// Function to generate a UUID for a search
const generateUuidForSearch = (search: any): string => {
  const jsonStr = JSON.stringify(search);
  const namespace = "1b671a64-40d5-491e-99b0-da01ff1f3341"; // Use a predefined UUID as a namespace
  return uuidv5(jsonStr, namespace);
};

// Function to save the search in localStorage with a UUID key
const saveSearch = (search: any) => {
  if (localStorage) {
    const searches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const uuid = generateUuidForSearch(search);
    if (!searches.find((item: any) => item.uuid === uuid)) {
      searches.unshift({ uuid, search });
      if (searches.length > 3) {
        searches.pop();
      }
      localStorage?.setItem("recentSearches", JSON.stringify(searches));
    }
  }
};

const ResultPage: React.FC<ResultPageProps> = ({
  selectedOptions,
  resetSelection,
}) => {
  const [results, setResults] = useState<DroneThumbnail[] | undefined>([]);
  const applySearch = async () => {
    saveSearch(selectedOptions);
    const query = getQueryByDroneSearch(selectedOptions, "");
    const drones = await getSearchedDrones(query, 0);

    setResults(drones);
  };

  useEffect(() => {
    applySearch();
  }, [selectedOptions]);
  const router = useRouter();
  const { appliedGlobalSearch, setAppliedGlobalSearch } = useDroneSearch();

  const continueToFullSearch = () => {
    const updatedSearch = _.cloneDeep(initialSearchState);
    // get the choices in the selected options till now
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

    // set to global search again
    setAppliedGlobalSearch(updatedSearch);
    router.push("/drones/search/all");
  };
  return (
    <div>
      <Summary selectedOptions={selectedOptions} isHistory={false} />
      <div className="flex flex-row gap-4">
        <Button
          className="w-full my-4 text-white bg-slate-600"
          onClick={resetSelection}
        >
          <MdOutlineRestartAlt className="mr-4 text-lg" /> search again
        </Button>{" "}
        <Button
          className="w-full my-4 text-white bg-slate-600"
          onClick={continueToFullSearch}
        >
          <MdFlightTakeoff className="mr-4 text-lg" /> Open full search
        </Button>
      </div>
      <DisplayDroneThumbNails drones={results} />
    </div>
  );
};

export default ResultPage;
