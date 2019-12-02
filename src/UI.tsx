import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import BattleUI from "./BattleUI"
import { PlayerType, UIType } from "./utils/types"

export type UIProps = {
  player: PlayerType,
  ui: UIType
}

type FooterUIProps = {
  player: PlayerType,
}

const UI: React.FC<UIProps> = ({ player, ui }) => {
  if (player.battle.active) {
    return (
      <>
        <BattleUI player={player} ui={ui} />
        <FooterUI player={player} />
      </>
    )
  } else {
    return (
      <FooterUI player={player} />
    )
  }
}

const FooterUI: React.FC<FooterUIProps> = ({ player }) => {
  const { critters, nearbyCritters } = player
  return (
    <StyledFooterUI>
      <div>
        <h3>Your Critters ({critters.length})</h3>
        <CritterList>
          {critters.map((critter) => (
            <div key={critter.id}>
              <span className="icon">{critter.icon}</span>
              <span className="stats">
                <p>LV: {critter.level}</p>
                <p>HP: {critter.healthPoints}</p>
              </span>
            </div>
          ))}
        </CritterList>
      </div>
      <div>
        <h3>Nearby ({nearbyCritters.length})</h3>
        <CritterList>
          {nearbyCritters.map((critter) => (
            <span key={critter.id} className="icon">{critter.icon}</span>
          ))}
        </CritterList>
      </div>
    </StyledFooterUI>
  )
}

const StyledFooterUI = styled.div`
  width: calc(100% - 3rem);
  display: flex;
  height: 150px;
  position: absolute;
  bottom: 0;
  margin: 1rem;
  background: rgba(40, 40, 40, 0.4);
  border-radius: 5px;
  padding: 0.5rem;
  color: white;
  font-weight: bold;
  > div {
    flex: 1;
    padding: 0.5rem;
    margin: 0.25rem;
    background: rgba(40, 40, 40, 0.4);
    border-radius: 5px;
    &:last-child {
      width: 150px;
      flex: none;
    }
  }
  h3 {
    margin: 0;
    font-size: 0.8rem;
  }
  p {
    margin: 0;
  }
`

const CritterList = styled.div`
  margin-top: 0.5rem;
  > div { 
    display: inline-flex;
    align-items: center;
    width: calc(100% / 3);
  }
  .icon {
    font-size: 2rem;
  }
  .stats {
    font-size: 0.6rem;
    line-height: 1rem;
    margin-left: 0.5rem;
  }
`

export default connect((state) => ({ player: state.player, ui: state.ui }), null)(UI)