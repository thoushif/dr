import React from "react";
import ImgContainer from "./ImgContainer";

type Props = {
  photos: Photo[];
};

export default function GalleryHome({ photos }: Props) {
  return (
    <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
      {photos.map((photo) => (
        <ImgContainer key={photo._id} photo={photo} />
      ))}
    </section>
  );
}
