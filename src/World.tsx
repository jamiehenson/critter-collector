import React from "react"
import styled from "styled-components"

import Cell from "./Cell"

const World: React.FC = () => {
  const worldWidth: number = 150
  const worldHeight: number = 150
  const cells: any[] = []

  for (let i = 0; i < worldHeight; i++) {
    let cellRow: any[] = []
    for (let j = 0; j < worldWidth; j++) {
      cellRow.push(<Cell x={j} y={i} key={`${i}-${j}`} />)
    }
    cells.push(cellRow)
  }

  return (
    <StyledWorld>{cells}</StyledWorld>
  )
}

const StyledWorld = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export default World