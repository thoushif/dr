import { initialSearchState } from "@/lib/utils";
import React, { createContext, useContext, useState } from "react";

interface DroneSearchContextProps {
  appliedGlobalSearch: DroneSearchState;
  setAppliedGlobalSearch: React.Dispatch<
    React.SetStateAction<DroneSearchState>
  >;
  appliedBrand: string | undefined;
  setAppliedBrand: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const DroneSearchContext = createContext<DroneSearchContextProps | undefined>(
  undefined
);

export const DroneSearchProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [appliedGlobalSearch, setAppliedGlobalSearch] =
    useState<DroneSearchState>(initialSearchState);
  const [appliedBrand, setAppliedBrand] = useState<string>();

  return (
    <DroneSearchContext.Provider
      value={{
        appliedGlobalSearch,
        setAppliedGlobalSearch,
        appliedBrand,
        setAppliedBrand,
      }}
    >
      {children}
    </DroneSearchContext.Provider>
  );
};

export const useDroneSearch = (): DroneSearchContextProps => {
  const context = useContext(DroneSearchContext);

  if (!context) {
    throw new Error("useDroneSearch must be used within a DroneSearchProvider");
  }

  return context;
};
