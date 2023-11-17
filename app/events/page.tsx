import { getEvents } from "@/lib/sanity/sanity.util";
import { getQueryByFiltersFromURL } from "@/lib/utils";
import { AllEvents } from "@components/events/EventDetails";
import { ReadonlyURLSearchParams } from "next/navigation";

const Events = async ({
  searchParams,
}: {
  searchParams: {
    filter: string | undefined;
    sort: string | undefined;
    categories: string | undefined;
  };
}) => {
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
