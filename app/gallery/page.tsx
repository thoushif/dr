import GalleryHome from "@/components/gallery/GalleryHome";
import { getGallery } from "@/lib/sanity/sanity.util";

export const revalidate = 1800; // revalidate at most every half an hour

const GalleryPage = async () => {
  const photos = await getGallery(0);
  // const photos = null;
  return <GalleryHome gallery={photos} isHot={false} />;
};

export default GalleryPage;
