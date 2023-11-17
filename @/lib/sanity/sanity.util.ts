import { client } from "@/lib/sanity/sanity.client";

export const getEvents = async (query: string): Promise<EventData[] | null> => {
  const events_from_cms: EventData[] = await client.fetch(query);
  // console.log(events_from_cms);
  return events_from_cms;
};
