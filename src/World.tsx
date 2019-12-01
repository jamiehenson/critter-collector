import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import CellWrapper from "./CellWrapper"
import Cell from "./Cell"
import UI from "./UI"
import { addCritter } from "./ducks/actions"
import water from "./img/water.png"

type WorldProps = {
  world: { worldSize: number, critterCount: number, cellSize: number },
  scalingFactor: number,
  addCritter: Function
}

type StyledWorldProps = {
  scalingFactor: number,
  cellSize: number
}

const World: React.FC<WorldProps> = ({ world, scalingFactor, addCritter }) => {
  const cells: any[] = []
  const { worldSize, critterCount, cellSize } = world

  for (let i = 0; i < critterCount; i++) {
    addCritter()
  }

  for (let i = 0; i < worldSize; i++) {
    let cellRow: any[] = []
    for (let j = 0; j < worldSize; j++) {
      cellRow.push(<Cell x={j} y={i} key={`${i}-${j}`} />)
    }
    cells.push(cellRow)
  }

  return (
    <StyledWorld scalingFactor={scalingFactor} cellSize={cellSize}>
      <CellWrapper cells={cells}></CellWrapper>
      <UI></UI>
    </StyledWorld>
  )
}

const StyledWorld = styled.div<StyledWorldProps>`
  position: relative;
  width: ${({ scalingFactor }) => 100 * scalingFactor}vh;
  height: ${({ scalingFactor }) => 100 * scalingFactor}vh;
  overflow: hidden;
  margin: 5vh;
  border-radius: 5px;
  border: 3px solid #333333;
  padding: 1px;
  background-image: url(${water});
  background-repeat: repeat;
  background-size: ${({ cellSize, scalingFactor }) => cellSize * scalingFactor}vh;
`

export default connect(
  state => ({ world: state.world, scalingFactor: state.ui.scalingFactor }),
  (dispatch) => ({
    addCritter: () => dispatch(addCritter())
  })
)(World)