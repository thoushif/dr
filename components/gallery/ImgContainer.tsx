"use client";
import CustomModal from "@components/CustomModal";
import urlFor from "@lib/urlFor";
import Image from "next/image";
import Link from "next/link";

import React, { useState, useRef } from "react";
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
      <div className="overflow-hidden rounded-xl group">
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
          <div className="transition-transform duration-200 ease-out w-80 h-80 dronesop-shadow-xl">
            <Image
              className="object-cover object-left rounded-md lg:object-center"
              src={urlFor(photo.image).url()}
              alt="drone image"
              fill
            />
          </div>
        </CustomModal>
      )}
    </div>
  );
}
