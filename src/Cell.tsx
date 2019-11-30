import React from "react"

type CellProps = {
  x: number,
  y: number
}

const Cell: React.FC<CellProps> = ({ x, y }) => {
  return (
    <div>{x}, {y}</div>
  )
}

export default Cell

