export type PlayerProps = {
  position: { x: number, y: number },
  direction: string,
  critters: CritterProps[]
}

export type CritterProps = {
  id: number,
  name: string,
  type: string,
  icon: string,
  position: { x: number, y: number }
}

export type CellProps = {
  x: number,
  y: number,
  player: PlayerProps
  world: { cellSize: number, worldSize: number, sandEdgeCells: number },
  critters: CritterProps[],
  scalingFactor: number
}