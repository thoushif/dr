"use client";
import { uploadImageToSanity } from "@lib/sanity.upload";
import urlFor from "@lib/urlFor";
import Image from "next/image";
// pages/index.tsx

import React, { useState, ChangeEvent } from "react";
import HcaptchaForm from "./HCatchaForm";

type Props = {
  drone: Drone;
};

const AddImage = ({ drone }: Props) => {
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [createdImage, setCreatedImage] = useState<ImageUploadResponse | null>(
    null
  );

  const handleHCaptchaVerify = (token: string) => {
    setHCaptchaToken(token);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setSelectedImage(file);
  };

  const handleUploadImage = async () => {
    if (!hCaptchaToken) {
      alert("Please complete the hCaptcha challenge");
      return;
    }

    if (!selectedImage) {
      alert("Please select an image to upload");
      return;
    }
    console.log(selectedImage);
    // Upload the image to Sanity and get the created image document
    const createdImage = await uploadImageToSanity(selectedImage, drone);

    if (createdImage) {
      alert("Image uploaded successfully to Sanity!");
      setCreatedImage(createdImage);
    } else {
      alert("Image upload failed");
    }
  };

  return (
    <div>
      <h1>Image Upload with hCaptcha</h1>
      <HcaptchaForm onVerify={handleHCaptchaVerify} />

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <button onClick={handleUploadImage}>Upload Image</button>

      {createdImage && (
        <>
          <p className="mb-4 text-xl">
            Thanks so much for uploading your picture
          </p>
          <p className="text-lg">
            This will get featured in the gallery in no time
          </p>
          <Image
            className="object-cover object-left rounded-md lg:object-center"
            src={urlFor(createdImage.image).url()}
            alt="drone image"
            width={600}
            height={600}
          />
        </>
      )}
    </div>
  );
};

export default AddImage;
