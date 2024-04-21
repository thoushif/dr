"use client";

import {
  BanIcon,
  CrossIcon,
  DeleteIcon,
  EditIcon,
  EraserIcon,
  PencilIcon,
  RemoveFormattingIcon,
  Rotate3dIcon,
  RotateCwIcon,
  SaveIcon,
  Trash2Icon,
  UndoIcon,
} from "lucide-react";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  assetTools,
  getAssetTool,
  loadAssetsFromLocal,
  calculatePath,
  saveAssetsToLocal,
} from "./maker-tools";
import { TownCell, TownGrid } from "./Town";

export function MakerHome() {
  const [currentAssetTool, setCurrentAssetTool] = useState<
    AssetTool | undefined
  >(undefined);

  const [viewAsset, setViewAsset] = useState<Asset>();
  const [rotated, setRotated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedLabel, setEditedLabel] = useState("");
  const [toolTipPosition, setTooltipPosition] = useState({
    gridCellX: -Infinity,
    gridCellY: -Infinity,
  });

  const handleEditClick = () => {
    setEditedLabel(viewAsset?.label ?? "");
    setEditMode(true);
  };
  const handleDeleteAsset = () => {
    if (viewAsset) {
      // Find the index of the asset to be deleted
      const assetIndex = assets.findIndex(
        (asset) => asset.seq === viewAsset.seq && asset.type == viewAsset.type
      );

      // If the asset exists, remove it from the assets array
      if (assetIndex !== -1) {
        const updatedAssets = [...assets];
        updatedAssets.splice(assetIndex, 1); // Remove the asset at the found index

        // Update the state with the new array of assets
        setAssets(updatedAssets);

        // Save the updated assets to local storage
        saveAssetsToLocal(updatedAssets);
      }
    }
    setViewAsset(undefined);
    calculatePath(townGrid, assets);
  };

  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (viewAsset) {
      setViewAsset({ ...viewAsset, label: e.target.value });
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveLabel();
    }
    if (e.key === "Escape") {
      setEditMode(false);
    }
  };
  const handleKeyDownGridCell = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log("key down");
    if (e.key === "Escape") {
      setViewAsset(undefined);
      setTooltipPosition({ gridCellX: -Infinity, gridCellY: -Infinity });
    }
  };
  const handleSaveLabel = () => {
    if (viewAsset) {
      const updatedAssets = assets.map((asset) =>
        asset.seq === viewAsset.seq
          ? { ...asset, label: viewAsset.label }
          : asset
      );
      setAssets(updatedAssets);
      saveAssetsToLocal(updatedAssets);
    }
    setEditMode(false);
  };

  // Event handler to cancel editing
  const handleCancelEdit = () => {
    setEditMode(false);
  };
  const townGridInitState = new TownGrid(30); // Example: Create a town grid with size 30x30

  const [assets, setAssets] = useState<Asset[]>([]);
  const [townGrid, setTownGrid] = useState<TownGrid>(townGridInitState);
  useEffect(() => {
    loadAssetsFromLocal(setAssets, setTownGrid, townGrid);
  }, []);
  const handleAssetToolRotate = () => {
    if (currentAssetTool && maxCountReachedForAsset(currentAssetTool.type)) {
      setRotated(!rotated);
      setCurrentAssetTool((prevAssetTool) => ({
        ...prevAssetTool!,
        width: prevAssetTool?.height ?? currentAssetTool!.width,
        height: prevAssetTool?.width ?? currentAssetTool!.height,
      }));
    }
  };
  const handleClearCanvas = () => {
    setAssets([]);
    setTownGrid(townGridInitState);
    localStorage.setItem("assets", JSON.stringify([]));
  };
  const handleGridCellClick = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const x = index % 30; // Calculate x-coordinate
    const y = Math.floor(index / 30); // Calculate y-coordinate
    const assetFound = assets.find(
      (asset) =>
        x >= asset.x &&
        x < asset.x + asset.width &&
        y >= asset.y &&
        y < asset.y + asset.height
    );
    if (assetFound) {
      const gridCell = event.currentTarget;

      // Get the bounding rectangle of the grid cell
      const rect = gridCell.getBoundingClientRect();

      // Retrieve the XY position
      const gridX = rect.left + window.pageXOffset;
      const gridY = rect.top + window.pageYOffset;

      setTooltipPosition({ gridCellX: gridX, gridCellY: gridY });
      setViewAsset(assetFound);
    } else {
      if (viewAsset) {
        setViewAsset(undefined);
        setTooltipPosition({ gridCellX: -Infinity, gridCellY: -Infinity });
        return;
      }
    }

    if (currentAssetTool) {
      const canFit = canAssetFit(currentAssetTool, x, y);
      const canFitOverlap = canAssetFitNotOverlapping(x, y);

      if (
        canFit &&
        canFitOverlap &&
        maxCountReachedForAsset(currentAssetTool.type)
      ) {
        const label = `${currentAssetTool.type} ${
          assets!.filter((asset) => asset.type === currentAssetTool.type)
            .length + 1
        }`; // Generate a unique label
        const newAsset: Asset = {
          seq: assets.length === 0 ? 1 : assets.length + 1,
          type: currentAssetTool.type,
          x,
          y,
          label,
          height: currentAssetTool.height,
          width: currentAssetTool.width,
        };
        saveAssetsToLocal([...assets, newAsset]);
        setAssets((prevAssets) => [...prevAssets, newAsset]); // Add the new asset to the state
        return;
      }
    }

    calculatePath(townGrid, assets);
  };
  const canAssetFit = (assetTool: AssetTool, x: number, y: number): boolean => {
    return (
      x + assetTool.width <= 30 && // Check if the asset fits horizontally
      y + assetTool.height <= 30 // Check if the asset fits vertically
    );
  };
  const [hoveredCell, setHoveredCell] = useState<number>(0);

  const handleGridCellHover = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const x = index % 30;
    const y = Math.floor(index / 30);
    setHoveredCell(index);
    // const tooltipX = event.clientX;
    // const tooltipY = event.clientY - 40; // Adjust this value as needed
    // const assetFound = assets.find(
    //   (asset) =>
    //     x >= asset.x &&
    //     x < asset.x + asset.width &&
    //     y >= asset.y &&
    //     y < asset.y + asset.height
    // );
    // if (assetFound) {
    //   tooltip.showTooltip(assetFound.x, assetFound.y, assetFound.label);
    //   setTooltip(tooltip);
    // }
    // Show the tooltip with position and text
  };
  const handleAssetLeave = () => {
    // Hide the tooltip when leaving the asset
    setHoveredCell(-Infinity);
  };
  const handleUndoAssetAdding = () => {
    // Create a shallow copy of the assets array
    const updatedAssets = [...assets];

    // Remove the last item from the copied array
    updatedAssets.pop();

    // Update the state with the new array
    setAssets(updatedAssets);
    saveAssetsToLocal(assets);
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
      const {
        x: assetX,
        y: assetY,
        width: assetWidth,
        height: assetHeight,
      } = asset;
      const { width: newWidth, height: newHeight } = currentAssetTool!;

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

    const hoveredX = hoveredCell % 30;
    const hoveredY = Math.floor(hoveredCell / 30);

    const canFit =
      currentAssetTool &&
      hoveredX + currentAssetTool!.width <= 30 &&
      hoveredY + currentAssetTool!.height <= 30;

    const isPartOfHoveredCell =
      currentAssetTool &&
      hoveredCell !== undefined &&
      x >= hoveredX &&
      x < hoveredX + currentAssetTool!.width &&
      y >= hoveredY &&
      y < hoveredY + currentAssetTool!.height;

    // Determine the hover color based on whether the cell is part of the hovered asset and the asset can fit
    const hoverColor =
      isPartOfHoveredCell && canFit ? "border-sky-500" : "border-slate-300";

    // Get the AssetTool for the asset type
    const assetFound = assets.find(
      (asset) =>
        x >= asset.x &&
        x < asset.x + asset.width &&
        y >= asset.y &&
        y < asset.y + asset.height
    );
    let clickableClass =
      canFit &&
      canAssetFitNotOverlapping(x, y) &&
      maxCountReachedForAsset(currentAssetTool.type)
        ? "cursor-pointer"
        : "cursor-not-allowed";
    if (assetFound) {
      clickableClass = "cursor-pointer";
    }
    const assetTool = assetFound
      ? getAssetTool(assetFound.type, rotated)
      : undefined;
    // const canFit = canAssetFit(currentAssetTool!, x, y); // Check if the current asset can fit at the hovered position

    // Determine the background color based on whether the cell is part of an asset or not
    const isPartOfAsset = assets.some(
      (asset) =>
        x >= asset.x &&
        x < asset.x + asset.width &&
        y >= asset.y &&
        y < asset.y + asset.height
    );
    let bgColor = isPartOfAsset ? assetTool?.color : "bg-slate-200";

    // loop through cells in towngrid, if x, y of towncell having cell.inShortestPath as true update as true
    const isInShortestPath = Array.from(townGrid.cells.values()).some(
      (cell) => {
        return cell.x === x && cell.y === y && cell.inShortestPath;
      }
    );

    const borderStyle = isInShortestPath
      ? "border-4 border-orange-600"
      : "border";

    // const hoverColor =
    //   isPartOfHoveredCell && canFit ? "border-sky-500" : "border-slate-300";
    return (
      <>
        {" "}
        <div
          key={index}
          className={`w-6 h-6 ${borderStyle}   ${hoverColor}   ${bgColor} ${clickableClass} select-none`}
          onClick={(e) => handleGridCellClick(index, e)}
          onMouseEnter={(e) => handleGridCellHover(index, e)}
          onMouseLeave={() => handleAssetLeave()}
          onKeyDown={handleKeyDownGridCell}
          tabIndex={0}
        >
          <span className="inset-0 text-xs"> </span>
        </div>
      </>
    );
  });
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-[300px] border-r lg:block">
        <nav className="grid flex-1 grid-cols-2 grid-rows-2 text-center">
          {assetTools.map((assetTool, index) => (
            <div key={index} className="p-4 select-none">
              <div
                title={assetTool.label}
                className={`flex items-center cursor-pointer select-none gap-4 text-sm p-2 rounded-xl bg-gray-100 dark:bg-gray-800 ${
                  currentAssetTool?.type === assetTool.type
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 dark:bg-slate-800"
                }`}
                onClick={() => {
                  setRotated(false);
                  setCurrentAssetTool((prevAssetTool) =>
                    prevAssetTool?.type === assetTool.type
                      ? undefined
                      : assetTool
                  );
                }}
              >
                {assetTool.icon}
                {assetTool.type} ({assetTool.maxCount})
              </div>
            </div>
          ))}
          <div key={"clear-canvas"} className="p-4 select-none">
            <div
              title={"Clear canvas"}
              className={`flex items-center cursor-pointer select-none gap-4 text-sm p-2 rounded-xl bg-gray-50 dark:bg-gray-600`}
              onClick={handleClearCanvas}
            >
              <EraserIcon />
              Clear all
            </div>
          </div>
        </nav>
        {viewAsset && (
          <div
            className="absolute flex justify-between w-56 p-2 m-2 bg-white border rounded shadow bg-opacity-55"
            style={{
              top: toolTipPosition.gridCellY - 50,
              left: toolTipPosition.gridCellX - 20,
            }}
          >
            {editMode ? (
              <div className="flex items-stretch">
                <Input
                  type="text"
                  value={viewAsset.label}
                  onChange={handleLabelChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <SaveIcon onClick={handleSaveLabel} />
                <BanIcon onClick={handleCancelEdit} />
              </div>
            ) : (
              <div className="flex items-stretch">
                <span>{viewAsset.label}</span>
                <PencilIcon size={"16px"} onClick={handleEditClick} />
              </div>
            )}
            <div>{!editMode && <Trash2Icon onClick={handleDeleteAsset} />}</div>
          </div>
        )}
        {currentAssetTool && (
          <Card className="m2">
            <CardHeader
              className={`flex justify-evenly   ${
                !maxCountReachedForAsset(currentAssetTool.type) && "opacity-20"
              } `}
            >
              <div className="flex justify-between ">
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
              <div className="flex justify-between">
                <div>
                  {"Can fly over: "}
                  {currentAssetTool.traversable ? "Yes" : "No"}
                </div>
                {currentAssetTool.width !== currentAssetTool.height && (
                  <RotateCwIcon
                    onClick={handleAssetToolRotate}
                    className="w-4 h-4 cursor-pointer"
                  />
                )}
              </div>
            </CardHeader>

            <CardContent
              className={`flex justify-evenly   ${
                !maxCountReachedForAsset(currentAssetTool.type) && "opacity-20"
              } `}
            >
              <>
                {currentAssetTool && (
                  <div>
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
              </>
            </CardContent>
            <CardContent>
              {assets && assets.length > 0 && (
                <>
                  <Separator className="mt-4" />
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
                        <span>
                          {asset.height}-{asset.width}
                        </span>
                      </div>
                    ))}{" "}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      <div className="grid gap-1 grid-cols-30 grid-rows-30">
        <>{gridCells} </>
      </div>
    </div>
  );
}
