import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { PlayerType } from "./utils/types"

type UIProps = {
  player: PlayerType
}

const UI: React.FC<UIProps> = ({ player }) => {
  return (
    <StyledUI>
      <p>Critters: {player.critters.map((critter) => critter.icon).join(" ")}</p>
      {/* <p>Nearby critters: {player.nearbyCritters}</p> */}
    </StyledUI>
  )
}

const StyledUI = styled.div`
  width: calc(100% - 4rem);
  height: 100px;
  position: absolute;
  bottom: 0;
  margin: 1rem;
  background: rgba(40, 40, 40, 0.5);
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  color: white;
  font-weight: bold;
  p {
    margin: 0;
  }
`

export default connect((state) => ({ player: state.player }), null)(UI)