"use client";
import urlFor from "@lib/urlFor";
import Image from "next/image";
import React, { useState, useRef } from "react";
import Tooltip from "./Tooltip";

type Props = {
  droneImage: DroneImage;
  droneId: string;
};

function DroneImage({ droneImage, droneId }: Props) {
  const [width, setWidth] = useState<number | `${number}` | undefined>(0);
  const [height, setHeight] = useState<number | `${number}` | undefined>(0);

  const getImageWidth = (img: any) => {
    if (img.width && img.height) {
      setWidth(img.width);
      setHeight(img.height);
    }
    // console.log("Image Width:", width, "pixels");
    // console.log("Image height:", height, "pixels");
  };

  return (
    <div className="tree-image">
      <div className="relative w-auto transition-transform duration-200 ease-out h-96 dronesop-shadow-xl">
        <Image
          onLoadingComplete={getImageWidth}
          className="object-cover object-left rounded-md lg:object-center"
          src={urlFor(droneImage.image).url()}
          alt="drone image"
          fill
        />
      </div>
      {width &&
        height &&
        droneImage.coordinates.map((coord, index) => (
          <Tooltip
            key={index}
            //   x={coord.x}
            //   y={coord.y}
            x={(coord.x * Number(width)) / 100}
            y={(coord.y * Number(height)) / 100}
            details={coord.details}
            title={coord.title}
            type={coord.type}
            droneId={droneId}
          />
        ))}
    </div>
  );
}

export default DroneImage;
