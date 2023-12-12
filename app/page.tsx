import Link from "next/link";

export default async function HomePage() {
  return (
    <>
      <section id="hero-section">
        <div className="relative h-screen ">
          <video autoPlay loop muted className="object-cover w-full h-full">
            <source src="/videos/drone-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 overlay"></div>
          <div className="absolute z-10 text-center text-white transform -translate-x-1/2 -translate-y-1/2 hero-content top-1/2 left-1/2">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">Drone Zone</h1>
            <p className="mb-12 text-lg md:text-xl">
              Welcome to{" "}
              <span className="underline decoration-4 decoration-[#7386aa]">
                Every Drone owners'
              </span>{" "}
              favorite place to fly.
            </p>
            <Link
              href="/drones"
              className="px-8 py-4 text-lg font-semibold text-white rounded-md cursor-pointer bg-slate-500 hover:bg-slate-700 "
            >
              Explore Drones
            </Link>
          </div>
        </div>
      </section>
      <section id="featured-drones" className="py-8"></section>
      <section id="latest-news">
        <div className="container px-0 py-0 mx-auto bg-white rounded-lg shadow">
          <div className="p-1">
            <h2 className="text-2xl font-bold transition duration-300 text-slate-800 hover:text-slate-500">
              Exciting Drone Innovation
            </h2>

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
                  className="flex-shrink-0 px-2 py-1 text-sm text-white border-4 rounded-full cursor-pointer bg-slate-600 border-slate-600 hover:bg-slate-700 hover:border-slate-700"
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
    </>
  );
}
