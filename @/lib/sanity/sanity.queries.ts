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
const PHOTOS_PER_PAGE = 8;
export const queryForApprovedGalleryImages = groq`
*[_type == "gallery" &&
!(_id in path("drafts.**")) && approved == true ] {
  _id,
  _createdAt,
  image,
  nickname,
  email,
  caption,
  taken_by ->{
    aircraft {
      name
    }
  }
}[($pageIndex * ${PHOTOS_PER_PAGE})...($pageIndex + 1) * ${PHOTOS_PER_PAGE}]
 | order(_createdAt desc)
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

export const queryForGalleryImage = groq`
*[_type=="gallery" && approved == true && _id == $photoId] {
  _id,
  _createdAt,
  image,
  taken_by ->{
    aircraft {
      name
    }
  }
} | order(_createdAt desc)[0]
`;

export const queryForHomePagePost = groq`
*[_type == "post"  && ("news" in categories[]->title || "homepage" in categories[]->title)] {
  ...,
  author->,
  categories[]->,
} | order(_createdAt desc) [0..1]
`;

export const queryForPosts = groq`
*[_type=="post" ] {
  ...,
  author->,
  categories[]->,
} | order(_createdAt desc) [0..11]
`;

export const queryForPostCategories = groq`
*[_type == "category"] {
  ...
} | order(_createdAt desc) 
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
    // console.log(existingSubscribers);
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

export async function saveNewsLetterUnsubscribeData(
  email: string
): Promise<void> {
  try {
    // Check if the email is subscribed
    const existingSubscriber = await client.fetch(
      '*[_type == "newsletter" && email == $email && isSubscribed == true]',
      {
        email: email,
      }
    );

    if (existingSubscriber.length === 0) {
      throw new Error("No email subscription exists");
    }

    // If email is subscribed, update the data
    const result = await client
      .patch(existingSubscriber[0]._id)
      .set({
        isSubscribed: false,
        // unsubscribedOn: new Date().toISOString(), // Use the current date as unsubscribedOn value
      })
      .commit();
  } catch (error) {
    throw error;
  }
}
