"use client";
import urlFor from "@/lib/sanity/urlFor";
import CustomModal from "@/lib/utils/CustomModal";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";
type Props = {
  photo: Photo;
};

export default function ImgContainer({ photo }: Props) {
  const [width, setWidth] = useState<number | `${number}` | undefined>(1000);
  const [height, setHeight] = useState<number | `${number}` | undefined>(1000);
  const getImageWidth = (img: any) => {
    if (img.width && img.height) {
      setWidth(img.width);
      setHeight(img.height);
    }
    // console.log("Image Width:", width, "pixels");
    // console.log("Image height:", height, "pixels");
  };

  let widthHeightRatio: number = 1;
  if (height && width) {
    widthHeightRatio = +height / +width;
  }
  const galleryHeight = Math.ceil(250 * widthHeightRatio);
  const photoSpans = Math.ceil(galleryHeight / 10) + 1;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className="w-[250px] justify-self-center"
      style={{ gridRow: `span ${photoSpans}` }}
    >
      <div className="overflow-hidden rounded-xl group hover:scale-105">
        <Image
          onLoadingComplete={getImageWidth}
          src={urlFor(photo.image).url()}
          alt={`photo taken by ${photo.taken_by?.aircraft.name}`}
          sizes="250px"
          width={width}
          height={height}
          className="group-hover:opacity-75"
          onClick={openModal}
        />
      </div>

      {isModalOpen && photo && (
        <CustomModal onClose={closeModal}>
          <div className="relative transition-transform duration-200 ease-out">
            <Image
              src={urlFor(photo.image).url()}
              alt="drone image"
              width={Number(width) + 300}
              height={Number(height) + 300}
            />
            <div className="absolute inset-0 flex items-start justify-start">
              <span className="p-2 text-sm font-semibold text-white bg-black bg-opacity-50 ">
                {photo.image.height} ft
              </span>
            </div>
            <div className="absolute inset-0 bottom-0 flex items-end justify-items-start ">
              <span className="p-2 text-sm font-semibold text-white truncate bg-black bg-opacity-50">
                {photo.image.caption}
              </span>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
}
