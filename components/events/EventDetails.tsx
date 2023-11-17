// EventDetails.tsx
"use client";
import { Button } from "@/components/ui/button";
import urlFor from "@/lib/sanity/urlFor";
import CustomModal from "@components/CustomModal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventFinder from "./EventFinder";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import DisplayEvents from "./DisplayEvents";

type AllEventsProps = {
  events: EventData[] | null;
};

export const AllEvents: React.FC<AllEventsProps> = (events) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const router = useRouter();
  const handleSelectBadge = (badge: string) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(
        selectedBadges.filter((selectedBadge) => selectedBadge !== badge)
      );
    } else {
      setSelectedBadges([...selectedBadges, badge]);
    }
  };

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set("filter", selectedBadges.join(","));
    router.push(`${pathname}?${newParams.toString()}`);
  }, [selectedBadges]);

  return (
    <>
      <div className="flex justify-center space-x-2">
        <EventFinder
          selectedBadges={selectedBadges}
          onSelectBadge={handleSelectBadge}
        />
      </div>
      <DisplayEvents allevents={events.events} />
    </>
  );
};

export const EventDetails = ({ event }: { event: EventData }) => {
  const isEventNew = isWithinLastWeek(new Date(event.dateTime.start));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="relative w-full p-4 m-8 bg-white rounded-lg shadow-md">
      {isEventNew && (
        <div className="absolute top-0 left-0 p-1 text-xs text-black origin-top-left transform -rotate-45 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-md ring ring-yellow-400 ring-opacity-50">
          New
        </div>
      )}

      <div className="flex items-center mb-4 ml-4">
        {/* <div className="relative overflow-hidden rounded-md">
          <div className="absolute inset-0 bg-gradient-to-br from-10% from-slate-300 via-transparent via-90% to-transparent to-90%"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-10% from-slate-300 via-transparent via-90% to-transparent to-90%"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-10% from-slate-300 via-transparent via-90% to-transparent to-90%"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-10% from-slate-300 via-transparent via-90% to-transparent to-90%"></div> */}
        <Image
          src={urlFor(event.eventImage).url()}
          alt={event.title}
          className="w-32 h-32 mr-4 rounded-md"
          width={800}
          height={800}
        />
        {/* </div> */}
        <div>
          <h2 className="text-lg font-bold">{event.title}</h2>
          <p className="text-sm text-gray-600">
            {new Date(event.dateTime.start).toLocaleDateString()} -{" "}
            {new Date(event.dateTime.end).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            {event.location.address}{" "}
            <Link
              href={`https://www.google.com/maps?q=${event.location.coordinates.latitude},${event.location.coordinates.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📍
            </Link>
          </p>
        </div>
      </div>

      <div className="absolute p-1 text-sm text-black rounded-md top-1 right-1">
        {event.eventType === "public" ? "🧑‍🤝‍🧑 Public Event" : "🔒 Private Event"}
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center mb-4 space-x-2">
          {event.category?.map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs text-white rounded-md bg-slate-500"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex items-center">
          <Button
            onClick={openModal}
            className="flex items-center px-4 py-2 mx-4 text-white rounded-md bg-slate-700 hover:bg-black"
          >
            Details
          </Button>
          <Link
            href={event.eventSiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 text-white rounded-md bg-slate-700 hover:bg-black"
          >
            Go to Event <span className="ml-2">&#8594;</span>
          </Link>
        </div>
      </div>
      {isModalOpen && event && (
        <CustomModal onClose={closeModal}>
          <h2 className="mb-4 text-lg font-bold">{event.title}</h2>

          <table className="w-full table-auto">
            <tbody>
              {Object.entries(event.additionalDetails).map(
                ([key, value], index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 font-bold">
                      {camelCaseToWords(key)}
                    </td>
                    <td className="px-4 py-2">{value}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between mt-4 text-sm">
            <span>
              Added: {new Date(event.dateTime.start).toLocaleDateString()}
            </span>
            <span>
              {event.organizer.name} -
              <a href={`mailto:${event.organizer.contactEmail}`}>
                {event.organizer.contactEmail}
              </a>
            </span>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

const isWithinLastWeek = (date: Date): boolean => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return date > oneWeekAgo;
};

const camelCaseToWords = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Convert camelCase to camel Case
    .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
};
