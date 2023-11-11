import GalleryHome from "@components/gallery/GalleryHome";
import { client } from "@/lib/sanity/sanity.client";
import { groq } from "next-sanity";

export const revalidate = 1800; // revalidate at most every half an hour

const query = groq`
*[_type=="gallery" && approved == true] {
  _id,
  _createdAt,
  image,
  taken_by ->{
    aircraft {
      name
    }
  }
} | order(_createdAt desc)[0..29]
`;

const GalleryPage = async () => {
  const photos = await client.fetch(query);
  return <GalleryHome photos={photos} />;
};

export default GalleryPage;
