"use client";

import { Rotate3dIcon, RotateCwIcon, UndoIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { assetTools, getAssetTool } from "./maker-tools";

export function MakerHome() {
  const [currentAssetTool, setCurrentAssetTool] = useState<
    AssetTool | undefined
  >(undefined);

  const [assets, setAssets] = useState<Asset[]>([]);
  const handleAssetToolRotate = () => {
    if (currentAssetTool) {
      setCurrentAssetTool((prevAssetTool) => ({
        ...prevAssetTool!,
        width: prevAssetTool?.height ?? currentAssetTool!.width,
        height: prevAssetTool?.width ?? currentAssetTool!.height,
      }));
    }
  };
  const handleGridCellClick = (index: number) => {
    if (currentAssetTool) {
      const x = index % 30; // Calculate x-coordinate
      const y = Math.floor(index / 30); // Calculate y-coordinate
      const canFit = canAssetFit(currentAssetTool, x, y);
      const canFitOverlap = canAssetFitNotOverlapping(x, y);

      if (
        canFit &&
        canFitOverlap &&
        maxCountReachedForAsset(currentAssetTool.type)
      ) {
        const label = `${currentAssetTool.label} ${
          assets!.filter((asset) => asset.type === currentAssetTool.type)
            .length + 1
        }`; // Generate a unique label
        const newAsset: Asset = {
          seq: assets.length === 0 ? 1 : assets.length + 1,
          type: currentAssetTool.type,
          x,
          y,
          label,
        };
        setAssets((prevAssets) => [...prevAssets, newAsset]); // Add the new asset to the state
      }
    }
  };
  const canAssetFit = (assetTool: AssetTool, x: number, y: number): boolean => {
    return (
      x + assetTool.width <= 30 && // Check if the asset fits horizontally
      y + assetTool.height <= 30 // Check if the asset fits vertically
    );
  };
  const [hoveredCell, setHoveredCell] = useState<number>(0);
  const handleGridCellHover = (index: number) => {
    setHoveredCell(index);
  };
  const handleUndoAssetAdding = () => {
    // Create a shallow copy of the assets array
    const updatedAssets = [...assets];

    // Remove the last item from the copied array
    updatedAssets.pop();

    // Update the state with the new array
    setAssets(updatedAssets);
  };
  const maxCountReachedForAsset = (assetType: string): boolean => {
    // Find the asset tool corresponding to the asset type
    const assetTool = assetTools.find((tool) => tool.type === assetType);

    // If assetTool is undefined, return false
    if (!assetTool) return false;

    // Filter the assets array based on the asset type
    const filteredAssets = assets.filter((asset) => asset.type === assetType);

    // Check if the length of the filtered array is greater than or equal to the maximum count allowed
    return filteredAssets.length < assetTool.maxCount;
  };

  const canAssetFitNotOverlapping = (x: number, y: number) =>
    !assets.some((asset) => {
      const { x: assetX, y: assetY } = asset;
      const { width: newWidth, height: newHeight } = getAssetTool(
        currentAssetTool!.type
      )!;
      const { width: assetWidth, height: assetHeight } = getAssetTool(
        asset!.type
      )!;

      // Check if there's any overlap with the current asset
      return (
        x < assetX + assetWidth &&
        x + newWidth > assetX &&
        y < assetY + assetHeight &&
        y + newHeight > assetY
      );
    });
  const gridCells = Array.from({ length: 30 * 30 }).map((_, index) => {
    // Calculate x and y coordinates of the current cell
    const x = index % 30;
    const y = Math.floor(index / 30);

    const isPartOfAsset = assets.some(
      (asset) =>
        x >= asset.x &&
        x < asset.x + getAssetTool(asset.type)!.width &&
        y >= asset.y &&
        y < asset.y + getAssetTool(asset.type)!.height
    );

    const hoveredX = hoveredCell % 30;
    const hoveredY = Math.floor(hoveredCell / 30);

    const canFit =
      currentAssetTool &&
      hoveredX + getAssetTool(currentAssetTool!.type)!.width <= 30 &&
      hoveredY + getAssetTool(currentAssetTool!.type)!.height <= 30;

    const isPartOfHoveredCell =
      currentAssetTool &&
      hoveredCell !== undefined &&
      x >= hoveredX &&
      x < hoveredX + getAssetTool(currentAssetTool!.type)!.width &&
      y >= hoveredY &&
      y < hoveredY + getAssetTool(currentAssetTool!.type)!.height;

    // Determine the hover color based on whether the cell is part of the hovered asset and the asset can fit
    const hoverColor =
      isPartOfHoveredCell && canFit ? "border-sky-500" : "border-slate-300";

    // Get the AssetTool for the asset type
    const assetType = assets.find(
      (asset) =>
        x >= asset.x &&
        x < asset.x + getAssetTool(asset.type)!.width &&
        y >= asset.y &&
        y < asset.y + getAssetTool(asset.type)!.height
    );
    const clickableClass =
      canFit &&
      canAssetFitNotOverlapping(x, y) &&
      maxCountReachedForAsset(currentAssetTool.type)
        ? "cursor-pointer"
        : "cursor-not-allowed";

    const assetTool = assetType ? getAssetTool(assetType.type) : undefined;
    // const canFit = canAssetFit(currentAssetTool!, x, y); // Check if the current asset can fit at the hovered position

    // Determine the background color based on whether the cell is part of an asset or not
    const bgColor = isPartOfAsset ? assetTool?.color : "bg-slate-200";
    // const hoverColor =
    //   isPartOfHoveredCell && canFit ? "border-sky-500" : "border-slate-300";
    return (
      <div
        key={index}
        className={`w-6 h-6 border   ${hoverColor}   ${bgColor} ${clickableClass} select-none`}
        onClick={() => handleGridCellClick(index)}
        onMouseEnter={() => handleGridCellHover(index)}
        onMouseLeave={() => setHoveredCell(-Infinity)}
      >
        <span className="text-xs inset-0"> {index + 1}</span>
      </div>
    );
  });
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-[300px] border-r lg:block">
        <nav className="flex-1 grid grid-cols-2 grid-rows-2 text-center">
          {assetTools.map((assetTool, index) => (
            <div key={index} className="p-4 select-none">
              <div
                title={assetTool.label}
                className={`flex items-center  select-none gap-4 text-sm p-2 rounded-xl bg-gray-100 dark:bg-gray-800 ${
                  currentAssetTool?.type === assetTool.type
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 dark:bg-slate-800"
                }`}
                onClick={() =>
                  setCurrentAssetTool((prevAssetTool) =>
                    prevAssetTool?.type === assetTool.type
                      ? undefined
                      : assetTool
                  )
                }
              >
                {assetTool.icon}
                {assetTool.type} ({assetTool.maxCount})
              </div>
            </div>
          ))}
        </nav>
        {currentAssetTool && (
          <Card className="m-2">
            <CardHeader className="flex justify-evenly">
              <div className="flex justify-between  ">
                <h2 className="text-lg font-bold">{currentAssetTool.label}</h2>

                <span>
                  used{" "}
                  {
                    assets.filter((a) => a.type === currentAssetTool.type)
                      .length
                  }{" "}
                  of {currentAssetTool.maxCount}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <>
                <h2>
                  {"Can fly over: "}
                  {currentAssetTool.traversable ? "Yes" : "No"}
                </h2>
                <RotateCwIcon
                  onClick={handleAssetToolRotate}
                  className="cursor-pointer"
                />
                {currentAssetTool && (
                  <div className="mt-4">
                    {Array.from({ length: currentAssetTool.height }).map(
                      (_, rowIndex) => (
                        <div key={rowIndex} className="flex">
                          {Array.from({ length: currentAssetTool.width }).map(
                            (_, colIndex) => {
                              const index =
                                rowIndex * currentAssetTool.width + colIndex;
                              return (
                                <div
                                  key={index}
                                  className={`w-6 h-6 ${
                                    currentAssetTool.color
                                  } border border-slate-700 select-none ${
                                    index === 0 ? "rounded-tl-lg" : ""
                                  } ${
                                    index === currentAssetTool.width - 1
                                      ? "rounded-tr-lg"
                                      : ""
                                  } ${
                                    index ===
                                    currentAssetTool.height *
                                      currentAssetTool.width -
                                      currentAssetTool.width
                                      ? "rounded-bl-lg"
                                      : ""
                                  } ${
                                    index ===
                                    currentAssetTool.height *
                                      currentAssetTool.width -
                                      1
                                      ? "rounded-br-lg"
                                      : ""
                                  }`}
                                ></div>
                              );
                            }
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
                <Separator className="mt-4" />
                {assets && assets.length > 0 && (
                  <>
                    <div className="flex justify-between">
                      <div className="flex">
                        <h2 className="text-lg font-bold">History</h2>
                      </div>
                      <div>
                        <UndoIcon onClick={handleUndoAssetAdding} />
                      </div>
                    </div>
                    {assets
                      .slice()
                      .reverse()
                      .map((asset) => (
                        <div key={asset.seq}>
                          <span>{asset.seq}. </span>
                          <span>{asset.label}</span>
                        </div>
                      ))}{" "}
                  </>
                )}
              </>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="grid grid-cols-30 grid-rows-30 gap-1">{gridCells}</div>
    </div>
  );
}
