"use client";
import { getGallery } from "@/lib/sanity/sanity.util";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegSadCry } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { Button } from "../ui/button";
import ImgContainer from "./ImgContainer";

type Props = {
  gallery: Photo[] | null;
  isHot: boolean;
};

export const revalidate = 2;

export default function GalleryHome({ gallery, isHot }: Props) {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [photos, setPhotos] = useState<Photo[] | null>(gallery);

  const loadMorePhotos = async () => {
    const newPhotos = await getGallery(pageIndex);
    if (newPhotos && newPhotos.length > 0) {
      setPageIndex(pageIndex + 1);
    } else {
      setPageIndex(-1);
    }
    setPhotos((prevPhotos) =>
      prevPhotos ? [...prevPhotos, ...newPhotos] : newPhotos
    );
  };

  return (
    <>
      {!isHot && (
        <Link
          href={"/gallery/add"}
          className="px-8 py-5 text-center text-white rounded-md bg-slate-500 hover:bg-slate-700 "
        >
          Clicked a great picture 📸 ? - Add it here!!
        </Link>
      )}
      <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
        {photos &&
          photos.map((photo) => <ImgContainer key={photo._id} photo={photo} />)}
      </section>
      {!isHot && pageIndex >= 0 ? (
        <Button
          onClick={loadMorePhotos}
          className="m-4 text-zinc-200 bg-slate-600 w-full"
        >
          <MdOutlineKeyboardDoubleArrowDown />
        </Button>
      ) : (
        !isHot && (
          <span className="flex items-center justify-center m-4">
            No more results <FaRegSadCry className="ml-4" />
          </span>
        )
      )}
    </>
  );
}
