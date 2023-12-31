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
import Link from "next/link";
import AddToCompareButton from "./compare/AddToCompareButton";
import CompareDrawer from "./compare/ComapareDrawer";
import DisplayDroneDescription from "./DisplayDroneDescription";
import DroneImage from "./image/DroneImage";

type Props = {
  drone: Drone;
};

function DisplayDroneDetails({ drone }: Props) {
  const { selectedDrones } = useDroneCompare();
  const droneDesc =
    drone.aircraft.description ||
    "The DJI Mavic is a compact and powerful drone that combines cutting-edge technology with exceptional portability. Boasting a foldable design, the Mavic series redefines convenience without compromising on performance. Equipped with advanced features such as obstacle avoidance, intelligent flight modes, and a high-quality camera with 4K video capabilities, the DJI Mavic ensures a seamless and immersive aerial experience. Its compact form factor allows for effortless transportation, making it an ideal choice for both novice and professional drone enthusiasts. With impressive flight stability, long-range transmission, and smart automation features, the DJI Mavic stands as a versatile and reliable tool for capturing stunning aerial imagery and videos. Whether you're an aerial photographer, videographer, or adventure enthusiast, the DJI Mavic sets a new standard for drone technology, providing a perfect blend of innovation, performance, and portability.";
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 px-8 pb-24 mt-4 md:grid-cols-2 gap-y-6">
        <div key={drone._id} className="flex flex-col group">
          <DroneImage droneImage={drone.drone_image} droneId={drone._id} />

          <span className="flex items-center mt-5 ">
            <DisplayDroneDescription description={droneDesc} />
          </span>
        </div>

        <div>
          <div className="flex justify-between">
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
            defaultValue={["item-1", "item-2", "item-3"]}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Aircraft Detail</AccordionTrigger>
              <AccordionContent>
                <Table className="Table-auto">
                  <TableBody>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Aircraft Name:
                      </TableCell>
                      <TableCell>{drone.aircraft.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Manufacturer:
                      </TableCell>
                      <TableCell>{drone.aircraft.manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Takeoff Weight:
                      </TableCell>
                      <TableCell>{drone.aircraft.takeoff_weight} kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Length Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.length_folded} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Width Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.width_folded} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Height Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.height_folded} cm</TableCell>
                    </TableRow>
                    {/* Add more rows for other attributes as needed */}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Aircraft Detail</AccordionTrigger>
              <AccordionContent>
                <Table className="Table-auto">
                  <TableBody>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Aircraft Name:
                      </TableCell>
                      <TableCell>{drone.aircraft.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Manufacturer:
                      </TableCell>
                      <TableCell>{drone.aircraft.manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Takeoff Weight:
                      </TableCell>
                      <TableCell>{drone.aircraft.takeoff_weight} kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Length Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.length_folded} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Width Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.width_folded} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Height Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.height_folded} cm</TableCell>
                    </TableRow>
                    {/* Add more rows for other attributes as needed */}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Aircraft Detail</AccordionTrigger>
              <AccordionContent>
                <Table className="Table-auto">
                  <TableBody>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Aircraft Name:
                      </TableCell>
                      <TableCell>{drone.aircraft.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Manufacturer:
                      </TableCell>
                      <TableCell>{drone.aircraft.manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Takeoff Weight:
                      </TableCell>
                      <TableCell>{drone.aircraft.takeoff_weight} kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Length Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.length_folded} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Width Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.width_folded} cm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-4 font-bold">
                        Height Folded:
                      </TableCell>
                      <TableCell>{drone.aircraft.height_folded} cm</TableCell>
                    </TableRow>
                    {/* Add more rows for other attributes as needed */}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {selectedDrones.length > 0 && <CompareDrawer />}
    </div>
  );
}

export default DisplayDroneDetails;
