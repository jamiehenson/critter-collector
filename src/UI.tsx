import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { PlayerProps } from "./utils/types"

type UIProps = {
  player: PlayerProps
}

const UI: React.FC<UIProps> = ({ player }) => {
  return (
    <StyledUI>
      <p>Nearby critters: 0</p>
    </StyledUI>
  )
}

const StyledUI = styled.div`
  width: calc(100% - 1rem);
  height: 100px;
  position: absolute;
  bottom: 0;
  margin: 0.5rem;
  background: rgba(40, 40, 40, 0.5);
  border: 1px solid black;
  border-radius: 5px;
`

export default connect((state) => ({ player: state.player }), null)(UI)