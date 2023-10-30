import { defineField, defineType } from "sanity";

export default defineType({
  name: "droneImage",
  title: "Drone Image",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Drone Image",
      type: "image",
      options: {
        hotspot: true, // If you want to enable hotspot
      },
    },
    {
      name: "drone_type",
      title: "Drone Type",
      type: "reference",
      to: [{ type: "dr-type" }], // Reference to another document type (DrType)
      description: "Select the type of drone associated with this image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coordinates",
      title: "Coordinates",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "x",
              title: "X Coordinate",
              type: "number",
            },
            {
              name: "y",
              title: "Y Coordinate",
              type: "number",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "details",
              title: "Details",
              type: "text",
            },
            {
              name: "type",
              title: "Type",
              type: "text",
            },
          ],
        },
      ],
      description: "List of coordinates with title and details",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "drone_type.name", // Assuming 'drone_type' has a 'title' field
      media: "image",
    },
  },
});
