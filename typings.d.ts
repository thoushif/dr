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

interface Image {
  _type: "image";
  asset: Reference;
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
  name: string;
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

interface DroneThumbnail extends Base {
  name: string;
  drone_image: DroneImage;
}
interface Photo extends Base {
  taken_by: Drone;
  image: Image;
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
