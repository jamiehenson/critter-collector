import React, { Component, useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { updatePlayerPosition } from "./ducks/actions"
import { PlayerType, WorldType } from "./utils/types"

type CellWrapperProps = {
  updatePlayerPosition: Function,
  player: PlayerType,
  world: WorldType,
  cells: Component[]
}

// This component wraps all the instantiated cells, allowing the UI to move all the cells at once within the bound
// viewport as the player moves, which is cleaner than moving each cell individually

const CellWrapper: React.FC<CellWrapperProps> = ({ updatePlayerPosition, player, world, cells }) => {
  const { cellSize, edgeCellPosition } = world
  const positionStyling = {
    marginLeft: `${-((player.position.x - edgeCellPosition) * cellSize)}%`,
    marginTop: `${-((player.position.y - edgeCellPosition) * cellSize)}%`,
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => { updatePlayerPosition(e.key || e.keyCode) })
    return () => {
      window.removeEventListener("keydown", (e) => { updatePlayerPosition(e.key || e.keyCode) })
    }
  }, [updatePlayerPosition]);

  return (
    <StyledCellWrapper style={positionStyling}>{cells}</StyledCellWrapper>
  )
}

const StyledCellWrapper = styled.div`
  position: absolute;
  transition: margin-left 0.1s, margin-top 0.1s;
  will-change: margin-left, margin-top;
`

export default connect(
  state => ({ world: state.world, player: state.player }),
  (dispatch) => ({
    updatePlayerPosition: (key) => dispatch(updatePlayerPosition(key))
  }))(CellWrapper)