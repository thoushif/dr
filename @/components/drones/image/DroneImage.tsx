"use client";
import urlFor from "@/lib/sanity/urlFor";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  drone: Drone;
};

function DroneImage({ drone }: Props) {
  const [selectedImage, setSelectedImage] = useState(
    drone.drone_image
      ? urlFor(drone.drone_image.image).width(1200).height(1200).url()
      : ""
  );

  const handleThumbnailClick = (thumbnailUrl: string) => {
    setSelectedImage(thumbnailUrl);
  };

  return (
    <div className="w-auto h-auto">
      {/* image placeholder, default is the drone main image */}
      {drone.drone_image && (
        <Image
          className="object-cover object-left rounded-md lg:object-center"
          src={selectedImage}
          alt="drone image"
          width={1000}
          height={1000}
        />
      )}

      {/* Thumbnail slider placeholder */}
      <div className="flex flex-wrap mt-4 space-x-2 ">
        {/* Main image thumbnail */}
        {drone.drone_image && (
          <div
            onClick={() =>
              handleThumbnailClick(
                urlFor(drone.drone_image.image).width(1200).height(1200).url()
              )
            }
            className={`w-16 h-16 cursor-pointer border-2 ${
              selectedImage ===
              urlFor(drone.drone_image.image).width(1200).height(1200).url()
                ? "border-blue-500"
                : "border-transparent"
            }`}
          >
            <Image
              src={urlFor(drone.drone_image.image).url()}
              alt="Main Thumbnail"
              width={64}
              height={64}
              className="rounded-md"
            />
          </div>
        )}

        {/* Other thumbnails */}
        {drone.images &&
          drone.images.map((image, index) => (
            <div
              key={index}
              onClick={() =>
                handleThumbnailClick(
                  urlFor(image).width(1200).height(1200).url()
                )
              }
              className={`w-16 h-16 cursor-pointer border-2 ${
                selectedImage === urlFor(image).url()
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <Image
                src={urlFor(image).url()}
                alt={`Thumbnail ${index}`}
                width={64}
                height={64}
                className="rounded-md"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default DroneImage;
