"use client";
import urlFor from "@lib/urlFor";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Tooltip from "./Tooltip";

type Props = {
  droneImage: DroneImage;
  droneId: string;
};

function DroneImage({ droneImage, droneId }: Props) {
  const [width, setWidth] = useState<number | `${number}` | undefined>(0);
  const [height, setHeight] = useState<number | `${number}` | undefined>(0);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const getImageWidth = (img: any) => {
    if (img.width && img.height) {
      setWidth(img.width);
      setHeight(img.height);
    }
    // console.log("Image Width:", width, "pixels");
    // console.log("Image height:", height, "pixels");
  };
  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      console.log("resize running");
      getImageWidth(imageRef.current);
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="tree-image">
      <div className="relative w-auto transition-transform duration-200 ease-out h-96 dronesop-shadow-xl">
        <Image
          ref={(img) => {
            if (img) {
              imageRef.current = img;
            }
          }}
          onLoadingComplete={getImageWidth}
          className="object-cover object-left rounded-md lg:object-center"
          src={urlFor(droneImage.image).url()}
          alt="drone image"
          width={800}
          height={800}
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
