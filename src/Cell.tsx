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
  critters: CritterProps[]
}

type StyledCellProps = {
  cellSize: number,
  cellType: string
}

const cellTypeColours = {
  player: "red",
  critter: "green",
  empty: "white"
}

const Cell: React.FC<CellProps> = ({ x, y, playerPosition, cellSize, critters }) => {
  const positionStyling = {
    left: `${x * cellSize}vh`,
    top: `${y * cellSize}vh`
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
      cellSize={cellSize}>{cellLabel}
    </StyledCell>
  )
}

const StyledCell = styled.div<StyledCellProps>`
  border: 1px solid black;
  position: absolute;
  width: ${({ cellSize }) => cellSize}vh;
  height: ${({ cellSize }) => cellSize}vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ cellType }) => cellTypeColours[cellType]}
`

export default connect(
  state => ({
    cellSize: state.world.cellSize,
    playerPosition: state.player.position,
    critters: state.critters
  }),
  null
)(Cell)

