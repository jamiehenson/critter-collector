import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import CellWrapper from "./CellWrapper"
import Cell from "./Cell"
import UI from "./UI"
import { addCritterToWorld, addCritterToPlayer, addClinicToWorld } from "./ducks/actions"
import water from "./img/water.png"
import { WorldType, PlayerType } from "./utils/types"
import theme from "./utils/theme"

type WorldProps = {
  world: WorldType,
  player: PlayerType,
  scalingFactor: number,
  addCritterToWorld: Function,
  addCritterToPlayer: Function,
  addClinicToWorld: Function
}

type StyledWorldProps = {
  scalingFactor: number,
  cellSize: number
}

const World: React.FC<WorldProps> = ({ world, player, scalingFactor, addCritterToWorld, addCritterToPlayer, addClinicToWorld }) => {
  const cells: any[] = []
  const { worldSize, critterMaxPopulation, cellSize, critters } = world
  for (let i = 0; i < critterMaxPopulation; i++) {
    if (critters.length >= critterMaxPopulation) { break };
    addCritterToWorld();
  }

  if (player.critters.length < 2) {
    addCritterToPlayer()
  }

  if (!world.clinic) {
    addClinicToWorld()
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
  border: 10px solid ${theme.colours.grey};
  padding: 1px;
  background-image: url(${water});
  background-repeat: repeat;
  background-size: ${({ cellSize, scalingFactor }) => cellSize * scalingFactor}vh;
`

export default connect(
  state => ({ world: state.world, player: state.player, scalingFactor: state.ui.scalingFactor }),
  (dispatch) => ({
    addCritterToWorld: () => dispatch(addCritterToWorld()),
    addCritterToPlayer: () => dispatch(addCritterToPlayer()),
    addClinicToWorld: () => dispatch(addClinicToWorld())
  })
)(World)