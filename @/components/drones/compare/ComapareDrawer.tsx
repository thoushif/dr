"use client";
import { useDroneCompare } from "@/contexts/DroneCompareContext";
import urlFor from "@/lib/sanity/urlFor";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdAdd, MdClearAll, MdClose, MdPlusOne } from "react-icons/md";
import { MdMinimize } from "react-icons/md";
import { useMediaQuery } from "@react-hook/media-query";

const CompareDrawer = () => {
  const screenSize = useMediaQuery("(max-width: 1024px)");

  const maxItems = screenSize ? 2 : 5;
  const {
    selectedDrones,
    removeDroneFromCompare,
    setCompareDrawerMinimized,
    isCompareDrawerMinimized,
  } = useDroneCompare();
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  useEffect(() => {
    return () => {};
  }, [selectedDrones]);

  const droneIds = selectedDrones?.map((drone) => drone._id).join(",");

  const toggleMinimize = () => {
    setCompareDrawerMinimized((prev) => !prev);
  };
  const clearDrones = () => {
    selectedDrones.forEach((drone) => {
      removeDroneFromCompare(drone); // Assuming _id is the unique identifier, adjust as needed
    });
  };
  return (
    <div
      className={`fixed bottom-[180px] p-2  shadow-xl transform -translate-x-1/2 left-1/2  rounded-t-md bg-opacity-70  hover:bg-opacity-100 ${
        !isCompareDrawerMinimized ? "bg-slate-200" : ""
      }`}
    >
      {!isCompareDrawerMinimized && (
        <motion.div
          className="grid items-center grid-cols-3 gap-3 md:grid-cols-6 justify-items-center"
          animate="visible"
          initial="hidden"
          transition={{ delay: 0.1 }}
          variants={variants}
        >
          {selectedDrones.map((drone) => (
            <div key={`compare${drone._id}`} className="relative">
              <MdClose
                onClick={() => removeDroneFromCompare(drone)}
                title={"remove"}
                className="absolute top-0 right-0   text-sm font-extrabold text-red-800 rounded-full cursor-pointer hover:scale-125"
              />

              <Image
                className=" border-2 rounded-md md:object-center"
                src={urlFor(drone?.drone_image?.image).url()}
                alt={drone?.aircraft?.name}
                title={drone?.aircraft?.name}
                height={140}
                width={130}
              />
            </div>
          ))}
          {selectedDrones.length >= 1 && selectedDrones.length < maxItems && (
            <>
              {Array.from(
                { length: maxItems - selectedDrones.length },
                (_, index) => (
                  <Link key={index} href={`/drones/`}>
                    <div
                      className="relative flex items-center justify-center mt-12 opacity-[0.35] cursor-pointer  w-10 md:w-28 h-10 md:h-28 child-drone hover:scale-110"
                      title="Add a drone to start comparing..."
                    >
                      <MdAdd />
                    </div>
                  </Link>
                )
              )}
            </>
          )}

          <Link
            className={`items-center px-2 md:px-4 py-1 md:py-2 text-sm md:text-base mt-14 font-bold text-zinc-200 align-middle rounded-none  md:rounded-sm  ${
              !(selectedDrones.length >= 2)
                ? "bg-slate-200 cursor-not-allowed"
                : "bg-slate-900"
            }`}
            href={`/drones/compare?drones=${droneIds}`}
            style={{
              pointerEvents: !(selectedDrones.length >= 2) ? "none" : "auto",
              backgroundColor: !(selectedDrones.length >= 2)
                ? "bg-slate-200"
                : "bg-slate-900",
            }}
            aria-disabled={selectedDrones.length !== 2}
            tabIndex={!(selectedDrones.length >= 2) ? -1 : undefined}
          >
            Compare
          </Link>
        </motion.div>
      )}

      {!isCompareDrawerMinimized && (
        <button
          onClick={clearDrones}
          className="absolute flex flex-row p-2 cursor-pointer top-1 right-16"
        >
          <span
            className="p-2 rounded-full font-base bg-slate-400 hover:bg-slate-500"
            title="clear all and close"
          >
            <MdClearAll />
          </span>
        </button>
      )}

      <button
        onClick={toggleMinimize}
        className="absolute flex flex-row p-2 cursor-pointer top-1 right-5"
      >
        {isCompareDrawerMinimized ? (
          // Icon for maximize

          <div className="w-20 h-20 text-3xl rounded-full bg-slate-200 drone-compare opacity-40 hover:opacity-80"></div>
        ) : (
          <>
            <span
              className="p-2 rounded-full font-base bg-slate-400 hover:bg-slate-500"
              title="minimize"
            >
              <MdMinimize />
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default CompareDrawer;
