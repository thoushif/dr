import React, { useState } from "react";
import { TiTick, TiDelete } from "react-icons/ti";

interface BadgeProps {
  label: string;
  selected: boolean;
  onSelect: (label: string) => void;
}

const Badge: React.FC<BadgeProps> = ({ label, selected, onSelect }) => {
  const handleClick = () => {
    onSelect(label);
  };

  return (
    <div
      className={`flex items-center px-2 border  hover:bg-opacity-80 transition-all cursor-pointer ${
        selected ? "bg-slate-500 border-slate-600" : "bg-orange-300 "
      } text-white rounded-md focus:outline-none`}
      onClick={handleClick}
    >
      {selected ? <TiTick className="mr-2" /> : <TiDelete className="mr-2" />}
      {label}
    </div>
  );
};

interface BadgeContainerProps {
  badges?: string[];
  selectedBadges: string[];
  onSelectBadge: (badge: string) => void;
}

const BadgeContainer: React.FC<BadgeContainerProps> = ({
  badges,
  selectedBadges,
  onSelectBadge,
}) => {
  return (
    <>
      {badges!.map((badge, index) => (
        <Badge
          key={index}
          label={badge}
          selected={selectedBadges.includes(badge)}
          onSelect={onSelectBadge}
        />
      ))}
    </>
  );
};

const EventFinder: React.FC<BadgeContainerProps> = ({
  selectedBadges,
  onSelectBadge,
}) => {
  const filterBadges = ["Free", "Private"];
  // const sortBadges = ["Latest", "Popular"];
  const categories = ["Drone Racing", "Sports & Outdoors"];

  return (
    <>
      {/* <BadgeContainer
        badges={sortBadges}
        selectedBadges={selectedBadges}
        onSelectBadge={onSelectBadge}
      /> */}
      <BadgeContainer
        badges={filterBadges}
        selectedBadges={selectedBadges}
        onSelectBadge={onSelectBadge}
      />
      <BadgeContainer
        badges={categories}
        selectedBadges={selectedBadges}
        onSelectBadge={onSelectBadge}
      />
    </>
  );
};

export default EventFinder;
