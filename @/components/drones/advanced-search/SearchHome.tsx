"use client";
import { Button } from "@/components/ui/button";
import { initialSearchState } from "@/lib/utils";
import React, { useState } from "react";
import { useEffect } from "react";
import droneOptions from "./droneOptions.json";
import DroneSelectionPage from "./DroneSelectionPage";
import HistoryPage from "./HistoryPage";
import ResultPage from "./ResultPage";
import Summary from "./Summary";

const SearchHome: React.FC = () => {
  const [selectedOptions, setSelectedOptions] =
    useState<DroneSearchState>(initialSearchState);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const advanceSearchOptions = droneOptions.useCases.filter(
    (a) => a.in_advanced_search
  );
  const handleOptionSelect = (
    category: keyof DroneSearchState,
    value: string
  ) => {
    setSelectedOptions((prevOptions) => {
      // Create a copy of prevOptions
      const updatedOptions: DroneSearchState = { ...prevOptions };

      // Update the selected category with the new value
      updatedOptions[category] = value;

      // Return the updated options
      return updatedOptions;
    });

    setCurrentPage((prevPage) => prevPage + 1);
  };

  const resetSelection = () => {
    setSelectedOptions(initialSearchState);
    setCurrentPage(0);
  };

  const renderPage = () => {
    if (currentPage === advanceSearchOptions.length) {
      // Display the result page when all options are selected
      return (
        <ResultPage
          selectedOptions={selectedOptions}
          resetSelection={resetSelection}
        />
      );
    } else {
      // Display the drone selection page
      const currentCategory = advanceSearchOptions[currentPage];
      return (
        <>
          <Summary selectedOptions={selectedOptions} isHistory={false} />
          <DroneSelectionPage
            currentPage={currentPage}
            key={currentCategory.category}
            category={currentCategory}
            onSelect={handleOptionSelect}
            selectedOptions={selectedOptions}
            resetSelection={resetSelection}
          />
          <HistoryPage />
        </>
      );
    }
  };

  return <div>{renderPage()}</div>;
};

export default SearchHome;
