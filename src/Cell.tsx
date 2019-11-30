import React from "react"
import styled from "styled-components"
import { connect } from "react-redux";

type CellProps = {
  x: number,
  y: number,
  characterPosition: object
}

const cellDivision: number = 15
const cellSize: number = 100.0 / cellDivision

const Cell: React.FC<CellProps> = ({ x, y, characterPosition }) => {
  if (x === 0 && y === 0) {
    console.log(characterPosition)
  }
  return (
    <StyledCell style={{ left: `${x * cellSize}vh`, top: `${y * cellSize}vh` }}>{x},{y}</StyledCell>
  )
}

const StyledCell = styled.div`
  border: 1px solid black;
  position: absolute;
  width: ${cellSize}vh;
  height: ${cellSize}vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export default connect(
  state => ({
    characterPosition: state.characterPosition
  }),
  null
)(Cell)

