import Image from "next/image";
import urlFor from "../@/lib/sanity/urlFor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import DroneImage from "./DroneImage";

type Props = {
  drone: Drone;
};

function DisplayDroneDetails({ drone }: Props) {
  return (
    <div>
      <hr className="border-[#f7ab0a] mb-10" />

      <div className="grid grid-cols-1 gap-6 px-8 pb-24 md:grid-cols-2 gap-y-6">
        <div key={drone._id} className="flex flex-col cursor-pointer group">
          <DroneImage droneImage={drone.drone_image} droneId={drone._id} />

          {/* <p className="flex items-center mt-5 font-bold group-hover:underline">
              Show more details <ArrowUpRightIcon className="w-4 h-4 ml-2" />
            </p> */}
        </div>

        <div>
          <h3 className="text-xl font-bold">{drone.aircraft.name}</h3>
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
    </div>
  );
}

export default DisplayDroneDetails;
