export default {
  title: "Gallery",
  name: "gallery",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // If you want to enable hotspot
      },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          name: "location",
          type: "string",
          title: "Location",
        },
        {
          name: "height",
          type: "number",
          title: "Taken from height (ft)",
        },
      ],
    },
    {
      name: "taken_by",
      title: "Taken By",
      type: "reference",
      to: [{ type: "drone" }], // Reference to the "drone" type
      description: "Select the drone that took this image",
    },
  ],
  preview: {
    select: {
      title: "taken_by.aircraft.name",
      media: "image",
    },
  },
};
