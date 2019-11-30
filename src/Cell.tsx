import React from "react"
import styled from "styled-components"
import { connect } from "react-redux";

import sand from "./img/sand.png"
import grass from "./img/grass.png"

type CritterProps = {
  name: string,
  type: string,
  position: { x: number, y: number }
}

type CellProps = {
  x: number,
  y: number,
  playerPosition: { x: number, y: number }
  world: { cellSize: number, worldSize: number, sandEdgeCells: number },
  critters: CritterProps[],
  scalingFactor: number
}

type StyledCellProps = {
  cellSize: number,
  cellType: string,
  scalingFactor: number
}

const cellTypeColours = {
  player: "red",
  critter: "green",
  empty: "white"
}

const Cell: React.FC<CellProps> = ({ x, y, playerPosition, world, critters, scalingFactor }) => {
  const { cellSize, worldSize, sandEdgeCells } = world
  const critterMatch = critters.find(critter => critter.position.x === x && critter.position.y === y)
  const sandEdgeCell = x < 2 || y < 2 || x >= worldSize - sandEdgeCells || y >= worldSize - sandEdgeCells

  const positionStyling = {
    left: `${x * cellSize * scalingFactor}vh`,
    top: `${y * cellSize * scalingFactor}vh`,
    backgroundImage: `url(${sandEdgeCell ? sand : grass})`
  }

  let cellType = "empty"
  if (playerPosition.x === x && playerPosition.y === y) {
    cellType = "player"
  } else if (critterMatch) {
    cellType = "critter"
  }

  const cellLabel = critterMatch ? critterMatch.name : ""

  if (cellType !== "empty") {
    delete positionStyling["backgroundImage"]
  }

  return (
    <StyledCell
      style={positionStyling}
      cellType={cellType}
      cellSize={cellSize}
      scalingFactor={scalingFactor}
    >
      {cellLabel}
    </StyledCell>
  )
}

const StyledCell = styled.div<StyledCellProps>`
  border: 0.5px solid rgba(0,0,0,0.1);
  position: absolute;
  width: ${({ cellSize, scalingFactor }) => cellSize * scalingFactor}vh;
  height: ${({ cellSize, scalingFactor }) => cellSize * scalingFactor}vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-color: ${({ cellType }) => cellTypeColours[cellType]}
`

export default connect(
  state => ({
    world: state.world,
    playerPosition: state.player.position,
    critters: state.critters,
    scalingFactor: state.ui.scalingFactor
  }),
  null
)(Cell)

