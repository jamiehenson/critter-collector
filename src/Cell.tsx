import React from "react"
import styled from "styled-components"
import { connect } from "react-redux";

type CellProps = {
  x: number,
  y: number,
  playerPosition: { x: number, y: number }
  cellSize: number
}

type StyledCellProps = {
  playerCell: boolean,
  cellSize: number
}

const Cell: React.FC<CellProps> = ({ x, y, playerPosition, cellSize }) => {
  const positionStyling = {
    left: `${x * cellSize}vh`,
    top: `${y * cellSize}vh`
  }
  return (
    <StyledCell
      style={positionStyling}
      playerCell={playerPosition.x === x && playerPosition.y === y}
      cellSize={cellSize}>{x},{y}</StyledCell>
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
  background-color: ${({ playerCell }) => playerCell ? "red" : "white"}
`

export default connect(
  state => ({
    cellSize: state.world.cellSize,
    playerPosition: state.player.position
  }),
  null
)(Cell)

