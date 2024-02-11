"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Banner() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col justify-between py-4 font-bold lg:items-center lg:flex-row lg:space-x-5 ">
      {/* Hamburger menu button */}
      <Link href="/">
        <Image
          className="inline-block grayscale lg:justify-start"
          width={250}
          height={250}
          src="/logo.gif"
          alt="Logo"
        />
      </Link>{" "}
      <div className="mx-5 lg:hidden ">
        <button onClick={() => setShowMenu(!showMenu)}>
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {showMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>
      {/* Logo */}
      {/* Menu items */}
      <div
        className={`lg:flex mt-5 justify-start space-x-4 lg:mt-0 ${
          showMenu ? "flex" : "hidden"
        } flex-col lg:flex-row`}
      >
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
            href="/journal"
            className="flex px-5 py-1 text-sm text-center text-white bg-gray-700 rounded-full md:text-base"
          >
            Journals
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
      </div>
    </div>
  );
}

export default Banner;
