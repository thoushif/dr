import GalleryHome from "@/components/gallery/GalleryHome";
import { getGallery } from "@/lib/sanity/sanity.util";

export const revalidate = 1800; // revalidate at most every half an hour

const GalleryPage = async () => {
  const photos = await getGallery();
  // const photos = null;
  return <GalleryHome photos={photos} />;
};

export default GalleryPage;
