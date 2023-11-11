import { client } from "@/lib/sanity/sanity.client";
import { AllEvents } from "@components/events/EventDetails";
import { groq } from "next-sanity";

const query = groq`
*[_type=="event" && !(_id match "drafts.**")] {
  ...  
} | order(_updatedAt desc)[0..5]
`;

const Events = async () => {
  const events_from_cms: EventData[] = await client.fetch(query);
  return (
    <>
      <AllEvents allevents={events_from_cms} />
    </>
  );
};

export default Events;
