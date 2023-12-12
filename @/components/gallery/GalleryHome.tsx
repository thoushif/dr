import Link from "next/link";
import React from "react";
import ImgContainer from "./ImgContainer";

type Props = {
  photos: Photo[] | null;
};

export default function GalleryHome({ photos }: Props) {
  return (
    <>
      <Link
        href={"/gallery/add"}
        className="px-8 py-5 text-center text-white rounded-md bg-slate-500 hover:bg-slate-700 "
      >
        Clicked a great picture 📸 ? - Add it here!!
      </Link>

      <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
        {photos &&
          photos.map((photo) => <ImgContainer key={photo._id} photo={photo} />)}
      </section>
    </>
  );
}
