"use client";
import React, { useState } from "react";

interface DisplayDroneDescriptionProps {
  description: string;
  limit: number;
  showMoreAllowed: boolean;
}

const DisplayDroneDescription: React.FC<DisplayDroneDescriptionProps> = ({
  description,
  limit,
  showMoreAllowed,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle the display of the full description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Display the first 500 characters or the full description based on the state
  const displayText = showFullDescription
    ? description
    : description.slice(0, limit);

  return (
    <>
      <p className="text-slate-900">
        {displayText}
        {description.length > limit && "..."}

        {description.length > limit && showMoreAllowed && (
          <button onClick={toggleDescription}>
            {showFullDescription ? " Show Less" : "Show More"}
          </button>
        )}
      </p>
    </>
  );
};

export default DisplayDroneDescription;
