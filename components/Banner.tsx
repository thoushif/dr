function Banner() {
  return (
    <div className="flex flex-col justify-between p-5 px-10 mb-10 font-bold lg:flex-row lg:space-x-5">
      <div>
        <h1 className="text-7xl">Dr-one</h1>
        <h2 className="mt-5 md:mt-2">
          Welcome to{" "}
          <span className="underline decoration-4 decoration-[#7386aa]">
            Every Dr owners'
          </span>{" "}
          favorite place in the sky.
        </h2>
      </div>
      <p className="max-w-sm mt-5 text-gray-400 md:mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, itaque,
        maiores autem repellat aliquam incidunt dicta dignissimos eum.
      </p>
    </div>
  );
}

export default Banner;
