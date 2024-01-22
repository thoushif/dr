import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PhotoLoading = () => {
  return (
    <div>
      <Skeleton className="w-full h-full"></Skeleton>
    </div>
  );
};

export default PhotoLoading;
