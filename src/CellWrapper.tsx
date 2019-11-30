import React, { Component, useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { updatePlayerPosition } from "./ducks/actions"

type CellWrapperProps = {
  updatePlayerPosition: Function,
  playerPosition: { x: number, y: number },
  world: { worldSize: number, cellSize: number, edgeCellPosition: number },
  cells: Component[]
}

const World: React.FC<CellWrapperProps> = ({ updatePlayerPosition, playerPosition, world, cells }) => {
  const { cellSize, edgeCellPosition } = world
  const positionStyling = {
    marginLeft: `${-((playerPosition.x - edgeCellPosition) * cellSize)}%`,
    marginTop: `${-((playerPosition.y - edgeCellPosition) * cellSize)}%`,
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
  state => ({ world: state.world, playerPosition: state.player.position }),
  (dispatch) => ({
    updatePlayerPosition: (key) => dispatch(updatePlayerPosition(key))
  }))(World)