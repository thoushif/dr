import { groq } from "next-sanity";
// && !(_id match "drafts.**")
const DEFAULT_SORT = "| order(dateTime.start desc)";
const POPULAR_SORT = DEFAULT_SORT;
const DEFAULT_PAGE_SIZE = 10;

/***EVENTS QUERY */

const getEventsBaseQuery = (filter: string, sort: string, pageSize: number) => {
  return groq`
  *[_type=="event" ${filter}] {
    ...
  } ${sort}[0..${pageSize}]
  `;
};

export const allEventsQueryDefaultSort = getEventsBaseQuery(
  ``,
  DEFAULT_SORT,
  DEFAULT_PAGE_SIZE
);
export const freeEventsQuery = getEventsBaseQuery(
  ` && additionalDetails.entryFee =="0"`,
  DEFAULT_SORT,
  DEFAULT_PAGE_SIZE
);
export const privateEventsQuery = getEventsBaseQuery(
  ` && isPrivateEvent==true`,
  DEFAULT_SORT,
  DEFAULT_PAGE_SIZE
);
export const privateFreeEventsQuery = getEventsBaseQuery(
  ` && additionalDetails.entryFee =="0"  && isPrivateEvent==true`,
  DEFAULT_SORT,
  DEFAULT_PAGE_SIZE
);

/********DRONES */
export const getDronesBaseQuery = (
  filter: string,
  pageSize = DEFAULT_PAGE_SIZE
) => {
  return groq`
*[_type=="drone" ${filter}] {
  _id,
  _createdAt,
  "name":aircraft.name,
  "manufacturer":aircraft.manufacturer,
  drone_image-> {
    image
  }
} | order(_createdAt desc)[0..${pageSize}]
`;
};
export const queryForDrones = getDronesBaseQuery("");
export const queryForFeaturedDrones = getDronesBaseQuery(
  `&& featured == true`,
  2
);

export const queryForDrone = groq`
*[_type=="drone"  && _id == $documentId] {
  ...,
  drone_image-> {
    image,
    coordinates
  }
}
`;

export const queryForDroneOtherImages = groq`
*[_type == "drone" && _id == $droneId] {
    "image": images[(caption == $caption)][0] {
      ...
    }
  }[0]
`;

export const queryForApprovedGalleryImages = groq`
*[_type=="gallery" && approved == true] {
  _id,
  _createdAt,
  image,
  taken_by ->{
    aircraft {
      name
    }
  }
} | order(_createdAt desc)[0..29]
`;
