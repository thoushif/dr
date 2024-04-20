class Strip {
  name: string;
  cells: TownCell[];
  weight: number;

  constructor(name: string, weight: number = 1) {
    this.name = name;
    this.cells = [];
    this.weight = weight;
  }

  addCell(cell: TownCell) {
    this.cells.push(cell);
  }
}
class Cell {
  x: number;
  y: number;
  traversable: boolean;
  weight: number;

  constructor(x: number, y: number, traversable: boolean, weight: number = 1) {
    this.x = x;
    this.y = y;
    this.traversable = traversable;
    this.weight = weight;
  }
  setWeight(weight: number) {
    this.weight = weight;
  }
}

class TownCell extends Cell {
  name: string;
  inShortestPath: boolean = false;
  constructor(
    name: string,
    x: number,
    y: number,
    traversable: boolean,
    weight: number = 1
  ) {
    super(x, y, traversable, weight);
    this.name = name;
  }
}

class LabeledArea {
  name: string;
  cells: TownCell[];
  traversable: boolean;

  constructor(name: string, traversable: boolean = true) {
    this.name = name;
    this.cells = [];
    this.traversable = traversable;
  }

  addCell(cell: TownCell) {
    this.cells.push(cell);
  }
}

class TownGrid {
  cells: Map<string, TownCell>;
  size: number;
  strips: Map<string, Strip>;
  labeledAreas: Map<string, LabeledArea>;

  constructor(size: number) {
    this.size = size;
    this.cells = new Map();
    this.labeledAreas = new Map();
    this.strips = new Map(); // Initialize strips

    // Generate square-shaped town grid
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        this.addCell(x, y, true);
      }
    }
  }
  createStrip(name: string, cells: TownCell[], weight: number = 1) {
    const strip = new Strip(name, weight);
    cells.forEach((cell) => {
      const existingCell = this.getCell(cell.x, cell.y);
      if (existingCell) {
        existingCell.setWeight(weight);
        Object.assign(existingCell, cell); // Overwrite existing cell properties
        strip.addCell(existingCell);
      }
    });
    this.strips.set(name, strip);
  }
  getStrip(name: string): Strip | undefined {
    return this.strips.get(name);
  }
  addCell(x: number, y: number, traversable: boolean, weight: number = 1) {
    const key = `${x},${y}`;
    this.cells.set(key, new TownCell(`${x}-${y}`, x, y, traversable, weight));
  }

  addObstacle(x: number, y: number) {
    const cell = this.getCell(x, y);
    if (cell) {
      cell.traversable = false;
    }
  }

  getCell(x: number, y: number): TownCell | undefined {
    const key = `${x},${y}`;
    return this.cells.get(key);
  }
  printGrid() {
    let gridString = "";
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const cell = this.getCell(x, y);
        if (cell) {
          if (cell.inShortestPath) {
            gridString += "*"; // Symbol for cells in the shortest path
          } else {
            gridString += cell.traversable ? "." : "#";
          }
        } else {
          gridString += " "; // Empty space if cell doesn't exist
        }
        gridString += " ";
      }
      gridString += "\n"; // Newline after each row
    }
    console.log(gridString);
  }

  createLabeledArea(
    name: string,
    cells: TownCell[],
    traversable: boolean = true
  ) {
    const labeledArea = new LabeledArea(name, traversable);
    cells.forEach((cell) => {
      if (this.cells.has(`${cell.x},${cell.y}`)) {
        const existingCell = this.cells.get(`${cell.x},${cell.y}`);
        if (existingCell) {
          existingCell.traversable = traversable;
        }
        labeledArea.addCell(existingCell!);
      }
    });
    this.labeledAreas.set(name, labeledArea);
  }
  findShortestPath(start: TownCell, goal: TownCell): TownCell[] | undefined {
    const openSet: TownCell[] = [start];
    const cameFrom: Map<string, TownCell | undefined> = new Map();
    const gScore: Map<string, number> = new Map();
    const fScore: Map<string, number> = new Map();

    // Initialize scores for all cells
    this.cells.forEach((cell) => {
      const key = `${cell.x},${cell.y}`;
      gScore.set(key, Infinity);
      fScore.set(key, Infinity);
    });

    // Set score of start cell
    gScore.set(`${start.x},${start.y}`, 0);
    fScore.set(
      `${start.x},${start.y}`,
      this.heuristicCostEstimate(start, goal)
    );

    while (openSet.length > 0) {
      // Find cell with lowest fScore in openSet
      const current = openSet.reduce((minCell, cell) => {
        const minCellKey = `${minCell.x},${minCell.y}`;
        const cellKey = `${cell.x},${cell.y}`;
        return fScore.get(cellKey)! < fScore.get(minCellKey)! ? cell : minCell;
      });

      if (current === goal) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet.splice(openSet.indexOf(current), 1); // Remove current from openSet

      // Explore neighbors of current cell
      this.getNeighbors(current).forEach((neighbor) => {
        const neighborKey = `${neighbor.x},${neighbor.y}`;
        const tentativeGScore =
          gScore.get(`${current.x},${current.y}`)! +
          this.distance(current, neighbor);

        if (tentativeGScore < gScore.get(neighborKey)!) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeGScore);
          fScore.set(
            neighborKey,
            tentativeGScore + this.heuristicCostEstimate(neighbor, goal)
          );

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      });
    }

    return undefined; // No path found
  }

  heuristicCostEstimate(start: TownCell, goal: TownCell): number {
    // Simple heuristic: Manhattan distance
    return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y);
  }

  distance(cellA: TownCell, cellB: TownCell): number {
    // Check if either cell is part of a strip and adjust weight accordingly
    const stripA = this.getStrip(cellA.name);
    const stripB = this.getStrip(cellB.name);

    const weightA = stripA ? stripA.weight : cellA.weight;
    const weightB = stripB ? stripB.weight : cellB.weight;

    // Assuming movement cost is always 1 between adjacent cells
    return Math.max(weightA, weightB);
  }

  getNeighbors(cell: TownCell): TownCell[] {
    const neighbors: TownCell[] = [];
    const offsets = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1], // Diagonal: Up-left
      [-1, 1], // Diagonal: Down-left
      [1, -1], // Diagonal: Up-right
      [1, 1], // Diagonal: Down-right
    ]; // Possible movement directions: left, right, up, down

    offsets.forEach((offset) => {
      const neighborX = cell.x + offset[0];
      const neighborY = cell.y + offset[1];
      const neighbor = this.getCell(neighborX, neighborY);
      if (neighbor && neighbor.traversable) {
        neighbors.push(neighbor);
      }
    });

    return neighbors;
  }

  reconstructPath(
    cameFrom: Map<string, TownCell | undefined>,
    current: TownCell
  ): TownCell[] {
    const path: TownCell[] = [];
    let currentKey = `${current.x},${current.y}`;

    while (cameFrom.has(currentKey)) {
      path.unshift(current);
      const next = cameFrom.get(currentKey)!;
      currentKey = `${next.x},${next.y}`;
      current = next;
    }

    path.unshift(current); // Add start cell to path
    return path;
  }
}

export { TownGrid, TownCell, Strip };
