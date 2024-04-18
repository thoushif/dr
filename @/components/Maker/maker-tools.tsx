import { HomeIcon, PlaneIcon, TreesIcon } from "lucide-react";

export const assetTools: AssetTool[] = [
  {
    label: "Makes a Home",
    icon: <HomeIcon className="h-5 w-5" />,
    height: 2,
    width: 2,
    traversable: true,
    rotatable: true,
    type: "Home",
    maxCount: 20,
    color: "bg-orange-200", // Color for home
  },
  {
    label: "Creates an Airport",
    icon: <PlaneIcon className="h-5 w-5" />,
    height: 5,
    width: 4,
    traversable: false,
    rotatable: true,
    type: "Airport",
    maxCount: 2,
    color: "bg-blue-200", // Color for airport
  },
  {
    label: "Creates a Park",
    icon: <TreesIcon className="h-5 w-5" />,
    height: 3,
    width: 3,
    traversable: false,
    rotatable: true,
    type: "Park",
    maxCount: 2,
    color: "bg-green-200", // Color for park
  },
];

export const getAssetTool = (assetType: string): AssetTool | undefined => {
  return assetTools.find((tool) => tool.type === assetType);
};
