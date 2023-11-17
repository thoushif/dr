import { getEvents } from "@/lib/sanity/sanity.util";
import { getQueryByFiltersFromURL } from "@/lib/utils";
import { AllEvents } from "@components/events/EventDetails";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};
export const dynamic = "force-dynamic";
const Events = async ({ searchParams }: Props) => {
  const filterValue = searchParams.filter;
  const query = getQueryByFiltersFromURL(filterValue);
  const events = await getEvents(query);

  return (
    <>
      <AllEvents events={events} />
    </>
  );
};

export default Events;
