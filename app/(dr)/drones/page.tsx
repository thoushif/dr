import DisplayDroneThumbNails from "@components/DisplayDroneThumbNails";
import { getDrones } from "@/lib/sanity/sanity.util";

export default async function HomePage() {
  const drones = await getDrones();

  return <DisplayDroneThumbNails drones={drones} />;
}
