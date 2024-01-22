import { defineField, defineType } from "sanity";

export default defineType({
  name: "dr-type",
  title: "Drone Type",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "desciption",
      title: "Description",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
