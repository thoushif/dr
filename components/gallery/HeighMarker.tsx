"use client";
// MyPage.tsx
// MyPage.tsx
import { useRef } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";

import Image from "next/image";
type Props = {
  heightParam: number;
  setHeightParam: React.Dispatch<React.SetStateAction<number>>;
};
const HeightMarker = ({ heightParam, setHeightParam }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    let offset = -1 * Math.round(Number(info.offset.y)) * 10;

    // Update the state and animate the child div based on the drag position
    setHeightParam(offset);
    controls.start({ y: offset });
  };

  return (
    <div className="relative px-10 w-72 h-80" ref={parentRef}>
      {/* Parent Div with background image */}
      <div className="absolute top-0 left-0 bg-center ">
        <Image
          src="https://images.unsplash.com/photo-1684775622591-cb57271f141e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Ground and Sky"
          className="w-full h-full"
          fill
        />
      </div>

      {/* Child Div with drone image */}
      <motion.div
        className="relative top-0 w-16 h-16 transform -translate-x-1/2 cursor-grab left-1/2 child-drone"
        style={{ y: heightParam }}
        animate={controls}
        drag="y"
        dragConstraints={parentRef} // Use the parent's ref for drag constraints
        dragElastic={0.5} // Adjust this value as needed
        onDrag={handleDrag}
      >
        {/* Handle for dragging */}
        {/* Your drone image here */}
      </motion.div>
    </div>
  );
};

export default HeightMarker;
