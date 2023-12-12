"use client";
import { uploadImageToSanity } from "@/lib/sanity/sanity.upload";
import urlFor from "@/lib/sanity/urlFor";
import Image from "next/image";

// pages/index.tsx

import { useToast } from "@/components/ui/use-toast";
import { ChangeEvent, useState } from "react";
import HeightMarker from "./HeighMarker";
import HcaptchaForm from "@/lib/utils/HCatchaForm";

type Props = {
  drone: Drone;
};

const AddImage = ({ drone }: Props) => {
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [createdImage, setCreatedImage] = useState<ImageUploadResponse | null>(
    null
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [height, setHeight] = useState<number>(50);
  const { toast } = useToast();
  const handleHCaptchaVerify = (token: string | null) => {
    setHCaptchaToken(token);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
    setSelectedImage(file);
  };
  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setCaption("");
    setHeight(500);
  };

  const handleUploadImage = async () => {
    if (!hCaptchaToken) {
      toast({
        description: " ⚠️ Please complete the hCaptcha challenge",
      });
      return;
    }

    if (!selectedImage) {
      toast({
        description: " ⚠️ Please select an image to upload",
      });
      return;
    }

    // Upload the image to Sanity and get the created image document
    const createdImage = await uploadImageToSanity(
      selectedImage,
      drone,
      caption,
      height
    );

    if (createdImage) {
      setCreatedImage(createdImage);
      toast({
        description: " ✔️ Successfuly uploaded",
        variant: "success",
      });
      handleReset();
    } else {
      alert("Image upload failed");
      handleReset();
    }
  };

  return (
    <>
      <div className="grid max-w-4xl grid-cols-1 gap-4 mx-auto mt-8 md:grid-cols-2 ">
        {/* First cell: Upload control */}
        <div className="flex flex-col items-center">
          <input type="file" onChange={handleImageChange} className="mt-4" />
        </div>
        <label className="block mb-2 text-sm font-semibold">
          Taken from {height}ft height
        </label>
        {/* Second cell: Image preview */}
        <div className="relative flex items-center">
          {imagePreview && (
            <div className="relative reel">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full rounded max-h-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="p-2 text-lg font-semibold text-white bg-black bg-opacity-50 rounded">
                  Preview
                </span>
              </div>
            </div>
          )}
          <HeightMarker heightParam={height} setHeightParam={setHeight} />
        </div>
        {/* Third cell: Input for caption and slider for height */}
        <div className="flex flex-col items-center">
          <label className="block mb-2 text-sm font-semibold">
            Caption: (500 char max)
          </label>
          <textarea
            value={caption}
            maxLength={250}
            placeholder={"captured with care.."}
            rows={4}
            cols={50}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:border-blue-400"
          />{" "}
          <HcaptchaForm onVerify={handleHCaptchaVerify} />
          <button
            type="submit"
            onClick={handleUploadImage}
            // disabled={!hCaptchaToken}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue disabled:grayscale"
          >
            Save
          </button>
          {/* <input
            type="range"
            value={height!}
            onChange={(e) => setHeight(parseInt(e.target.value, 10))}
            min={0}
            max={5000}
            className="w-full mb-4"
          /> */}
          {/* <Slider defaultValue={[33]} max={100} step={1} /> */}
        </div>
        {/* Fourth cell: Save button */}
      </div>
      {createdImage && (
        <>
          <div className="flex flex-col items-center justify-center">
            <p className="mb-4 text-xl text-center">
              Thanks so much for uploading this great one. This will get
              featured, once approved, in the gallery in no time
            </p>
            <div className="relative">
              <Image
                className="rounded-md lg:object-center"
                src={urlFor(createdImage.image).url()}
                alt="drone image"
                width={600}
                height={600}
              />
              <div className="absolute inset-0 flex items-start justify-end">
                <span className="p-2 text-sm font-semibold text-white bg-black bg-opacity-50 ">
                  {createdImage.image.height} ft
                </span>
              </div>
              <div className="absolute inset-0 flex items-end justify-items-start">
                <span className="p-2 text-lg font-semibold text-white bg-black bg-opacity-50 ">
                  {createdImage.image.caption}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddImage;
