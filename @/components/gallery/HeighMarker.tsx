"use client";
// MyPage.tsx
// MyPage.tsx
import { motion, PanInfo, useAnimation } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/button";

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
    let offset = -1 * Math.round(Number(info.offset.y)) * 50;
    offset = Math.min(9000, Math.max(0, offset));
    // Update the state and animate the child div based on the drag position
    setHeightParam(offset);
    controls.start({ y: offset });
  };

  return (
    <>
      <span className="w-6 h-6 text-slate-900">
        Drag your drone up/down and leave
      </span>
      <div className="relative px-10 w-72 h-80 drone-bg" ref={parentRef}>
        {/* Parent Div with background image */}

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
    </>
  );
};

export default HeightMarker;
