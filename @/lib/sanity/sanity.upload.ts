// sanity-upload.ts

import { client } from "./sanity.client";

export async function uploadImageToSanity(
  file: File,
  droneId: Drone,
  caption: string,
  height: number | null
): Promise<ImageUploadResponse | null> {
  const imageDocument = {
    _type: "gallery",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: `image-${droneId}-${Date.now()}`,
      },
      caption: caption,
      height: height!,
    },
    taken_by: {
      _type: "reference",
      _ref: droneId._id,
    },
  };

  try {
    const response = await client.assets.upload("image", file, {
      contentType: "image/jpeg",
      filename: file.name,
    });

    if (response) {
      imageDocument.image.asset._ref = response._id;
      const createdImage = await client.create<ImageUploadResponse>(
        imageDocument
      );

      return createdImage;
    }
  } catch (error) {
    console.error("Image upload error:", error);
  }

  return null;
}
