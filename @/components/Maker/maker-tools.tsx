import { PlayIcon } from "@heroicons/react/24/solid";
import {
  FlagIcon,
  GoalIcon,
  HomeIcon,
  PlaneIcon,
  TreesIcon,
} from "lucide-react";
import { FaHospital } from "react-icons/fa";
import {
  GiFireShield,
  GiPoliceBadge,
  GiRailRoad,
  GiRoad,
} from "react-icons/gi";
import { TownCell, TownGrid } from "./Town";

export const assetTools: AssetTool[] = [
  {
    label: "Start",
    icon: <FlagIcon className="w-5 h-5" fill="green" />,
    height: 1,
    width: 1,
    traversable: true,
    rotatable: true,
    type: "Start",
    maxCount: 1,
    weight: 1,
    color: "bg-green-200", // Color for home
  },
  {
    label: "End",
    icon: <GoalIcon className="w-5 h-5" fill="red" />,
    height: 1,
    width: 1,
    traversable: true,
    rotatable: true,
    type: "End",
    maxCount: 1,
    weight: 1,
    color: "bg-red-200", // Color for home
  },
  {
    label: "Makes a Home",
    icon: <HomeIcon className="w-5 h-5" fill="orange" />,
    height: 2,
    width: 2,
    traversable: true,
    rotatable: true,
    type: "Home",
    maxCount: 20,
    weight: 2,
    color: "bg-orange-200", // Color for home
  },
  {
    label: "Creates an Airport",
    icon: <PlaneIcon className="w-5 h-5" fill="blue" />,
    height: 5,
    width: 4,
    traversable: false,
    rotatable: true,
    type: "Airport",
    maxCount: 2,
    weight: 1,
    color: "bg-blue-200", // Color for airport
  },
  {
    label: "Creates a school",
    icon: <PlaneIcon className="w-5 h-5" fill="yellow" />,
    height: 3,
    width: 4,
    traversable: false,
    rotatable: true,
    type: "School",
    maxCount: 2,
    weight: 2,
    color: "bg-yellow-200", // Color for school
  },
  {
    label: "Creates a Park",
    icon: <TreesIcon className="w-5 h-5" fill="green" />,
    height: 3,
    width: 3,
    traversable: true,
    rotatable: true,
    type: "Park",
    maxCount: 2,
    weight: 2,
    color: "bg-green-600", // Color for park
  },
  {
    label: "Hospital",
    icon: <FaHospital className="w-5 h-5" fill="purple" />,
    height: 4,
    width: 4,
    traversable: false,
    rotatable: true,
    type: "Hospital",
    maxCount: 2,
    weight: 1,
    color: "bg-purple-200", // Color for hospital
  },
  {
    label: "Police Station",
    icon: <GiPoliceBadge className="w-5 h-5" fill="blue" />,
    height: 3,
    width: 3,
    traversable: false,
    rotatable: true,
    type: "PoliceStation",
    maxCount: 2,
    weight: 1,
    color: "bg-indigo-500", // Color for police station
  },
  {
    label: "Fire Station",
    icon: <GiFireShield className="w-5 h-5" fill="red" />,
    height: 3,
    width: 3,
    traversable: false,
    rotatable: true,
    type: "FireStation",
    maxCount: 2,
    weight: 1,
    color: "bg-red-200", // Color for fire station
  },
  {
    label: "Stadium",
    icon: <PlayIcon className="w-5 h-5" fill="green" />,
    height: 5,
    width: 6,
    traversable: false,
    rotatable: true,
    type: "Stadium",
    maxCount: 2,
    weight: 1,
    color: "bg-green-200", // Color for stadium
  },
  {
    label: "Creates a Highway",
    icon: <GiRoad className="w-5 h-5" fill="gray" />,
    height: 1,
    width: 6,
    traversable: true,
    rotatable: true,
    type: "Highway",
    maxCount: 5,
    weight: 1,
    color: "bg-slate-600", // Color for highway
  },
  {
    label: "Creates a Train Track",
    icon: <GiRailRoad className="w-5 h-5" fill="black" />,
    height: 1,
    width: 6,
    traversable: true,
    rotatable: true,
    type: "TrainTrack",
    maxCount: 5,
    weight: 1,
    color: "bg-slate-400", // Color for train track
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
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>,
  setTownGrid: React.Dispatch<React.SetStateAction<TownGrid>>,
  townGrid: TownGrid
) => {
  const savedAssets = localStorage.getItem("assets");
  if (savedAssets) {
    const assets: Asset[] = JSON.parse(savedAssets);
    setAssets(assets);
    updateTownGrid(townGrid, assets);
    townGrid.printGrid();

    calculatePath(townGrid, assets);
    // setTownGrid(townGrid);
  }
};

export const calculatePath = (townGrid: TownGrid, assets: Asset[]) => {
  townGrid.clearShortestPath();

  const startAsset = assets.find(
    (asset: Asset) => getAssetTool(asset.type, false)?.type === "Start"
  );
  const endAsset = assets.find(
    (asset: Asset) => getAssetTool(asset.type, false)?.type === "End"
  );
  if (startAsset && endAsset) {
    const startCell = townGrid.getCell(startAsset.x, startAsset.y)!;
    const goalCell = townGrid.getCell(endAsset.x, endAsset.y)!;
    const shortestPath = townGrid.findShortestPath(startCell, goalCell);
    if (!shortestPath) {
      console.log("No path found.");
    }
    if (shortestPath) {
      shortestPath.forEach((cell) => {
        cell.inShortestPath = true; // Mark cell as part of the shortest path
      });
      townGrid.printGrid();
    }
  }
};
const updateTownGrid = (townGrid: TownGrid, assets: Asset[]) => {
  assets.forEach((asset) => addAssetToTownGrid(townGrid, asset));
};
export const addAssetToTownGrid = (townGrid: TownGrid, asset: Asset) => {
  const labeledCells: TownCell[] = [];

  const traversable = getAssetTool(asset.type, false)?.traversable ?? false;
  const weight = getAssetTool(asset.type, false)?.weight ?? 1;
  // Create labeled area based on asset's label, x, and y coordinates
  for (let y = asset.y; y < asset.y + asset.height; y++) {
    for (let x = asset.x; x < asset.x + asset.width; x++) {
      const cell = townGrid.getCell(x, y);
      if (cell) {
        cell.traversable = traversable;
        cell.weight = weight;
        labeledCells.push(cell);
      }
    }
  }

  // Create labeled area and add it to the town grid
  townGrid.createLabeledArea(
    asset.label,
    labeledCells,
    getAssetTool(asset.type, false)?.traversable
  );
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
