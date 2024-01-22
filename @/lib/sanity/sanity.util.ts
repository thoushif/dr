import { client } from "@/lib/sanity/sanity.client";
import page from "@app/(dr)/drones/compare/page";

import {
  queryForApprovedGalleryImages,
  queryForFeaturedDrones,
  queryForGalleryImage,
  queryForHomePagePost,
  queryForLatestGalleryImages,
  queryForPostCategories,
  queryForPosts,
} from "./sanity.queries";

const DEBOUNCE_DELAY = 300;
const debounceAsync = (
  func: (...args: any[]) => Promise<any>,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return async (...args: any[]) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    if (delay === 0) {
      // If delay is set to 0, execute the function immediately
      return func(...args);
    }

    return new Promise<any>(async (resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await func(...args);
        resolve(result);
      }, delay);
    });
  };
};

export const getEvents = debounceAsync(async (query: string) => {
  const events_from_cms: EventData[] = await client.fetch(query);
  return events_from_cms;
}, DEBOUNCE_DELAY);

export const getGallery = debounceAsync(
  async (pageIndex: number): Promise<Photo[] | null> => {
    console.log("caallin gwith page Indes=====>", pageIndex);
    const photos: Photo[] = await client.fetch(queryForApprovedGalleryImages, {
      pageIndex,
    });
    return photos;
  },
  DEBOUNCE_DELAY
);

export const getGallerySinglePhoto = debounceAsync(
  async (photoId: string): Promise<Photo | null> => {
    console.log("fecthing photo", photoId);
    const photo: Photo = await client.fetch(queryForGalleryImage, {
      photoId,
    });
    return photo;
  },
  DEBOUNCE_DELAY
);

export const getHotGallery = debounceAsync(
  async (): Promise<Photo[] | null> => {
    const photos: Photo[] = await client.fetch(queryForLatestGalleryImages);
    return photos;
  },
  DEBOUNCE_DELAY
);

export const getHomePagePosts = debounceAsync(
  async (): Promise<Post[] | null> => {
    const posts: Post[] = await client.fetch(queryForHomePagePost);
    return posts;
  },
  DEBOUNCE_DELAY
);

export const getPosts = debounceAsync(async (): Promise<Post[] | null> => {
  const posts: Post[] = await client.fetch(queryForPosts);
  return posts;
}, DEBOUNCE_DELAY);

export const getPostCategories = debounceAsync(
  async (): Promise<Category[] | null> => {
    const categories: Category[] = await client.fetch(queryForPostCategories);
    return categories;
  },
  DEBOUNCE_DELAY
);

export const getFeaturedDrones = debounceAsync(
  async (cat: string): Promise<Drone[] | null> => {
    const drones: Drone[] = await client.fetch(queryForFeaturedDrones, cat);
    return drones;
  },
  DEBOUNCE_DELAY
);

export const getManufacturers = debounceAsync(
  async (): Promise<Drone[] | null> => {
    const drones: Drone[] = await client.fetch(queryForFeaturedDrones);
    return drones;
  },
  DEBOUNCE_DELAY
);

export const getSearchedDrones = debounceAsync(
  async (searchQuery): Promise<Drone[] | null> => {
    const drones: Drone[] = await client.fetch(searchQuery);
    return drones;
  },
  DEBOUNCE_DELAY
);

export const getDronesDetails = debounceAsync(
  async (query: string, params): Promise<Drone | null> => {
    const drone: Drone = await client.fetch(query, params);
    return drone;
  },
  DEBOUNCE_DELAY
);

export const getDronesOtherImages = debounceAsync(
  async (query: string, params): Promise<Drone | null> => {
    const drone: Drone = await client.fetch(query, params);
    return drone;
  },
  0
);
