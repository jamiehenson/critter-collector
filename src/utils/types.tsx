export type PlayerType = {
  position: { x: number, y: number },
  direction: string,
  critters: CritterType[],
  nearbyCritters: CritterType[],
  battle: { active: boolean, fighter: CritterType, opponent: CritterType, log: string[], paused: boolean, initialFighter: CritterType }
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
  level: number,
  activeFighter: boolean,
  fullHealthPoints: number
}

export interface TrainerType extends BeingType {
  critters: []
}

export type WorldType = {
  cellSize: number,
  worldSize: number,
  edgeCellPosition: number,
  sandEdgeCells: number,
  critterMaxPopulation: number,
  critters: CritterType[],
  critterCounter: number,
  clinic: { x: number, y: number }
}

export type CellType = {
  x: number,
  y: number,
  player: PlayerType
  world: WorldType,
  ui: UIType
}

export type UIType = {
  scalingFactor: number,
  gameState: string,
  clinic: boolean
}

export type BattleType = {
  player: PlayerType,
  updateActiveCritterFighter: Function,
  addCritterToPlayer: Function,
  removeCritterFromWorld: Function,
  increaseCritterLevel: Function,
  updateBattleStatus: Function
}