// schemas/drone.js

export default {
  name: "drone",
  title: "Drone",
  type: "document",
  fields: [
    {
      name: "aircraft",
      title: "Aircraft",
      type: "object",
      fields: [
        { name: "name", title: "Name", type: "string" },
        { name: "manufacturer", title: "Manufacturer", type: "string" },
        { name: "takeoff_weight", title: "Takeoff Weight", type: "number" },
        { name: "length_folded", title: "Length Folded", type: "number" },
        { name: "width_folded", title: "Width Folded", type: "number" },
        { name: "height_folded", title: "Height Folded", type: "number" },
        // Add more fields for folded dimensions and other aircraft-related information
      ],
    },
    {
      name: "flight_specs",
      title: "Flight Specifications",
      type: "object",
      fields: [
        { name: "max_ascent_speed", title: "Max Ascent Speed", type: "number" },
        {
          name: "max_descent_speed",
          title: "Max Descent Speed",
          type: "number",
        },
        {
          name: "max_horizontal_speed",
          title: "Max Horizontal Speed",
          type: "number",
        },
        // Add more fields for flight specifications
      ],
    },
    {
      name: "camera",
      title: "Camera",
      type: "object",
      fields: [
        { name: "color_mode", title: "Color Mode", type: "string" },
        { name: "digital_zoom", title: "Digital Zoom", type: "string" },
        { name: "iso_range", title: "ISO Range", type: "string" },
        // Add more fields for camera specifications
      ],
    },
    {
      name: "gimbal",
      title: "Gimbal",
      type: "object",
      fields: [
        { name: "mechanical_range", title: "Mechanical Range", type: "string" },
        {
          name: "controllable_range",
          title: "Controllable Range",
          type: "string",
        },
        // Add more fields for gimbal specifications
      ],
    },
    {
      name: "sensing",
      title: "Sensing",
      type: "object",
      fields: [
        { name: "sensing_type", title: "Sensing Type", type: "string" },
        {
          name: "forward_measurement_range",
          title: "Forward Measurement Range",
          type: "string",
        },
        {
          name: "forward_detection_range",
          title: "Forward Detection Range",
          type: "string",
        },
        // Add more fields for sensing specifications
      ],
    },
    {
      name: "video_transmission",
      title: "Video Transmission",
      type: "object",
      fields: [
        {
          name: "video_transmission_system",
          title: "Video Transmission System",
          type: "string",
        },
        {
          name: "live_view_quality",
          title: "Live View Quality",
          type: "string",
        },
        // Add more fields for video transmission specifications
      ],
    },
    {
      name: "battery",
      title: "Battery",
      type: "object",
      fields: [
        { name: "capacity", title: "Capacity", type: "string" },
        { name: "weight", title: "Weight", type: "string" },
        { name: "nominal_voltage", title: "Nominal Voltage", type: "string" },
        // Add more fields for battery specifications
      ],
    },
    {
      name: "remote_controller",
      title: "Remote Controller",
      type: "object",
      fields: [
        {
          name: "max_operating_time",
          title: "Max Operating Time",
          type: "string",
        },
        {
          name: "max_supported_mobile_device_size",
          title: "Max Supported Mobile Device Size",
          type: "string",
        },
        // Add more fields for remote controller specifications
      ],
    },
    // Reference to one "DroneImage" document
    {
      name: "drone_image",
      title: "Drone Image",
      type: "reference",
      to: [{ type: "droneImage" }],
      description: "Select the associated Drone Image",
    },
    // Reference to one "DroneImage" document
    {
      name: "drone_type",
      title: "Drone Type",
      type: "reference",
      to: [{ type: "dr-type" }],
      description: "Select the associated Drone Type",
    },

    // // Array of references to "Image" documents
    // {
    //   name: "images",
    //   title: "Images",
    //   type: "array",
    //   of: [{ type: "image" }],
    //   description: "Select the associated Images",
    // },
  ],
  preview: {
    select: {
      title: "aircraft.name",
      subtitle: "drone_type.name",
    },
  },
};
