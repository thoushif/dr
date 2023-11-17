import { queryForDrone } from "@/lib/sanity/sanity.queries";
import { getDronesDetails } from "@/lib/sanity/sanity.util";
import DisplayDroneDetails from "@components/DisplayDroneDetails";
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 1800;

export default async function DronePage({ params: { slug } }: Props) {
  const params = { documentId: slug }; // Replace with the actual _id value
  const drone = await getDronesDetails(queryForDrone, params);
  return drone && <DisplayDroneDetails drone={drone[0]} />;
}
