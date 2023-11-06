import { groq } from "next-sanity";
import { client } from "@lib/sanity.client";
import DisplayDroneDetails from "@components/DisplayDroneDetails";
type Props = {
  params: {
    slug: string;
  };
};

const query_for_drone = groq`
*[_type=="drone"  && _id == $documentId] {
  ...,
  drone_image-> {
    image,
    coordinates
  }
}
`;
// export const revalidate = 60;

export default async function DronePage({ params: { slug } }: Props) {
  const params = { documentId: slug }; // Replace with the actual _id value
  const drone = await client.fetch(query_for_drone, params);
  // console.log("This drone  details", drone[0]);
  return drone && <DisplayDroneDetails drone={drone[0]} />;
  // return <div>heree goes the drones</div>;
}
