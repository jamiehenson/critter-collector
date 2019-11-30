import React from "react"
import styled from "styled-components"

type CellProps = {
  x: number,
  y: number
}

const cellDivision: number = 15
const cellSize: number = 100.0 / cellDivision

const Cell: React.FC<CellProps> = ({ x, y }) => {
  return (
    <StyledCell style={{ left: `${x * cellSize}vw`, top: `${y * cellSize}vw` }}>{x},{y}</StyledCell>
  )
}

const StyledCell = styled.div`
  border: 1px solid black;
  position: absolute;
  width: ${cellSize}vw;
  height: ${cellSize}vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Cell

