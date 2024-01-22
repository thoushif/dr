import Link from "next/link";
import GalleryHome from "@/components/gallery/GalleryHome";
import { getHomePagePosts, getHotGallery } from "@/lib/sanity/sanity.util";
import { Suspense } from "react";
import BlogList from "@/components/posts/BlogList";
import { Button } from "@/components/ui/button";
import { GrGallery } from "react-icons/gr";
export const revalidate = 60;

export default async function HomePage() {
  const photos = await getHotGallery();
  const posts = await getHomePagePosts();
  return (
    <>
      <section id="hero-section">
        <div className="relative h-3/5 ">
          <video autoPlay loop muted className="object-cover w-full h-3/">
            <source src="/videos/drone-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full bg-black opacity-50 h-3/overlay"></div>
          <div className="absolute z-10 text-center text-white transform -translate-x-1/2 -translate-y-1/2 hero-content top-1/2 left-1/2">
            <h1 className="m-6 text-4xl font-bold md:text-6xl">Drone Zone</h1>
            <p className="mb-12 text-sm md:text-xl">
              Welcome to{" "}
              <span className="underline decoration-4 decoration-[#7386aa]">
                Every Drone owners'
              </span>{" "}
              favorite place to fly.
            </p>
            <Link
              href="/drones/search"
              className="px-8 text-lg font-semibold text-white rounded-md cursor-pointer md:py-4 bg-slate-500 hover:bg-slate-700 "
            >
              Explore Drones
            </Link>
          </div>
        </div>
      </section>

      {posts && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold transition duration-300 text-slate-800 hover:text-slate-500">
            Latest news in the market
          </h2>

          <BlogList posts={posts} />
        </div>
      )}

      <section
        id="hot-gallery"
        className="relative p-4 overflow-hidden bg-slate-100"
      >
        <div className="container p-4 mx-auto bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold transition duration-300 text-slate-800 hover:text-slate-500">
              Hot from Gallery
            </h2>
            <Button className="relative overflow-hidden transition-all border rounded-md shadow-2xl text-zinc-200 before:ease border-slate-500 bg-slate-500 before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-slate-500 hover:before:-translate-x-40">
              <Link href="/gallery" className="uppercase">
                <div className="flex items-center justify-between ">
                  showcase
                  <GrGallery className="ml-4 text-zinc-200" />
                </div>
              </Link>
            </Button>
          </div>

          <GalleryHome gallery={photos} isHot={true} />
        </div>
      </section>
      <section id="laws-of-flying-drones" className="py-8">
        <div className="container p-4 mx-auto bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold transition duration-300 text-slate-800 hover:text-slate-500">
            Fly your drone responsibly
          </h2>
          <p className="py-4 text-base">
            Drone laws exist to ensure a high level of safety in the skies,
            especially near sensitive areas like airports and national parks.
            They also aim to address privacy concerns that arise when camera
            drones fly in residential areas.
          </p>
          <p className="py-4 text-base">
            In several regions, such as the United States, drones weighing less
            than 250g are exempt from registration with civil aviation
            authorities. While registration might not be mandatory, it's still
            necessary to follow local drone laws. This includes the requirement
            to keep your drone within sight at all times when airborne.
          </p>

          <p className="py-4 text-base">
            Different countries have different rules. Previously, in the UK,
            drones weighing less than 250g were exempt from registration. This
            has changed: owners of any camera-equipped drone must now register
            their aircraft with the Civil Aviation Authority and obtain an
            Operator ID. This registration carries an annual fee of £10.33 for
            individuals aged 18 and above.
          </p>
          <p className="py-4 text-base">
            If your drone exceeds 250g in weight, you will also require a Flyer
            ID. To obtain this, you need to pass an online test featuring 40
            multiple-choice questions. The answers can be found in the Drone
            Code and are intended to promote safer flying practices.
          </p>
          <p className="py-4 text-base">
            For drones weighing less than 250g without a camera, neither ID is
            necessary. That said, you still need to comply with the UK's drone
            laws. According to the Drone Code, this means maintaining visual
            contact with your drone, flying no higher than 120m above the
            ground, staying at least 150m away from populated areas, and
            avoiding restricted airspace, typically found near airports.
          </p>
          <p className="py-4 text-lg">
            The Federal Aviation Administration requires registration of many
            drones flown in the US, for hobby or commercial purposes. To learn
            more about drone registration requirements, visit the Federal
            Aviation Administration's drone page{" "}
            <Link href="https://www.faa.gov/uas/">
              https://www.faa.gov/uas/
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
