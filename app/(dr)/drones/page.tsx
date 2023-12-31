import DroneSearch from "@/components/drones/search/DroneSearch";
import { getFeaturedDrones } from "@/lib/sanity/sanity.util";

export default async function HomePage() {
  const drones = await getFeaturedDrones();
  // const manufacturers = await getManufacturers();
  return (
    <>
      <DroneSearch drones={drones} brand={""} />
      {/* <h2 className="text-2xl font-bold transition duration-300 text-slate-800 hover:text-slate-500">
        Featured Drones
      </h2>
      <DisplayDroneThumbNails drones={drones} /> */}
    </>
  );
}
