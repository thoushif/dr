import React from "react";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
const ComingSoon: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-100 to-slate-300">
      <HiMiniWrenchScrewdriver className="mx-2 text-6xl" />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-800">Coming Soon</h1>
        <p className="text-gray-600">
          Exciting things are in the works. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
