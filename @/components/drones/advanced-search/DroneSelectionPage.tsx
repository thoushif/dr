"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MdFlightTakeoff, MdOutlineRestartAlt } from "react-icons/md";
import { useDroneSearch } from "@/contexts/DroneSearchProvider";
import { initialSearchState } from "@/lib/utils";
import _ from "lodash";

interface Choice {
  label: string;
  value: string;
}

interface Category {
  category: string;
  category_value: string;
  choices: Choice[];
}

interface ChoiceButtonProps {
  choice: Choice;
  category: Category;
  onSelect: (category: string, value: string) => void;
}

const variants = {
  visible: { opacity: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0 },
};

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  category,
  onSelect,
}) => {
  return (
    <motion.div
      key={choice.value}
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ scale: [1, 1.05] }}
      className="h-40 mb-8 md:h-96"
    >
      <button
        onClick={() => onSelect(category.category_value, choice.value)}
        className="w-full h-full p-4 my-2 border border-gray-300 md:text-4xl text:lg bg-gradient-to-tr from-slate-200 to-slate-300"
      >
        {choice.label}
      </button>
    </motion.div>
  );
};

interface DroneSelectionPageProps {
  currentPage: number;
  category: Category;
  onSelect: (category: string, value: string) => void;
  selectedOptions: DroneSearchState;
  resetSelection: () => void;
}

const DroneSelectionPage: React.FC<DroneSelectionPageProps> = ({
  currentPage,
  category,
  onSelect,
  selectedOptions,
  resetSelection,
}) => {
  const {  setAppliedGlobalSearch } = useDroneSearch();
  const router = useRouter();

  const continueToFullSearch = () => {
    const updatedSearch = _.cloneDeep(initialSearchState);
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
      }
    });

    // set to global search again
    setAppliedGlobalSearch(updatedSearch);
    router.push("/drones/search/all");
  };

  return (
    <div>
      <div className="grid grid-flow-col gap-4">
        {category.choices.map((choice) => (
          <ChoiceButton
            key={choice.value}
            choice={choice}
            category={category}
            onSelect={onSelect}
          />
        ))}
      </div>

      <hr />
      {currentPage > 0 && (
        <div className="flex flex-row gap-4">
          <Button
            className="w-full text-white bg-slate-600"
            onClick={resetSelection}
          >
            <MdOutlineRestartAlt className="mr-4 text-lg" /> Start Over
          </Button>
          <Button
            className="w-full text-white bg-slate-600"
            onClick={continueToFullSearch}
          >
            <MdFlightTakeoff className="mr-4 text-lg" /> Continue in full search
          </Button>
        </div>
      )}
    </div>
  );
};

export default DroneSelectionPage;
