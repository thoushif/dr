// schemas/event.js

export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the event",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "Description of the event",
    },
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
          description: "Name of the location",
        },
        {
          name: "address",
          title: "Address",
          type: "string",
          description: "Address of the location",
        },
        {
          name: "coordinates",
          title: "Coordinates",
          type: "object",
          fields: [
            { name: "latitude", title: "Latitude", type: "number" },
            { name: "longitude", title: "Longitude", type: "number" },
          ],
          description: "Coordinates of the location",
        },
      ],
    },
    {
      name: "dateTime",
      title: "Date and Time",
      type: "object",
      fields: [
        { name: "start", title: "Start Date and Time", type: "datetime" },
        { name: "end", title: "End Date and Time", type: "datetime" },
      ],
    },
    {
      name: "organizer",
      title: "Organizer",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
          description: "Name of the organizer",
        },
        {
          name: "contactEmail",
          title: "Contact Email",
          type: "email",
          description: "Contact email of the organizer",
        },
      ],
    },
    {
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Categories for the event",
    },
    {
      name: "isPrivateEvent",
      title: "Event Type",
      type: "boolean",
      default: false,
      description: "Type of the event (public or private)",
    },
    {
      name: "eventSiteLink",
      title: "Event Site Link",
      type: "url",
      description: "Link to the original event site",
    },
    {
      name: "eventImage",
      title: "Event Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Image for the event",
    },
    {
      name: "additionalDetails",
      title: "Additional Details",
      type: "object",
      fields: [
        {
          name: "speakers",
          title: "Speakers",
          type: "array",
          of: [{ type: "string" }],
          description: "List of speakers for the event",
        },
        {
          name: "topicsCovered",
          title: "Topics Covered",
          type: "array",
          of: [{ type: "string" }],
          description: "List of topics covered in the event",
        },
        {
          name: "eventCapacity",
          title: "Event Capacity",
          type: "number",
          description: "Capacity of the event",
        },
        {
          name: "registrationDeadline",
          title: "Registration Deadline",
          type: "datetime",
          description: "Deadline for event registration",
        },
        {
          name: "entryFee",
          title: "Entry Fee",
          type: "string",
          description: "Entry fee for the event",
        },
        {
          name: "prizes",
          title: "Prizes",
          type: "array",
          of: [{ type: "string" }],
          description: "List of prizes for the event",
        },
        {
          name: "entryRequirements",
          title: "Entry Requirements",
          type: "text",
          description: "Requirements for event entry",
        },
        {
          name: "judgingCriteria",
          title: "Judging Criteria",
          type: "text",
          description: "Criteria for judging the event",
        },
      ],
    },
  ],
};
