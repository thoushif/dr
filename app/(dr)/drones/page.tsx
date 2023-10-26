import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";
import Dr1CategoryList from "../../../components/DrList";

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
// export const revalidate = 60;

export default async function HomePage() {
  const drones = await client.fetch(query);
  console.log("drones", drones);
  return <Dr1CategoryList drones={drones} />;
  // return <div>heree goes the drones</div>;
}
