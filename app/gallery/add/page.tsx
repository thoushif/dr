import DronesList from "@components/DisplayDroneSelectBox";
import { getDrones } from "@/lib/sanity/sanity.util";

export default async function HomePage() {
  const drones = await getDrones();

  return (
    <>
      <DronesList drones={drones} />
    </>
  );
}
