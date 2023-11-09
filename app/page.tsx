import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default async function HomePage() {
  return (
    <>
      <section id="featured-drones" className="py-8">
        <div className="container p-4 mx-auto bg-white rounded-lg shadow">
          <div className="flex p-4 space-x-4 overflow-x-scroll whitespace-no-wrap">
            <Image
              src="https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"
              alt="Drone 1"
              width={"80"}
              height={"80"}
              className="w-64 h-auto"
            />
            <Image
              src="https://images.unsplash.com/photo-1548430842-2de69aaf6bc8"
              alt="Drone 2"
              width={"80"}
              height={"80"}
              className="w-64 h-auto"
            />
            <Image
              src="https://images.unsplash.com/photo-1533229394718-02d54f4a108e"
              alt="Drone 3"
              width={"80"}
              height={"80"}
              className="w-64 h-auto"
            />
            <Image
              src="https://images.unsplash.com/photo-1507582020474-9a35b7d455d9"
              alt="Drone 1"
              width={"80"}
              height={"80"}
              className="w-64 h-auto"
            />
            <Image
              src="https://images.unsplash.com/photo-1548430842-2de69aaf6bc8"
              alt="Drone 2"
              width={"80"}
              height={"80"}
              className="w-64 h-auto"
            />
            <Image
              src="https://images.unsplash.com/photo-1533229394718-02d54f4a108e"
              alt="Drone 3"
              width={"80"}
              height={"80"}
              className="w-64 h-auto"
            />
          </div>
        </div>
      </section>

      <section id="latest-news">
        <div className="container px-0 py-0 mx-auto bg-white rounded-lg shadow">
          <div className="p-1">
            <h2 className="text-2xl font-bold text-gray-800 transition duration-300 hover:text-blue-500">
              Exciting Drone Innovation
            </h2>
            <Skeleton className="h-4 w-[250px]" />
            <p className="text-sm text-gray-500">Posted on October 15, 2023</p>

            <p className="mt-2 text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              eget ipsum velit. In hac habitasse platea dictumst. Sed feugiat
              quam at tortor facilisis, non cursus metus venenatis. Vivamus ut
              metus at turpis auctor accumsan. Nullam eget quam in felis
              fringilla sagittis. Suspendisse potenti.
            </p>

            <a
              href="/drone-details"
              className="block mt-4 text-right text-blue-500 hover:underline"
            >
              Read More
            </a>
          </div>
        </div>
      </section>
      <section
        id="hot-gallery"
        className="relative p-4 overflow-hidden bg-gray-100"
      >
        <div className="container p-4 mx-auto bg-white rounded-lg shadow">
          Hot from Gallery
        </div>
      </section>
      <section id="laws-of-flying-drones" className="py-8">
        <div className="container p-4 mx-auto bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 transition duration-300 hover:text-blue-500">
            Laws of flying Drones
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
        </div>
      </section>
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Join Newsletter</h2>
          <p className="mt-2 text-gray-600">
            Exclusive content, latest news about drones & upcoming events sent
            straight to your inbox.
          </p>
          <div className="max-w-md mx-auto mt-6">
            <form>
              <div className="flex items-center py-2 border-b-2 border-gray-600">
                <input
                  type="text"
                  className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                  placeholder="Name"
                />
                <input
                  type="email"
                  className="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
                  placeholder="Email"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-2 py-1 text-sm text-white bg-indigo-600 border-4 border-indigo-600 rounded-full cursor-pointer hover:bg-indigo-700 hover:border-indigo-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <footer className="py-6 text-white bg-gray-900">
        <div className="container flex flex-wrap justify-between mx-auto">
          <div className="w-full md:w-1/2 lg:w-1/4">
            <h3 className="mb-4 text-lg font-semibold">About</h3>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/terms">Terms and Conditions</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4">
            <h3 className="mb-4 text-lg font-semibold">Shop & Events</h3>
            <ul>
              <li>
                <a href="/shop">Shop</a>
              </li>
              <li>
                <a href="/events">Events</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
