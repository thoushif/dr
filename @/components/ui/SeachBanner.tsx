import { cn } from "@/lib/utils";
import { roboto_mono } from "@/lib/utils/fonts";
import Link from "next/link";
import React from "react";

function SearchBanner() {
  return (
    <div
      className={cn(
        " flex flex-col items-center justify-between py-4  gap-6 bg-gradient-to-b from-slate-200 to-slate-800 bg-clip-text uppercase text-slate-900",
        roboto_mono.className
      )}
    >
      <div className="flex items-center justify-center flex-grow m-5 space-x-8 lg:mt-0">
        <div>
          <Link href={"/drones"}>Show Featured</Link>
        </div>
        <div>
          <Link href="/drones/search/brands">Search by brands</Link>
        </div>
        <div>
          <Link href={"/drones/search"}>explore</Link>
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

export default SearchBanner;
