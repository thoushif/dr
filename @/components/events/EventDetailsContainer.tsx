import { EventDetails } from "./EventDetails";

const EventDetailsContainer: React.FC<{
  filteredEvents: EventData[] | undefined | null;
  selectedDay: Date | null;
}> = ({ filteredEvents, selectedDay }) => {
  return (
    <>
      {selectedDay && <p>Events on {selectedDay?.toDateString()}:</p>}
      <div>
        {filteredEvents &&
          filteredEvents.map((event: EventData) => (
            <EventDetails key={event._id} event={event} isDraft={false} />
          ))}
      </div>
    </>
  );
};
export default EventDetailsContainer;
