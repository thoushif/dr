import { groq } from "next-sanity";
import { client } from "../../../lib/sanity.client";
import Dr1CategoryList from "../../../components/DrList";

const query = groq`
*[_type=="dr-type"] {
  ...,
} | order(_createdAt desc)
`;
export const revalidate = 60;

export default async function HomePage() {

  const dr1Categories = await client.fetch(query);
  console.log("dr1Categories",dr1Categories)
  return <Dr1CategoryList dr1={dr1Categories} />;
}
