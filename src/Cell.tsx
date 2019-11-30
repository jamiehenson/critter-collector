import React from "react"
import styled from "styled-components"
import { connect } from "react-redux";

type CritterProps = {
  name: string,
  type: string,
  position: { x: number, y: number }
}

type CellProps = {
  x: number,
  y: number,
  playerPosition: { x: number, y: number }
  cellSize: number,
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

const Cell: React.FC<CellProps> = ({ x, y, playerPosition, cellSize, critters, scalingFactor }) => {
  const positionStyling = {
    left: `${x * cellSize * scalingFactor}vh`,
    top: `${y * cellSize * scalingFactor}vh`
  }

  const critterMatch = critters.find(critter => critter.position.x === x && critter.position.y === y)

  let cellType = "empty"
  if (playerPosition.x === x && playerPosition.y === y) {
    cellType = "player"
  } else if (critterMatch) {
    cellType = "critter"
  }

  const cellLabel = critterMatch ? critterMatch.name : `${x},${y}`

  return (
    <StyledCell
      style={positionStyling}
      cellType={cellType}
      cellSize={cellSize}
      scalingFactor={scalingFactor}>
      {cellLabel}
    </StyledCell>
  )
}

const StyledCell = styled.div<StyledCellProps>`
  border: 1px solid black;
  position: absolute;
  width: ${({ cellSize, scalingFactor }) => cellSize * scalingFactor}vh;
  height: ${({ cellSize, scalingFactor }) => cellSize * scalingFactor}vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ cellType }) => cellTypeColours[cellType]}
`

export default connect(
  state => ({
    cellSize: state.world.cellSize,
    playerPosition: state.player.position,
    critters: state.critters,
    scalingFactor: state.ui.scalingFactor
  }),
  null
)(Cell)

