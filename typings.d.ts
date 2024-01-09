type SafeNumber = number | `${number}`;
// Define the type based on the Zod schema

type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface DrType extends Base {
  image: Image;
  name: string;
}
interface ImageUploadResponse {
  _type: string; // The type of the document (e.g., 'gallery')
  image: {
    // The ID of the created document
    _type: string; // The type of the image field (e.g., 'image')
    asset: {
      _type: string; // The type of the asset reference (e.g., 'reference')
      _ref: string; // The reference to the asset ID
    };
    caption: string;
    height: number;
  };
  taken_by: {
    _type: string; // The type of the taken_by field (e.g., 'reference')
    _ref: string; // The reference to the drone ID
  };
  // Additional properties if any
}
interface Image {
  _type: "image";
  asset: Reference;
  caption: string;
  height: number;
}

interface Reference {
  _ref: "string";
  _type: "reference";
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  split: (separator: string | RegExp) => string[];
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface Category extends Base {
  description: string;
  title: string;
}

interface MainImage {
  _type: "image";
  asset: Reference;
}

interface Title {
  _type: "string";
  current: string;
}

interface Aircraft {
  id: number;
  name: string;
  description: string;
  buy_link: string;
  manufacturer: string;
  takeoff_weight: number;
  length_folded: number;
  width_folded: number;
  height_folded: number;
  // Add more fields for folded dimensions and other aircraft-related information
}

interface FlightSpecifications {
  max_ascent_speed: number;
  max_descent_speed: number;
  max_horizontal_speed: number;
  // Add more fields for flight specifications
}

interface Camera {
  color_mode: string;
  digital_zoom: string;
  iso_range: string;
  // Add more fields for camera specifications
}

interface Gimbal {
  mechanical_range: string;
  controllable_range: string;
  // Add more fields for gimbal specifications
}

interface Sensing {
  sensing_type: string;
  forward_measurement_range: string;
  forward_detection_range: string;
  // Add more fields for sensing specifications
}

interface VideoTransmission {
  video_transmission_system: string;
  live_view_quality: string;
  // Add more fields for video transmission specifications
}

interface Battery {
  capacity: string;
  weight: string;
  nominal_voltage: string;
  // Add more fields for battery specifications
}

interface RemoteController {
  max_operating_time: string;
  max_supported_mobile_device_size: string;
  // Add more fields for remote controller specifications
}

interface Drone extends Base {
  _id: string;
  name: string;
  aircraft: Aircraft;
  flight_specs: FlightSpecifications;
  camera: Camera;
  gimbal: Gimbal;
  sensing: Sensing;
  video_transmission: VideoTransmission;
  battery: Battery;
  remote_controller: RemoteController;
  drone_image: DroneImage;
  drone_type: DrType;
  // You can uncomment and add other fields as needed
}

interface DroneCompare {
  attribute: string;
  drone0: string;
  drone1: string;

  isHeader: boolean;
}

interface DroneThumbnail extends Base {
  name: string;
  drone_image: DroneImage;
  description: string;
}
interface Photo extends Base {
  taken_by: Drone;
  image: Image;
  media_url: string;
}

interface Coordinates {
  x: number;
  y: number;
  title: string;
  details: string;
  type: string;
}

interface DroneImage {
  image: {
    asset: {
      _ref: string;
    };
    height: number;
    width: number;
  };
  drone_type: {
    _ref: string;
  };
  coordinates: Coordinates[];
}

// types.ts

interface EventLocation {
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface EventDateTime {
  start: Date; // Assuming date strings in ISO format
  end: Date;
}

interface EventOrganizer {
  name: string;
  contactEmail: string;
}

interface AdditionalDetails {
  eventCapacity?: number;
  registrationDeadline?: string; // Assuming date string in ISO format
  entryFee?: number;
  prizes?: string[];
}

interface EventData {
  _id: string;
  title: string;
  description: string;
  location: EventLocation;
  dateTime: EventDateTime;
  organizer: EventOrganizer;
  category: string[];
  isPrivateEvent: string;
  eventSiteLink: string;
  eventImage: string;
  additionalDetails: AdditionalDetails;
}

interface EventRegistration {
  eventId: string;
  userId: string;
  registrationDate: string; // Assuming date string in ISO format
}

interface EventAttendee {
  eventId: string;
  userId: string;
}

interface DroneSearchState {
  selectedCategories: string[];
  selectedReviews: string[];
  selectedPriceRanges: string[];
  selectedRatings: string[];
  selectedWeightClasses: string[];
  selectedCompatibility: string[];
  selectedUsage: string[];
  selectedEaseOfUse: string[];
  selectedBatteryType: string[];
  selectedBatteryLife: string[];
  selectedChargingTime: string[];
  selectedCameraQuality: string[];
  selectedPortability: string[];
  [key: string]: any;
}
