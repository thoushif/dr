import { NewsLetterFormData } from "@/components/events/SchemaZOD";
import { groq } from "next-sanity";
import { client } from "./sanity.client";
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
  10
);

export const queryManufacturers = getDronesBaseQuery(`&& featured == true`, 2);

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

export const queryForLatestGalleryImages = groq`
*[_type=="gallery" && approved == true] {
  _id,
  _createdAt,
  image,
  taken_by ->{
    aircraft {
      name
    }
  }
} | order(_createdAt desc)[0..2]
`;

export async function saveNewsletterData(
  data: NewsLetterFormData
): Promise<void> {
  try {
    // Check if the email is already subscribed
    const existingSubscribers = await client.fetch(
      '*[_type == "newsletter" && email == $email && isSubscribed == true]',
      {
        email: data.email,
      }
    );
    console.log(existingSubscribers);
    if (existingSubscribers.length > 0) {
      throw new Error("Email is already subscribed");
    }

    // If email is not subscribed, save the data
    const result = await client.create({
      _type: "newsletter",
      name: data.name,
      email: data.email,
      subscribedOn: new Date().toISOString(), // Use the current date as subscribedOn value
      isSubscribed: true, // Set isSubscribed to true
    });
  } catch (error) {
    throw error;
  }
}
