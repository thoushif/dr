"use client";
import React, { useState, useEffect } from "react";

function LikeButtons() {
  const [likes, setLikes] = useState<number>(0);
  const [loves, setLoves] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);

  // Function to handle the "like" button click
  const handleLikeClick = () => {
    setLikes(likes + 1);
    trackLike("like");
  };

  // Function to handle the "love" button click
  const handleLoveClick = () => {
    setLoves(loves + 1);
    trackLike("love");
  };

  // Function to handle the "dislike" button click
  const handleDislikeClick = () => {
    setDislikes(dislikes + 1);
    trackLike("dislike");
  };

  const trackLike = (type: string) => {
    // Here, you can send an HTTP request to your server to track the like based on the user's IP address.
    // This is a simplified example, and in a real application, you would need a server to handle this tracking.
    fetch(`/api/track-like?type=${type}&ip=${getUserIP()}`);
  };

  const getUserIP = () => {
    // Use a service to get the user's public IP address. There are various free services available.
    // You can use the 'ipify' API as an example:
    return fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => data.ip);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        onClick={handleLikeClick}
        className="p-2 text-white bg-blue-500 rounded"
      >
        Like {likes}
      </button>
      <button
        onClick={handleLoveClick}
        className="p-2 text-white bg-red-500 rounded"
      >
        Love {loves}
      </button>
      <button
        onClick={handleDislikeClick}
        className="p-2 text-white bg-gray-500 rounded"
      >
        Dislike {dislikes}
      </button>
    </div>
  );
}

export default LikeButtons;
