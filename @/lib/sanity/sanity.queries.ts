import { groq } from "next-sanity";
// && !(_id match "drafts.**")
const DEFAULT_SORT = "| order(dateTime.start desc)";
const POPULAR_SORT = DEFAULT_SORT;
const DEFAULT_PAGE_SIZE = 10;

const getQuery = (filter: string, sort: string, pageSize: number) => {
  return groq`
  *[_type=="event" ${filter}] {
    ...
  } ${sort}[0..${pageSize}]
  `;
};

export const allEventsQueryDefaultSort = getQuery(``, DEFAULT_SORT, DEFAULT_PAGE_SIZE);
export const freeEventsQuery = getQuery(
  ` && additionalDetails.entryFee =="0"`,
  DEFAULT_SORT,
  DEFAULT_PAGE_SIZE
);
export const privateEventsQuery = getQuery(
  ` && eventType=="private"`,
  DEFAULT_SORT,
  DEFAULT_PAGE_SIZE
);
export const privateFreeEventsQuery = getQuery(
  ` && additionalDetails.entryFee =="0"  && eventType=="private"`,
  DEFAULT_SORT,
  DEFAULT_PAGE_SIZE
);
