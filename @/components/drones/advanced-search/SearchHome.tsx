"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useEffect } from "react";
import droneOptions from "./droneOptions.json";
import DroneSelectionPage from "./DroneSelectionPage";
import HistoryPage from "./HistoryPage";
import ResultPage from "./ResultPage";
import Summary from "./Summary";

interface SelectedOptions {
  [key: string]: string;
}

const SearchHome: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleOptionSelect = (category: string, value: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [category]: value,
    }));
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const resetSelection = () => {
    setSelectedOptions({});
    setCurrentPage(0);
  };

  const renderPage = () => {
    if (currentPage === droneOptions.useCases.length) {
      // Display the result page when all options are selected
      return (
        <ResultPage
          selectedOptions={selectedOptions}
          resetSelection={resetSelection}
        />
      );
    } else {
      // Display the drone selection page
      const currentCategory = droneOptions.useCases[currentPage];
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
