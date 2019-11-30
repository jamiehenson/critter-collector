import React from "react"

import Cell from "./Cell"

const World: React.FC = () => {
  const worldWidth: number = 150
  const worldHeight: number = 150
  const cells = []

  for (let i = 0; i < worldHeight; i++) {
    let cellRow = []
    for (let j = 0; j < worldWidth; j++) {
      cellRow.push(<Cell x={j} y={i} />)
    }
    cells.push(cellRow)
  }

  return (
    <div>{cells}</div>
  )
}

export default World