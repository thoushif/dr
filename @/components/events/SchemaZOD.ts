import { z } from "zod";

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
