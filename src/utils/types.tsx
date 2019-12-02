export type PlayerType = {
  position: { x: number, y: number },
  direction: string,
  critters: CritterType[],
  nearbyCritters: CritterType[],
  battle: { active: boolean, combatant: CritterType }
}

type BeingType = {
  id: number,
  name: string,
  icon: string,
  position: { x: number, y: number }
}

export interface CritterType extends BeingType {
  type: string,
  healthPoints: number,
  combatPoints: number,
  level: number
}

export interface TrainerType extends BeingType {
  critters: []
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
  ui: UIType
}

export type UIType = {
  scalingFactor: number
}