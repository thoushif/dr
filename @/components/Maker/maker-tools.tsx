import { HomeIcon, PlaneIcon, TreesIcon } from "lucide-react";

export const assetTools: AssetTool[] = [
  {
    label: "Makes a Home",
    icon: <HomeIcon className="w-5 h-5" />,
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
    icon: <PlaneIcon className="w-5 h-5" />,
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
    icon: <TreesIcon className="w-5 h-5" />,
    height: 3,
    width: 3,
    traversable: false,
    rotatable: true,
    type: "Park",
    maxCount: 2,
    color: "bg-green-200", // Color for park
  },
];

export const getAssetTool = (
  assetType: string,
  rotated: boolean
): AssetTool | undefined => {
  var finalTool;
  const tool = assetTools.find((tool) => tool.type === assetType);
  finalTool = tool;
  if (tool && rotated) {
    finalTool = {
      ...tool!,
      width: tool?.height ?? tool!.width,
      height: tool?.width ?? tool!.height,
    };
  }
  return finalTool;
};

export const saveAssetsToLocal = (assets: Asset[]) => {
  localStorage.setItem("assets", JSON.stringify(assets));
};

// Method to load assets from local storage when the page opens
export const loadAssetsFromLocal = (
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>
) => {
  const savedAssets = localStorage.getItem("assets");
  if (savedAssets) {
    setAssets(JSON.parse(savedAssets));
  }
};

export class Tooltip {
  show: boolean;
  positionX: number;
  positionY: number;
  tooltipText: string;

  constructor() {
    this.show = false;
    this.positionX = 0;
    this.positionY = 0;
    this.tooltipText = "";
  }

  // Method to show the tooltip at a specific position with text
  showTooltip(x: number, y: number, text: string, show: boolean) {
    this.positionX = x;
    this.positionY = y;
    this.tooltipText = text;
    this.show = show;
  }

  // Method to hide the tooltip
  hideTooltip() {
    this.show = false;
  }
}
