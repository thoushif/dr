import DronesList from "@/components/drones/DisplayDroneSelectBox";
import { getFeaturedDrones } from "@/lib/sanity/sanity.util";

export default async function HomePage() {
  const drones = await getFeaturedDrones();

  return (
    <>
      <DronesList drones={drones} />
    </>
  );
}
