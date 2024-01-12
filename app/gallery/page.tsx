import GalleryHome from "@/components/gallery/GalleryHome";
import { getGallery } from "@/lib/sanity/sanity.util";

export const dynamic = "force-dynamic";

const GalleryPage = async () => {
  const photos = await getGallery(0);
  // const photos = null;
  return <GalleryHome gallery={photos} isHot={false} />;
};

export default GalleryPage;
