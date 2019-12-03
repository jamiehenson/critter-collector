import React from "react"
import styled from "styled-components"
import { connect } from "react-redux";

import { CellType } from "./utils/types"
import sand from "./img/sand.png"
import grass from "./img/grass.png"

type StyledCellProps = {
  cellSize: number,
  scalingFactor: number,
  flipCell: boolean
}

const Cell: React.FC<CellType> = ({ x, y, player, world, ui }) => {
  const { cellSize, worldSize, sandEdgeCells, critters, clinic } = world
  const { direction, nearbyCritters } = player
  const playerCell = player.position.x === x && player.position.y === y
  const critterMatch = critters.find(critter => critter.position.x === x && critter.position.y === y)
  const sandEdgeCell = x < 2 || y < 2 || x >= worldSize - sandEdgeCells || y >= worldSize - sandEdgeCells
  const clinicCell = clinic.x === x && clinic.y === y

  const positionStyling = {
    left: `${x * cellSize * ui.scalingFactor}vh`,
    top: `${y * cellSize * ui.scalingFactor}vh`,
    backgroundImage: `url(${sandEdgeCell ? sand : grass})`
  }

  let cellLabel = ""
  let flippedCell = false
  if (playerCell) {
    if (direction === "up" || direction === "down") {
      cellLabel = "🧍‍♂️"
    } else if (direction === "left") {
      cellLabel = "🚶‍♂️"
    } else if (direction === "right") {
      cellLabel = "🚶‍♂️"
      flippedCell = true
    }
  } else if (critterMatch && nearbyCritters.find((critter) => critter.id === critterMatch.id)) {
    cellLabel = critterMatch.icon
  } else if (clinicCell) {
    cellLabel = "🏥"
  }

  return (
    <StyledCell
      style={positionStyling}
      cellSize={cellSize}
      scalingFactor={ui.scalingFactor}
      flipCell={flippedCell}
    >
      {cellLabel}
    </StyledCell>
  )
}

const StyledCell = styled.div<StyledCellProps>`
  border: 0.5px solid rgba(0,0,0,0.1);
  position: absolute;
  width: ${({ cellSize, scalingFactor }) => cellSize * scalingFactor}vh;
  height: ${({ cellSize, scalingFactor }) => cellSize * scalingFactor}vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  font-size: ${({ cellSize, scalingFactor }) => cellSize * scalingFactor}vh;
  transform: scale(${({ flipCell }) => flipCell ? -1 : 1}, 1);
`

export default connect(
  state => ({
    world: state.world,
    player: state.player,
    ui: state.ui
  }),
  null
)(Cell)

