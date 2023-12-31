import DisplayDroneDetails from "@/components/drones/DisplayDroneDetails";
import DroneSearch from "@/components/drones/search/DroneSearch";
import { queryForDrone } from "@/lib/sanity/sanity.queries";
import { getDronesDetails } from "@/lib/sanity/sanity.util";
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 1800;

export default async function DronePageByBrand({ params: { slug } }: Props) {
  const drones: DroneThumbnail[] | undefined = undefined;
  console.log(drones);
  return <DroneSearch drones={drones} brand={slug} />;
}
