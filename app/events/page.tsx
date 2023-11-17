import { getEvents } from "@/lib/sanity/sanity.util";
import { getQueryByFiltersFromURL } from "@/lib/utils";
import { AllEvents } from "@components/events/EventDetails";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};
const Events = async ({ searchParams }: Props) => {
  console.log("searchParams", searchParams);
  const filterValue = searchParams.filter;
  const query = getQueryByFiltersFromURL(filterValue);
  console.log("qr now ", query);
  const events = await getEvents(query);
  console.log(filterValue);

  return (
    <>
      <AllEvents events={events} />
    </>
  );
};

export default Events;
