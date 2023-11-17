import React from "react";
import { EventDetails } from "./EventDetails";
type AllEventsProps = {
  allevents: EventData[] | null;
};

export const DisplayEvents: React.FC<AllEventsProps> = ({ allevents }) => {
  return (
    <>
      {allevents?.map((event: EventData) => (
        <EventDetails key={event._id} event={event} />
      ))}
    </>
  );
};

export default DisplayEvents;
