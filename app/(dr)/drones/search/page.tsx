import SearchHome from "@/components/drones/advanced-search/SearchHome";
import DroneSearch from "@/components/drones/search/DroneSearch";
import React from "react";

const Search = () => {
  const drones: DroneThumbnail[] | undefined = undefined;
  console.log(drones);
  return (
    <div>
      <DroneSearch drones={drones} brand={""} />
    </div>
  );
};

export default Search;
