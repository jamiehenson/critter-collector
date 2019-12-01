export type PlayerProps = {
  position: { x: number, y: number },
  direction: string
}

export type CritterProps = {
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