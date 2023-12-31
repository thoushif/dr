"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MdFlightTakeoff, MdOutlineRestartAlt } from "react-icons/md";
import { useDroneSearch } from "@/contexts/DroneSearchProvider";

interface Choice {
  label: string;
  value: string;
}

interface Category {
  category: string;
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
      className="mb-8 h-96"
    >
      <button
        onClick={() => onSelect(category.category, choice.value)}
        className="w-full h-full p-4 my-2 text-4xl border border-gray-300 bg-gradient-to-tr from-slate-200 to-slate-300"
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
  selectedOptions: {
    [key: string]: string;
  };
  resetSelection: () => void;
}

const DroneSelectionPage: React.FC<DroneSelectionPageProps> = ({
  currentPage,
  category,
  onSelect,
  selectedOptions,
  resetSelection,
}) => {
  const { appliedGlobalSearch, setAppliedGlobalSearch } = useDroneSearch();
  const router = useRouter();

  const continueToFullSearch = () => {
    const updatedSearch = { ...appliedGlobalSearch };
    console.log(selectedOptions);
    if (selectedOptions.Budget == "price_less_than_99") {
      updatedSearch.selectedPriceRanges = [
        ...updatedSearch.selectedPriceRanges,
        "0-100",
      ];
    }

    // Add more conditions for other selected options if needed

    setAppliedGlobalSearch(updatedSearch);
    router.push("/drones/search");
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
