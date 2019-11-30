import React, { useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { updatePlayerPosition } from "./ducks/actions"
import Cell from "./Cell"

type WorldProps = {
  updatePlayerPosition: Function,
  playerPosition: { x: number, y: number },
  world: { worldSize: number, cellSize: number, edgeCellPosition: number }
}

const World: React.FC<WorldProps> = ({ updatePlayerPosition, playerPosition, world }) => {
  const cells: any[] = []
  const { worldSize, edgeCellPosition, cellSize } = world

  for (let i = 0; i < worldSize; i++) {
    let cellRow: any[] = []
    for (let j = 0; j < worldSize; j++) {
      cellRow.push(<Cell x={j} y={i} key={`${i}-${j}`} />)
    }
    cells.push(cellRow)
  }

  const positionStyling = {
    marginLeft: `${-((playerPosition.x - edgeCellPosition) * cellSize)}vh`,
    marginTop: `${-((playerPosition.y - edgeCellPosition) * cellSize)}vh`,
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => { updatePlayerPosition(e.key || e.keyCode) })
    return () => {
      window.removeEventListener("keydown", (e) => { updatePlayerPosition(e.key || e.keyCode) })
    }
  }, [updatePlayerPosition]);

  return (
    <StyledWorld>
      <CellWrapper style={positionStyling}>{cells}</CellWrapper>
    </StyledWorld>
  )
}

const StyledWorld = styled.div`
  position: relative;
  width: 100vh;
  height: 100vh;
  overflow: hidden;
`

const CellWrapper = styled.div`
  position: absolute;
  transition: margin-left 0.1s, margin-top 0.1s;
  will-change: margin-left, margin-top;
`

export default connect(
  state => ({ world: state.world, playerPosition: state.player.position }),
  (dispatch) => {
    return {
      updatePlayerPosition: (key) => dispatch(updatePlayerPosition(key))
    }
  })(World)