import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <div className="flex flex-col items-center justify-between py-4 font-bold lg:flex-row lg:space-x-5">
      <div>
        <h2 className="mt-5 md:mt-2">
          Welcome to{" "}
          <span className="underline decoration-4 decoration-[#7386aa]">
            Every Drone owners'
          </span>{" "}
          favorite place to fly.
        </h2>
      </div>
      <div className="flex space-x-4">
        <div>
          <Link
            href={"/"}
            className="flex px-5 py-1 text-sm text-center text-white bg-gray-700 rounded-full md:text-base"
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            href="/drones"
            className="flex px-5 py-1 text-sm text-center text-white bg-gray-700 rounded-full md:text-base"
          >
            Drones
          </Link>
        </div>
        <div>
          <Link
            href={"/"}
            className="flex px-5 py-1 text-sm text-center text-white bg-gray-700 rounded-full md:text-base"
          >
            Gallery
          </Link>
        </div>
        <div>
          <Link
            href={"/"}
            className="flex px-5 py-1 text-sm text-center text-white bg-gray-700 rounded-full md:text-base"
          >
            Competitions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
