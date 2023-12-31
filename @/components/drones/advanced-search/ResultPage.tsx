import { Button } from "@/components/ui/button";
import React from "react";
import { useEffect } from "react";
import { MdOutlineRestartAlt } from "react-icons/md";
import Summary from "./Summary";
import { v5 as uuidv5 } from "uuid";

// Assuming this is what your SelectedOptions type looks like
type SelectedOptions = {
  [key: string]: string;
};

interface ResultPageProps {
  selectedOptions: SelectedOptions;
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
  useEffect(() => {
    saveSearch(selectedOptions);
  }, [selectedOptions]);

  return (
    <div>
      <Summary selectedOptions={selectedOptions} isHistory={false} />
      <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
      <Button
        className="w-full text-white bg-slate-600"
        onClick={resetSelection}
      >
        <MdOutlineRestartAlt className="mr-4 text-lg" /> search again
      </Button>
    </div>
  );
};

export default ResultPage;
