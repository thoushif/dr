// Tooltip.js
import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity/sanity.client";
import urlFor from "@/lib/sanity/urlFor";
import Image from "next/image";

const query = groq`
*[_type == "drone" && _id == $droneId] {
    "image": images[(caption == $caption)][0] {
      ...
    }
  }[0]
`;
type withDroneId = Coordinates & { droneId: string };

export default function Tooltip({
  x,
  y,
  title,
  details,
  type,
  droneId,
}: withDroneId) {
  const [isHovered, setIsHovered] = useState(false);
  const [image, setImage] = useState<DroneImage | null>(null);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const caption = { caption: type, droneId: droneId };
      const response = await client.fetch(query, caption);
      // console.log("loading", caption, ", for drone", droneId);
      setImage(response);
    };
    fetchData();
  }, [droneId, type, x, y]);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="tooltip-circle"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
        style={{ left: x, top: y, border: 1 }}
      />

      <div
        className={`tooltip ${isHovered ? "show" : ""}`}
        style={{ left: 100, top: 100, border: 1 }}
      />
      {isHovered && (
        <div
          className="tooltip-content"
          style={{ left: x + 30, top: y, border: 1 }}
        >
          <div className="tooltip-title">{title}</div>
          <div className="tooltip-details">{details}</div>
        </div>
      )}
      {isModalOpen && image && (
        <CustomModal onClose={closeModal}>
          <div className="transition-transform duration-200 ease-out w-80 h-80 dronesop-shadow-xl">
            <Image
              className="object-cover object-left rounded-md lg:object-center"
              src={urlFor(image.image).url()}
              alt="drone image"
              fill
            />
          </div>
        </CustomModal>
      )}
    </>
  );
}
