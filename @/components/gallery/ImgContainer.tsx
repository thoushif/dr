"use client";
import urlFor from "@/lib/sanity/urlFor";
import CustomModal from "@/lib/utils/CustomModal";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { spawn } from "child_process";

type Props = {
  photo: Photo;
};
const extractYouTubeShortsVideoId = (url: string): string | null => {
  // Example YouTube Shorts URL: https://www.youtube.com/shorts/abc123xyz
  const regex = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);

  return match ? match[1] : null;
};

export default function ImgContainer({ photo }: Props) {
  console.log("photo", photo);
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

  // const mediaUrl = photo?.media_url;
  // const mediaUrl =
  //   "https://www.instagram.com/reel/C0j88YPJgvj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==";
  // console.log("meida url", mediaUrl);
  // Function to determine the type of media and return the corresponding component
  const renderMediaComponent = ({
    width,
    height,
  }: {
    width?: SafeNumber;
    height?: SafeNumber;
  }) => {
    // if (mediaUrl && mediaUrl.includes("instagram.com")) {
    //   // If the media URL is from Instagram, render the InstagramPost component
    //   return (
    //     <iframe
    //       className="absolute top-0 left-0 w-full h-full"
    //       src={mediaUrl}
    //       title="YouTube Shorts"
    //       allowFullScreen
    //     />
    //   );
    // } else if (mediaUrl && mediaUrl.includes("youtube.com/shorts")) {
    //   // If the media URL is from YouTube Shorts, render the YouTubeShorts component
    //   return (
    //     <iframe
    //       className="absolute top-0 left-0 w-full h-full"
    //       src={mediaUrl}
    //       title="YouTube Shorts"
    //       allowFullScreen
    //     />
    //   );
    // } else {
    // Default to rendering an Image component if the media type is not recognized
    return (
      <div>
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
    );
    // }
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
  const [showCode, setShowCode] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="w-[250px] justify-self-center"
        style={{ gridRow: `span ${photoSpans}` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="overflow-hidden rounded-xl group hover:scale-105">
          {renderMediaComponent({ width, height })}
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

              <div className="absolute bottom-0 right-0 flex items-end justify-items-start ">
                <span className="p-2 text-sm font-semibold text-white truncate bg-black bg-opacity-50">
                  by - {photo.image.nickname}
                  {photo.image.email && <span>({photo.image.email})</span>}
                </span>
                {showCode && <span className="text-xs">{photo._id}</span>}
                <MdInfoOutline
                  onClick={() => setShowCode(!showCode)}
                  title={photo.image.asset._ref}
                />
              </div>
            </div>
          </CustomModal>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
