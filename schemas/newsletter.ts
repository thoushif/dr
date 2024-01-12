// schemas/newsletter.js

export default {
  name: "newsletter",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "The name of the subscriber",
    },
    {
      name: "email",
      title: "Email",
      type: "email",
      description: "The email address of the subscriber",
    },
    {
      name: "subscribedOn",
      title: "Subscribed On",
      type: "datetime",
      readOnly: true,
      description: "The date and time when the subscriber subscribed",
    },
    {
      name: "isSubscribed",
      title: "Is Subscribed",
      type: "boolean",
      default: true,
      description: "Indicates whether the subscriber is currently subscribed",
    },
    {
      name: "unsubscribedOn",
      title: "Unsubscribed On",
      type: "datetime",
      description:
        "The date and time when the subscriber unsubscribed (if applicable)",
    },
  ],
  initialValue: {
    isSubscribed: true,
  },
};
