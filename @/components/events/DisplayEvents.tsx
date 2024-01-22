import { Calendar } from "@/components/ui/calendar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DayClickEventHandler } from "react-day-picker";
import EventDetailsContainer from "./EventDetailsContainer";
type DisplayEventsProps = {
  allevents: EventData[] | null;
};

const DisplayEvents: React.FC<DisplayEventsProps> = ({ allevents }) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());
  const [filteredEvents, setFilteredEvents] = useState<
    EventData[] | undefined | null
  >(allevents);

  const handleDayClick: DayClickEventHandler = (day) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    if (selectedDay) {
      const filtered = allevents?.filter((event) => {
        const selectedDateTime = selectedDay?.getTime() || 0;
        const eventStart = new Date(event.dateTime.start).getTime();
        const eventEnd = new Date(event.dateTime.end).getTime();

        return selectedDateTime >= eventStart && selectedDateTime <= eventEnd;
      });

      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(allevents);
    }
  }, [selectedDay, allevents]);
  // Extract and convert date ranges from the events
  const eventRanges = allevents?.map((event) => ({
    from: new Date(event.dateTime.start),
    to: new Date(event.dateTime.end),
  }));

  // Combine all selected dates from different ranges
  const selectedDates = eventRanges?.reduce(
    (dates, range) => [
      ...dates,
      ...Array.from(
        {
          length:
            (range.to.getTime() - range.from.getTime()) /
              (24 * 60 * 60 * 1000) +
            1,
        },
        (_, index) =>
          new Date(range.from.getTime() + index * 24 * 60 * 60 * 1000)
      ),
    ],
    [] as Date[]
  );

  return (
    <>
      <div>
        <Calendar
          selected={selectedDates}
          numberOfMonths={3} // Customize the number of months displayed
          onDayClick={handleDayClick}
        />
      </div>

      <Link
        href={"/events/add"}
        className="px-8 py-5 text-center text-white rounded-md bg-slate-500 hover:bg-slate-700 "
      >
        Event Organizer? - ➕ You can add a new event info here!!
      </Link>
      <div>
        <EventDetailsContainer
          filteredEvents={filteredEvents}
          selectedDay={selectedDay}
        />
      </div>
    </>
  );
};

export default DisplayEvents;
