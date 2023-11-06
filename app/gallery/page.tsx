import GalleryHome from "@components/gallery/GalleryHome";
import { client } from "@lib/sanity.client";
import { groq } from "next-sanity";

const query = groq`
*[_type=="gallery"] {
  _id,
  _createdAt,
  image,
  taken_by ->{
    aircraft {
      name
    }
  }
} | order(_createdAt desc)
`;

const GalleryPage = async () => {
  const photos = await client.fetch(query);
  return <GalleryHome photos={photos} />;
};

export default GalleryPage;
