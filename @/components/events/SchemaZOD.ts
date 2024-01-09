import { z } from "zod";

const isInstanceOfDrone = (value: any): value is Drone => {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "drone_image" in value
  );
};

export const showcaseSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Email is required" }),
  /* via register: */
  selectedDrone: z.any().refine(isInstanceOfDrone, {
    message: "Invalid selected drone type",
  }),
  image: z.instanceof(File),
  height: z.number(),
  caption: z.string().optional(),
});
export type ShowcaseData = z.infer<typeof showcaseSchema>;

export const newsletterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email("Invalid email address")
    .min(1, { message: "Email is required" }),
});
export type NewsLetterFormData = z.infer<typeof newsletterSchema>;

const eventLocationSchema = z.object({
  name: z.string(),
  address: z.string(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

const eventDateTimeSchema = z.object({
  start: z.date(),
  end: z.date(),
});

const eventOrganizerSchema = z.object({
  name: z.string(),
  contactEmail: z.string().email(),
});

const additionalDetailsSchema = z.object({
  eventCapacity: z.number().optional(),
  registrationDeadline: z.string().optional(),
  entryFee: z.number().optional(),
  prizes: z.array(z.string()).optional(),
});

export const eventDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  //   location: eventLocationSchema,
  dateTime: eventDateTimeSchema,
  organizer: eventOrganizerSchema,
  //   category: z.array(z.string()),
  isPrivateEvent: z.boolean().optional(),
  eventSiteLink: z.string().url(),
  //   eventImage: z.string(),
  //   additionalDetails: additionalDetailsSchema,
});

const eventRegistrationSchema = z.object({
  eventId: z.string(),
  userId: z.string(),
  registrationDate: z.string(),
});

const eventAttendeeSchema = z.object({
  eventId: z.string(),
  userId: z.string(),
});
