import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import CellWrapper from "./CellWrapper"
import Cell from "./Cell"

type WorldProps = {
  world: { worldSize: number, cellSize: number, edgeCellPosition: number }
}

const World: React.FC<WorldProps> = ({ world }) => {
  const cells: any[] = []
  const { worldSize } = world

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

export default connect(state => ({ world: state.world }), null)(World)