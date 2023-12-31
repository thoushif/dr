"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Banner() {
  return (
    <div className="flex flex-col items-center justify-between py-4 font-bold lg:flex-row lg:space-x-5 ">
      <Link href="/">
        <Image
          className="-ml-5"
          width={200}
          height={200}
          src="/logo.gif"
          alt="Logo"
        />
      </Link>
      <div className="flex mt-5 space-x-4 lg:mt-0">
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
            href={"/gallery"}
            className="flex px-5 py-1 text-sm text-center text-white bg-gray-700 rounded-full md:text-base"
          >
            Showcase
          </Link>
        </div>
        {/* 
        <div>
          <Link
            href={"/events"}
            className="flex px-5 py-1 text-sm text-center text-white bg-gray-700 rounded-full md:text-base"
          >
            Events
          </Link>
        </div>
        <div>
          <Link
            href={"/events/calendar"}
            className="flex px-5 py-1 text-sm text-center text-white bg-gray-700 rounded-full md:text-base"
          >
            Events Calendar
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default Banner;
