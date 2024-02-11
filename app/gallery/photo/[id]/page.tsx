import { getGallerySinglePhoto } from "@/lib/sanity/sanity.util";
import urlFor from "@/lib/sanity/urlFor";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OnlyImage = async ({ params }: { params: { id: string } }) => {
  const photo = await getGallerySinglePhoto(params.id);
  const imageUrl = urlFor(photo.image)
    .width(1024)
    .height(1024)
    .dpr(2)
    .quality(100)
    .url();
  const blurUrl = urlFor(photo.image).width(20).quality(20).url(); // Low-quality blurred image

  return photo && photo.image ? (
    <div className="h-auto w-auto items-center flex flex-col justify-center m-4">
      <div className="flex justify-between items-center">
        <span className="p-2 text-sm font-semibold text-slate-900    ">
          Taken from height: {photo.image.height} ft
        </span>
        <span className="p-2 text-sm font-semibold text-slate-900">
          {photo.image.nickname && (
            <>
              by - {photo.image.nickname}
              {photo.image.email && <span>({photo.image.email})</span>}
            </>
          )}
          {!photo.image.nickname && photo.image.email && (
            <>{photo.image.email}</>
          )}
        </span>
      </div>
      {photo.image.caption && (
        <span className="p-2 text-sm font-semibold text-slate-900   ">
          "{photo.image.caption}"
        </span>
      )}
      <Image
        src={imageUrl}
        alt="drone image"
        placeholder="blur"
        height={"1024"}
        width={"1024"}
        blurDataURL={blurUrl}
      />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="mb-4 text-xl">
          You are here with out a good photo,{" "}
          <Link href="/gallery/add"> go back </Link> and add a picture
        </p>
      </div>
    </div>
  );
};

export default OnlyImage;
