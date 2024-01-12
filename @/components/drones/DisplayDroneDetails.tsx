"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useDroneCompare } from "@/contexts/DroneCompareContext";
import { cn } from "@/lib/utils";
import { roboto_mono } from "@/lib/utils/fonts";
import { useMediaQuery } from "@react-hook/media-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import AddToCompareButton from "./compare/AddToCompareButton";
import CompareDrawer from "./compare/ComapareDrawer";
import DisplayDroneDescription from "./DisplayDroneDescription";
import DroneImage from "./image/DroneImage";

type Props = {
  drone: Drone;
};

function DisplayDroneDetails({ drone }: Props) {
  const screenSize = useMediaQuery("(min-width: 1780px)");
  const { selectedDrones } = useDroneCompare();
  const [activeSection, setActiveSection] = useState("");

  const router = useRouter();
  const droneDesc =
    drone.aircraft.description ||
    "The DJI Mavic is a compact and powerful drone that combines cutting-edge technology with exceptional portability. Boasting a foldable design, the Mavic series redefines convenience without compromising on performance. Equipped with advanced features such as obstacle avoidance, intelligent flight modes, and a high-quality camera with 4K video capabilities, the DJI Mavic ensures a seamless and immersive aerial experience. Its compact form factor allows for effortless transportation, making it an ideal choice for both novice and professional drone enthusiasts. With impressive flight stability, long-range transmission, and smart automation features, the DJI Mavic stands as a versatile and reliable tool for capturing stunning aerial imagery and videos. Whether you're an aerial photographer, videographer, or adventure enthusiast, the DJI Mavic sets a new standard for drone technology, providing a perfect blend of innovation, performance, and portability.";
  return (
    <div>
      <FaChevronCircleLeft
        className="m-5 opacity-75 hover:opacity-100"
        onClick={() => {
          router.push("/drones/search/all");
        }}
      />
      <div className="grid grid-cols-1 px-8 pb-24 mt-4 gap-x-6 md:grid-cols-2 ">
        <div>
          <div className="flex justify-between visible md:invisible">
            <h2 className="text-lg font-bold md:text-3xl ">
              {drone.aircraft.name}
            </h2>
            <div className="flex items-center justify-end gap-2">
              <Link target="_blank" href={drone.aircraft.buy_link}>
                <MdOutlineShoppingBag />
              </Link>

              <AddToCompareButton drone={drone} />
            </div>
          </div>
          {screenSize && (
            <div className="fixed hidden p-4 transform -translate-y-1/2 text-slate-800 right-24 lg:block top-1/3">
              <span
                className={cn(
                  "invisible lg:visible text-transparent font-bold text-xl bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase",
                  roboto_mono.className
                )}
              >
                In the page
              </span>
              <ul>
                <li>
                  <a
                    rel="noopener"
                    href="#aircraft"
                    onClick={() => setActiveSection("aircraft")}
                    className={activeSection === "aircraft" ? "font-bold" : ""}
                  >
                    Aircraft Detail
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener"
                    href="#flight-specifications"
                    onClick={() => setActiveSection("flight-specifications")}
                    className={
                      activeSection === "flight-specifications"
                        ? "font-bold"
                        : ""
                    }
                  >
                    Flight Specifications
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener"
                    href="#camera"
                    onClick={() => setActiveSection("camera")}
                    className={activeSection === "camera" ? "font-bold" : ""}
                  >
                    Camera
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener"
                    href="#remote-controller"
                    onClick={() => setActiveSection("remote-controller")}
                    className={
                      activeSection === "remote-controller" ? "font-bold" : ""
                    }
                  >
                    Remote Controller
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener"
                    href="#battery"
                    onClick={() => setActiveSection("battery")}
                    className={activeSection === "battery" ? "font-bold" : ""}
                  >
                    Battery
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener"
                    href="#video_transmission"
                    onClick={() => setActiveSection("video_transmission")}
                    className={
                      activeSection === "video_transmission" ? "font-bold" : ""
                    }
                  >
                    Video Transmission
                  </a>
                </li>
                <li>
                  <a
                    href="#gimbal"
                    onClick={() => setActiveSection("gimbal")}
                    className={activeSection === "gimbal" ? "font-bold" : ""}
                  >
                    Gimbal
                  </a>
                </li>
                <li>
                  <a
                    href="#sensing"
                    onClick={() => setActiveSection("sensing")}
                    className={activeSection === "sensing" ? "font-bold" : ""}
                  >
                    Sensing
                  </a>
                </li>

                <li>
                  <a
                    rel="noopener"
                    href="#similar-drones"
                    onClick={() => setActiveSection("similar-drones")}
                    className={
                      activeSection === "similar-drones" ? "font-bold" : ""
                    }
                  >
                    Similar Drones
                  </a>
                </li>
              </ul>
            </div>
          )}
          <div key={drone._id} className="flex flex-col group">
            <DroneImage drone={drone} />

            <span className="flex items-center md:mt-5 ">
              <DisplayDroneDescription description={droneDesc} />
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between invisible md:visible">
            <h2 className="text-3xl font-bold ">{drone.aircraft.name}</h2>
            <div className="flex justify-end gap-2">
              <Button className="rounded-full">
                <Link target="_blank" href={drone.aircraft.buy_link}>
                  🛒 Buy from {drone.aircraft.manufacturer}{" "}
                </Link>
              </Button>
              <AddToCompareButton drone={drone} />
            </div>
          </div>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={[
              "item-1",
              "item-2",
              "item-3",
              "item-4",
              "item-5",
              "item-6",
              "item-7",
              "item-8",
            ]}
          >
            <AccordionItem value="item-1" id="aircraft">
              <AccordionTrigger>Aircraft Detail</AccordionTrigger>
              <AccordionContent>
                <Table className="Table-auto">
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-2/4 font-bold">
                        Aircraft Name:
                      </TableCell>
                      <TableCell>{drone.aircraft.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-2/4 font-bold">
                        Manufacturer:
                      </TableCell>
                      <TableCell>{drone.aircraft.manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-2/4 font-bold">
                        Takeoff Weight:
                      </TableCell>
                      <TableCell>{drone.aircraft.takeoff_weight} kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-2/4 font-bold">
                        Length Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.length_folded} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-2/4 font-bold">
                        Width Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.width_folded} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-2/4 font-bold">
                        Height Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.height_folded} cm</TableCell>
                    </TableRow>
                    {/* Add more rows for other attributes as needed */}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            {drone.flight_specs && (
              <AccordionItem value="item-2" id="flight-specifications">
                <AccordionTrigger>Flight Specifications</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Max Ascent Speed:
                        </TableCell>
                        <TableCell>
                          {drone.flight_specs.max_ascent_speed} m/s
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Max Descent Speed:
                        </TableCell>
                        <TableCell>
                          {drone.flight_specs.max_descent_speed} m/s
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Max Horizontal Speed:
                        </TableCell>
                        <TableCell>
                          {drone.flight_specs.max_horizontal_speed} m/s
                        </TableCell>
                      </TableRow>

                      {/* Add more rows for other attributes as needed  */}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            )}
            {drone.camera && (
              <AccordionItem value="item-3" id="camera">
                <AccordionTrigger>Camera</AccordionTrigger>
                <AccordionContent>
                  <Table className="Table-auto">
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Color Mode
                        </TableCell>
                        <TableCell>{drone.camera.color_mode}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Digital zoom
                        </TableCell>
                        <TableCell>{drone.camera.digital_zoom}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          ISO Range
                        </TableCell>
                        <TableCell>{drone.camera.iso_range} kg</TableCell>
                      </TableRow>

                      {/* Add more rows for other attributes as needed */}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            )}
            {drone.remote_controller && (
              <AccordionItem value="item-4" id="remote-controller">
                <AccordionTrigger>Remote Controller</AccordionTrigger>
                <AccordionContent>
                  <Table className="Table-auto">
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Max Operating Time
                        </TableCell>
                        <TableCell>
                          {drone.remote_controller.max_operating_time}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Max Supported Mobile Device Size
                        </TableCell>
                        <TableCell>
                          {
                            drone.remote_controller
                              .max_supported_mobile_device_size
                          }
                        </TableCell>
                      </TableRow>

                      {/* Add more rows for other attributes as needed */}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            )}
            {drone.battery && (
              <AccordionItem value="item-5" id="battery">
                <AccordionTrigger>Battery</AccordionTrigger>
                <AccordionContent>
                  <Table className="Table-auto">
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Capacity
                        </TableCell>
                        <TableCell>{drone.battery.capacity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Nominal Voltage
                        </TableCell>
                        <TableCell>{drone.battery.nominal_voltage}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Battery weight
                        </TableCell>
                        <TableCell>{drone.battery.weight}</TableCell>
                      </TableRow>

                      {/* Add more rows for other attributes as needed */}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            )}
            {drone.video_transmission && (
              <AccordionItem value="item-6" id="video_transmission">
                <AccordionTrigger>Video Transmission</AccordionTrigger>
                <AccordionContent>
                  <Table className="Table-auto">
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Video Transmission system
                        </TableCell>
                        <TableCell>
                          {drone.video_transmission.video_transmission_system}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Live view quality
                        </TableCell>
                        <TableCell>
                          {drone.video_transmission.live_view_quality}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Battery weight
                        </TableCell>
                        <TableCell>{drone.battery.weight}</TableCell>
                      </TableRow>

                      {/* Add more rows for other attributes as needed */}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            )}
            {drone.gimbal && (
              <AccordionItem value="item-7" id="gimbal">
                <AccordionTrigger>Gimbal</AccordionTrigger>
                <AccordionContent>
                  <Table className="Table-auto">
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Controllable Range
                        </TableCell>
                        <TableCell>{drone.gimbal.controllable_range}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Mechanical Range
                        </TableCell>
                        <TableCell>{drone.gimbal.mechanical_range}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Battery weight
                        </TableCell>
                        <TableCell>{drone.battery.weight}</TableCell>
                      </TableRow>

                      {/* Add more rows for other attributes as needed */}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            )}
            {drone.sensing && (
              <AccordionItem value="item-8" id="sensing">
                <AccordionTrigger>Sensing</AccordionTrigger>
                <AccordionContent>
                  <Table className="Table-auto">
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Sensing type
                        </TableCell>
                        <TableCell>{drone.sensing.sensing_type}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Forward measurement range
                        </TableCell>
                        <TableCell>
                          {drone.sensing.forward_measurement_range}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="w-2/4 font-bold">
                          Forward detection range
                        </TableCell>
                        <TableCell>
                          {drone.sensing.forward_detection_range}
                        </TableCell>
                      </TableRow>

                      {/* Add more rows for other attributes as needed */}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </div>
      {selectedDrones.length > 0 && <CompareDrawer />}

      <div id="similar-drones">
        <h2 className="text-lg font-bold md:text-3xl ">Similar drones</h2>
      </div>
    </div>
  );
}

export default DisplayDroneDetails;
