import React from "react"
import styled from "styled-components"
import { connect } from "react-redux";

type CellProps = {
  x: number,
  y: number,
  playerPosition: { x: number, y: number }
}

type StyledCellProps = {
  playerCell: boolean
}

const cellDivision: number = 9
export const cellSize: number = 100.0 / cellDivision
export const edgeCellPosition: number = Math.floor(cellDivision / 2)

const Cell: React.FC<CellProps> = ({ x, y, playerPosition }) => {
  const positionStyling = {
    left: `${x * cellSize}vh`,
    top: `${y * cellSize}vh`
  }
  return (
    <StyledCell style={positionStyling} playerCell={playerPosition.x === x && playerPosition.y === y}>{x},{y}</StyledCell>
  )
}

const StyledCell = styled.div<StyledCellProps>`
  border: 1px solid black;
  position: absolute;
  width: ${cellSize}vh;
  height: ${cellSize}vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ playerCell }) => playerCell ? "red" : "white"}
`

export default connect(
  state => ({
    playerPosition: state.player.position
  }),
  null
)(Cell)

