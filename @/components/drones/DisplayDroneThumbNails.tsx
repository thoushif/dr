import { useDroneCompare } from "@/contexts/DroneCompareContext";
import urlFor from "@/lib/sanity/urlFor";
import ClientSideRoute from "@/lib/utils/ClientSideRoute";
import Image from "next/image";
import CompareDrawer from "./compare/ComapareDrawer";

type Props = {
  drones: DroneThumbnail[];
};

function DisplayDroneThumbNails({ drones }: Props) {
  const { selectedDrones, removeDroneFromCompare } = useDroneCompare();
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 px-8 pb-24 md:grid-cols-3 gap-y-6">
        {drones &&
          drones.map((dr) => (
            <div key={dr._id} className="flex flex-col cursor-pointer group">
              <ClientSideRoute route={`/drones/${dr._id}`} key={dr._id}>
                <div className="relative w-full transition-transform duration-200 ease-out h-60 dronesop-shadow-xl group-hover:scale-105">
                  <Image
                    className="object-cover object-left rounded-md lg:object-center"
                    src={urlFor(dr.drone_image.image).url()}
                    alt={dr.name}
                    fill
                  />
                  {selectedDrones.some(
                    (selectedDrone) => selectedDrone._id === dr._id
                  ) && (
                    // Display the tick mark if the drone is in the compare drawer
                    <div className="absolute text-green-500 top-2 right-2">
                      yes
                    </div>
                  )}
                  <div className="absolute bottom-0 flex items-center justify-between w-full p-3 text-white bg-black rounded bg-opacity-20 backdronesop-blur-lg dronesop-shadow-lg ">
                    <div>
                      <p className="font-bold">{dr.name}</p>
                      {/* <p className="font-bold">{dr.drone_image.image.asset}</p> */}
                      <p>
                        {new Date(dr._createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </ClientSideRoute>
              {/* <p className="flex items-center mt-5 font-bold group-hover:underline">
              Show more details <ArrowUpRightIcon className="w-4 h-4 ml-2" />
            </p> */}
            </div>
          ))}
      </div>
      {selectedDrones.length > 0 && <CompareDrawer />}
    </div>
  );
}

export default DisplayDroneThumbNails;
