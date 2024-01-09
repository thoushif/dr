import SearchHome from "@/components/drones/advanced-search/SearchHome";
import DroneSearch from "@/components/drones/search/DroneSearch";
import React from "react";

const Search = () => {
  return (
    <div>
      <DroneSearch drones={undefined} brand={""} />
    </div>
  );
};

export default Search;
