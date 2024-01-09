// import { getEvents } from "@/lib/sanity/sanity.util";
// import { getQueryByFiltersFromURL } from "@/lib/sanity/queryMaker";
// import { AllEvents } from "@/components/events/EventDetails";
// import ComingSoon from "@/components/ComingSoon";

// type Props = {
//   searchParams: {
//     [key: string]: string;
//   };
// };
// export const dynamic = "force-dynamic";
// const Events = async ({ searchParams }: Props) => {
//   const filterValue = searchParams.filter;
//   const query = getQueryByFiltersFromURL(filterValue);
//   const events = await getEvents(query);

//   return (
//     <>
//       {/* <AllEvents events={events} /> */}
//       <ComingSoon />
//     </>
//   );
// };

// export default Events;

import ComingSoon from "@/components/ComingSoon";

const Events = async () => {
  return (
    <>
      <ComingSoon />
    </>
  );
};

export default Events;
