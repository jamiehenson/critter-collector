import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import CellWrapper from "./CellWrapper"
import Cell from "./Cell"
import { addCritter } from "./ducks/actions"

type WorldProps = {
  world: { worldSize: number, critterCount: number },
  addCritter: Function
}

const World: React.FC<WorldProps> = ({ world, addCritter }) => {
  const cells: any[] = []
  const { worldSize, critterCount } = world

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
    <StyledWorld>
      <CellWrapper cells={cells}></CellWrapper>
    </StyledWorld>
  )
}

const StyledWorld = styled.div`
  position: relative;
  width: 100vh;
  height: 100vh;
  overflow: hidden;
`

export default connect(
  state => ({ world: state.world }),
  (dispatch) => ({
    addCritter: () => dispatch(addCritter())
  })
)(World)