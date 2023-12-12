"use client";
import { useDroneCompare } from "@/contexts/DroneCompareContext";
import urlFor from "@/lib/sanity/urlFor";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
const CompareDrawer = () => {
  const { selectedDrones, removeDroneFromCompare } = useDroneCompare();
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  useEffect(() => {
    return () => {};
  }, [selectedDrones]);

  const droneIds = selectedDrones?.map((drone) => drone._id).join(",");
  const [isMinimized, setIsMinimized] = React.useState(false);

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };
  return (
    <div
      className={`fixed bottom-[180px] p-2 transform -translate-x-1/2 left-1/2  rounded-t-md bg-opacity-70 ${
        !isMinimized ? "bg-slate-400" : ""
      }`}
    >
      {!isMinimized && (
        <motion.div
          className="grid items-center grid-cols-3 gap-4 justify-items-center "
          animate="visible"
          initial="hidden"
          transition={{ delay: 0.1 }}
          variants={variants}
        >
          {selectedDrones.map((drone) => (
            <div key={`compare${drone._id}`} className="relative">
              <button
                onClick={() => removeDroneFromCompare(drone)}
                className="absolute top-[-8px] right-0 p-2 text-sm font-extrabold text-red-800 rounded-full cursor-pointer"
              >
                X
              </button>
              <Image
                className="m-4 rounded-md lg:object-center"
                src={urlFor(drone?.drone_image?.image).url()}
                alt={drone?.aircraft?.name}
                title={drone?.aircraft?.name}
                height={120}
                width={120}
              />
            </div>
          ))}
          {selectedDrones.length === 1 && (
            <Link href={`/drones/`}>
              <div
                className="mt-12 cursor-pointer w-28 h-28 child-drone hover:scale-110"
                title="Add a drone to compare"
              ></div>
            </Link>
          )}

          <Link
            className={`items-center px-4 py-2 mt-4 text-white align-middle rounded-sm justify-items-center ${
              selectedDrones.length !== 2
                ? "bg-slate-200 cursor-not-allowed"
                : "bg-slate-800"
            }`}
            href={`/drones/compare?d=${droneIds}`}
            style={{
              pointerEvents: selectedDrones.length !== 2 ? "none" : "auto",
              backgroundColor:
                selectedDrones.length !== 2 ? "bg-slate-200" : "bg-slate-800",
            }}
            aria-disabled={selectedDrones.length !== 2}
            tabIndex={selectedDrones.length !== 2 ? -1 : undefined}
          >
            Compare
          </Link>
        </motion.div>
      )}
      <button
        onClick={toggleMinimize}
        className="absolute p-2 cursor-pointer top-2 right-2 "
      >
        {isMinimized ? (
          // Icon for maximize
          <span className="w-10 h-10 m-5 text-3xl rounded-full bg-slate-500">
            ⚖
          </span>
        ) : (
          // Icon for minimize
          <span className="font-extrabold">_</span>
        )}
      </button>
    </div>
  );
};

export default CompareDrawer;
