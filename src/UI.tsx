import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { PlayerType } from "./utils/types"

type UIProps = {
  player: PlayerType
}

const UI: React.FC<UIProps> = ({ player }) => {
  const { critters, nearbyCritters } = player
  return (
    <StyledUI>
      <p>Your Critters
        <CritterList>{critters.map((critter) => critter.icon).join(" ")}</CritterList>
      </p>
      <p>Nearby Critters ({nearbyCritters.length})
        <CritterList>{nearbyCritters.map((critter) => critter.icon).join(" ")}</CritterList>
      </p>
    </StyledUI>
  )
}

const StyledUI = styled.div`
  width: calc(100% - 4rem);
  display: flex;
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
    flex: 1;
  }
`

const CritterList = styled.div`
  font-size: 3rem;
`

export default connect((state) => ({ player: state.player }), null)(UI)