import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import BattleUI from "./BattleUI"
import { PlayerType, UIType } from "./utils/types"

export type UIProps = {
  player: PlayerType,
  ui: UIType
}

const UI: React.FC<UIProps> = ({ player, ui }) => {
  return (
    <>
      {ui.gameState === "menu" && <MenuUI>IT STARTS</MenuUI>}
      {ui.gameState === "end" && <EndUI>IT'S OVER MATE</EndUI>}
      {player.battle.active && <BattleUI player={player} ui={ui} />}
      <FooterUI player={player} ui={ui} />
    </>
  )
}

const MenuUI: React.FC = () => {
  return (
    <StyledMenuUI>It starts</StyledMenuUI>
  )
}

const EndUI: React.FC = () => {
  return (
    <StyledEndUI>It ends</StyledEndUI>
  )
}

const FooterUI: React.FC<UIProps> = ({ player, ui }) => {
  const { critters, nearbyCritters } = player
  return (
    <StyledFooterUI>
      <div>
        {ui.clinic && <ClinicNote>All Critters fully healed!</ClinicNote>}
        <h3>Your Critters ({critters.length})</h3>
        <CritterList>
          {critters.map((critter) => (
            <div key={critter.id}>
              <span className="icon">
                <span className="icon-image">{critter.icon}</span>
                <span className="active">{critter.activeFighter ? "✅" : ""}</span>
              </span>
              <span className="stats">
                <p>LV: {critter.level}</p>
                <p>HP: {critter.healthPoints * critter.level}</p>
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

const StyledMenuUI = styled.div`
  position: relative;
`

const StyledEndUI = styled.div`
  position: relative;
`

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
  text-shadow: 0 0 2px black;
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
    position: relative;
    width: 2rem;
    height: 2rem;
  }
  .active {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0.75rem;
    height: 0.75rem;
    font-size: 0.75rem;
  }
  .stats {
    font-size: 0.6rem;
    line-height: 1rem;
    margin-left: 0.5rem;
  }
`

const ClinicNote = styled.div`
  width: calc(100% - 2rem);
  background: rgba(255,0,0,0.6);
  height: calc(100% - 2rem);
  margin-bottom: calc(-150px + 1.5rem);
  z-index: 2;
  position: relative;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`

export default connect((state) => ({ player: state.player, ui: state.ui }), null)(UI)