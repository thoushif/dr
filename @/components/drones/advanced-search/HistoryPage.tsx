"use client";
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
        </div>
      ))}
    </>
  ) : null;
};

export default HistoryPage;
