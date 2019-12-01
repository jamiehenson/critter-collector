export type PlayerType = {
  position: { x: number, y: number },
  direction: string,
  critters: CritterType[],
  nearbyCritters: CritterType[]
}

export type CritterType = {
  id: number,
  name: string,
  type: string,
  icon: string,
  position: { x: number, y: number }
}

export type WorldType = {
  cellSize: number,
  worldSize: number,
  edgeCellPosition: number,
  sandEdgeCells: number,
  critterCount: number,
  critters: CritterType[]
}

export type CellType = {
  x: number,
  y: number,
  player: PlayerType
  world: WorldType,
  scalingFactor: number
}