import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  allEventsQueryDefaultSort,
  freeEventsQuery,
  privateEventsQuery,
  privateFreeEventsQuery,
} from "./sanity/sanity.queries";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getQueryByFiltersFromURL = (
  filter: string | string[] | undefined
) => {
  if (filter && filter.includes("Free") && filter.includes("Private")) {
    return privateFreeEventsQuery;
  } else if (filter && filter.includes("Free")) {
    return freeEventsQuery;
  } else if (filter && filter.includes("Private")) {
    return privateEventsQuery;
  }
  return allEventsQueryDefaultSort;
};

export const getQueryBySortFromURL = (sort: string | undefined) => {
  if (sort && sort.includes("Free") && sort.includes("Private")) {
    return privateFreeEventsQuery;
  } else if (sort && sort.includes("Free")) {
    return freeEventsQuery;
  } else if (sort && sort.includes("Private")) {
    return privateEventsQuery;
  }
  return allEventsQueryDefaultSort;
};
