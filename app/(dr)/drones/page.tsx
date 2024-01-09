import DisplayFeaturedDroneThumbNails from "@/components/drones/DisplayFeaturedDroneThumbNails";
import { getFeaturedDrones } from "@/lib/sanity/sanity.util";
import { cn } from "@/lib/utils";
import { roboto_mono } from "@/lib/utils/fonts";
import Link from "next/link";
export const revalidate = 10800;
export default async function HomePage() {
  const bfDrones = await getFeaturedDrones("beginner-friendly");
  const racingDrones = await getFeaturedDrones("racing");
  const photographyDrones = await getFeaturedDrones("photography");
  const ffgraphyDrones = await getFeaturedDrones("family-fun");

  return (
    <div className="mx-4 mt-8 ">
      <div className="flex items-center justify-center w-full h-10 mb-10 cursor-default">
        <Link
          href="/drones/search"
          className={cn(
            "text-transparent mt-8  md:mt-4 md:text-5xl  text-lg animate-pulse bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase",
            roboto_mono.className
          )}
        >
          find your drone - explore all
        </Link>
      </div>
      {/** Beginner-Friendly Drones */}

      <section>
        <div className="flex items-center justify-between ">
          <h2 className="mt-8 mb-4 text-2xl font-bold text-slate-800">
            Beginner-Friendly Drones
          </h2>
          <Link href="/explore/beginner-friendly" className="text-slate-500">
            Explore All Beginner-Friendly Drones
          </Link>
        </div>
        <DisplayFeaturedDroneThumbNails drones={bfDrones} />
      </section>

      {/** Racing Drones */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-2xl font-bold text-slate-800">
            Racing Drones
          </h2>
          <Link href="/explore/racing" className="text-slate-500">
            Explore All Racing Drones
          </Link>
        </div>
        <DisplayFeaturedDroneThumbNails drones={racingDrones} />
      </section>

      {/** Photography Drones */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-2xl font-bold text-slate-800">
            Photography Drones
          </h2>
          <Link href="/explore/photography" className="text-slate-500">
            Explore All Photography Drones
          </Link>
        </div>
        <DisplayFeaturedDroneThumbNails drones={photographyDrones} />
      </section>

      {/** Family-Fun Drones */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-2xl font-bold text-slate-800">
            Family-Fun Drones
          </h2>
          <Link href="/explore/family-fun" className="text-slate-500">
            Explore All Family-Fun Drones
          </Link>
        </div>
        <DisplayFeaturedDroneThumbNails drones={ffgraphyDrones} />
      </section>
      <div className="flex items-center justify-center w-full h-10 mb-10 cursor-default">
        <Link
          href="/drones/search"
          className={cn(
            "text-transparent text-5xl animate-bounce bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase justify-center ",
            roboto_mono.className
          )}
        >
          find your drone - explore all
        </Link>
      </div>
    </div>
  );
}
