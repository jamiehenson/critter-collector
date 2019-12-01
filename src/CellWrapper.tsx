import React, { Component, useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { updatePlayerPosition } from "./ducks/actions"
import { PlayerProps } from "./utils/types"

type CellWrapperProps = {
  updatePlayerPosition: Function,
  player: PlayerProps,
  world: { worldSize: number, cellSize: number, edgeCellPosition: number },
  cells: Component[]
}

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