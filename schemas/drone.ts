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
        {
          name: "buy_link",
          title: "Buy Link",
          type: "url",
          options: {
            // Default value for the buy_link field
            defaultValue: "https://dronezone.com/buy/url",
          },
        },
        { name: "manufacturer", title: "Manufacturer", type: "string" },
        {
          name: "price",
          title: "Price in USD",
          type: "number",
          options: {
            // Default value for the buy_link field
            defaultValue: 0,
          },
        },
        { name: "takeoff_weight", title: "Takeoff Weight", type: "number" },
        { name: "length_folded", title: "Length Folded", type: "number" },
        { name: "width_folded", title: "Width Folded", type: "number" },
        { name: "height_folded", title: "Height Folded", type: "number" },
        {
          name: "ease_of_use",
          title: "Ease of Use",
          type: "string",
          options: {
            list: [
              { title: "Beginner-Friendly", value: "beginner_friendly" },
              { title: "Intermediate", value: "intermediate" },
              { title: "Advanced", value: "advanced" },
            ],
          },
        },
        {
          name: "portability",
          title: "Portability",
          type: "string",
          options: {
            list: [
              { title: "Ultra-Portable", value: "ultra_portable" },
              { title: "Travel-Friendly", value: "travel_friendly" },
              { title: "Professional Rig", value: "professional_rig" },
              { title: "Modular Design", value: "modular_design" },
              { title: "Industrial Size", value: "industrial_size" },
              // Add more options as needed
            ],
          },
        },
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
        {
          name: "flight_time",
          title: "Flight Time",
          type: "string",
          options: {
            list: [
              { title: "Short Flight Time", value: "short_flight_time" },
              { title: "Medium Flight Time", value: "medium_flight_time" },
              { title: "Long Flight Time", value: "long_flight_time" },
            ],
          },
        },
        // Add more fields for flight specifications
      ],
    },
    {
      name: "accessories",
      title: "Accessories",
      type: "object",
      fields: [
        {
          name: "extra_batteries",
          title: "Extra batteries included?",
          type: "boolean",
        },
        {
          name: "propeller_guards",
          title: "Propeller guards included?",
          type: "boolean",
        },
        {
          name: "additional_propellers",
          title: "Additional propellers included?",
          type: "boolean",
        },
        {
          name: "carrying_case",
          title: "Carrying case/backpack included?",
          type: "boolean",
        },
        {
          name: "charger_and_hub",
          title: "Charger and charging hub included?",
          type: "boolean",
        },
        {
          name: "remote_controller_accessories",
          title: "Remote controller accessories included?",
          type: "boolean",
        },
        {
          name: "camera_filters",
          title: "Camera filters included?",
          type: "boolean",
        },
        {
          name: "landing_pad",
          title: "Landing pad included?",
          type: "boolean",
        },
        {
          name: "gps_tracker",
          title: "GPS tracker included?",
          type: "boolean",
        },
        {
          name: "fpv_goggles",
          title: "FPV goggles included?",
          type: "boolean",
        },
        { name: "sunshade", title: "Sunshade included?", type: "boolean" },
        {
          name: "spare_memory_cards",
          title: "Spare memory cards included?",
          type: "boolean",
        },
        {
          name: "drone_skins_decals",
          title: "Drone skins/decals included?",
          type: "boolean",
        },
        {
          name: "drone_lights",
          title: "Drone lights included?",
          type: "boolean",
        },
        {
          name: "range_extenders",
          title: "Range extenders included?",
          type: "boolean",
        },
        {
          name: "gimbal_stabilizers",
          title: "Gimbal stabilizers included?",
          type: "boolean",
        },
        {
          name: "wind_gauges",
          title: "Wind gauges included?",
          type: "boolean",
        },
        { name: "tool_kit", title: "Tool kit included?", type: "boolean" },
        // Add more accessories as needed
      ],
    },
    {
      name: "compatibility",
      title: "Compatibility",
      type: "object",
      fields: [
        {
          name: "mobile_devices",
          title: "Mobile Devices",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        },
        {
          name: "supported_oss",
          title: "Supported Operating Systems",
          type: "array",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
        },
        {
          name: "vr_headsets",
          title: "VR Headsets",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "brand", title: "Brand", type: "string" },
                { name: "model", title: "Model", type: "string" },
                {
                  name: "versions",
                  title: "versions",
                  type: "array",
                  of: [{ type: "string" }],
                },
              ],
            },
          ],
        },
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
        {
          name: "quality",
          title:
            "is it basic or high-resolution, say yes if its high-resolution",
          type: "boolean",
        },
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
        { name: "capacity", title: "Capacity in mAh", type: "number" },
        { name: "weight", title: "Weight", type: "string" },
        { name: "nominal_voltage", title: "Nominal Voltage", type: "string" },
        {
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "LiPo (Lithium Polymer)", value: "lithium_polymer" },
              { title: "Li-ion (Lithium-ion)", value: "lithium_ion" },
              { title: "Other", value: "other" },
            ],
          },
        },
        {
          name: "charging_time",
          title: "Charging Time",
          type: "string",
          options: {
            list: [
              { title: "Fast Charging", value: "fast_charging" },
              { title: "Standard Charging", value: "standard_charging" },
            ],
          },
        },
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
      title: "Drone Types",
      type: "array",
      of: [{ type: "reference", to: [{ type: "dr-type" }] }],
      description: "Select the associated Drone Types",
    },

    // Array of references to "Image" documents
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          title: "Image",
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      description: "Select the associated Images",
    },
    {
      name: "featured",
      title: "Featured?",
      type: "boolean",
      default: false,
      require: false,
    },
  ],
  preview: {
    select: {
      title: "aircraft.name",
      subtitle: "drone_type.name",
    },
  },
};
