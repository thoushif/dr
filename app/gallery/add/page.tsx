import { groq } from "next-sanity";
import { client } from "@/lib/sanity/sanity.client";
import DronesList from "@components/DisplayDroneSelectBox";

const query = groq`
*[_type=="drone"] {
  _id,
  _createdAt,
  "name":aircraft.name,
  "manufacturer":aircraft.manufacturer,
  drone_image-> {
    image
  }
} | order(_createdAt desc)
`;
export default async function HomePage() {
  const drones = await client.fetch(query);

  return (
    <>
      <DronesList drones={drones} />
    </>
  );
}
