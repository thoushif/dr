import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const initialSearchState: DroneSearchState = {
  selectedBatteryType: [],
  selectedBatteryLife: [],
  selectedCameraQuality: [],
  selectedCategories: [],
  selectedChargingTime: [],
  selectedCompatibility: [],
  selectedEaseOfUse: [],
  selectedFlightTime: [],
  selectedPortability: [],
  selectedPriceRanges: [],
  selectedRatings: [],
  selectedReviews: [],
  selectedUsage: [],
  selectedWeightClasses: [],
};
