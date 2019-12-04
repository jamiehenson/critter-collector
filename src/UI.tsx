import React from "react"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { Wave } from "react-animated-text"

import BattleUI from "./BattleUI"
import { PlayerType, UIType } from "./utils/types"
import theme from "./utils/theme"
import { startGame } from "./ducks/actions"

export type UIProps = {
  player: PlayerType,
  ui: UIType
}

interface MenuUIProps extends UIProps {
  startGame: Function
}

const UI: React.FC<UIProps> = ({ player, ui }) => {
  return (
    <>
      {ui.gameState === "menu" && <ConnectedMenuUI />}
      {ui.gameState === "end" && <ConnectedEndUI />}
      {player.battle.active && <BattleUI player={player} ui={ui} />}
      <FooterUI player={player} ui={ui} />
    </>
  )
}

const MenuUI: React.FC<MenuUIProps> = ({ startGame }) => {
  return (
    <StyledMenuUI>
      <h1><Wave text="CRITTER COLLECTOR!" /></h1>
      <div className="bigIconMenu">
        <span role="img" aria-label="Critter Collector">🏆</span>
        <span role="img" aria-label="Critter Collector">😻</span>
        <span role="img" aria-label="Critter Collector">🏆</span>
      </div>
      <UIButton onClick={() => startGame()}>LET'S GO!</UIButton>
      <small>(use the arrow keys or WASD to move around)</small>
    </StyledMenuUI>
  )
}

const EndUI: React.FC<MenuUIProps> = ({ startGame }) => {
  return (
    <StyledMenuUI>
      <h2>Game Over!</h2>
      <p>Oh no! All your Critters have fainted. Watch out for the higher leveled Critters of dangerous types, and make sure to use the Clinic to heal injured/fainted Critters.</p>
      <div className="bigIconEnd"><span role="img" aria-label="Game Over">😿</span></div>
      <UIButton onClick={() => window.location.reload()}>LET'S GO AGAIN!</UIButton>
    </StyledMenuUI>
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

const letterHues = () => {
  let css = ""
  for (let i = 1; i <= 18; i++) {
    css += `&:nth-child(${i}) { span { color: hsl(${(i / 18) * 360}, 100%, 50%) } }`
  }
  return css
}

const danceAnimation = keyframes`
  0%, 50%, 100% { 
    transform: rotate(0deg); 
  }
  25% { 
    transform: rotate(30deg); 
  }
  75% { 
    transform: rotate(-30deg); 
  }
`

const StyledMenuUI = styled.div`
  position: relative;
  height: calc(100% - 2.5vh);
  padding: 4vh;
  color: white;
  background: rgba(0, 0, 0, 0.9);
  line-height: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
  text-align: center;
  h1, h2 {
    margin-top: 0;
  }
  h1 {
    font-size: 6vh;
    text-align: center;
    pointer-events: none;
    > div span {
      ${letterHues()}
      &:nth-child(8) {
        display: block !important;
        height: 2vh;
      }
    }
  }
  .bigIconMenu, .bigIconEnd {
    font-size: 15vh;
    width: 15vh;
    margin: 0;
    padding: 0;
    margin-top: -7vh;
  }
  .bigIconMenu {
    width: auto;
    pointer-events: none;
    span {
      margin: 0 1vh;
      animation: ${danceAnimation} 3s infinite linear;
      display: inline-block;
    }
  }
  small {
    margin-top: 3vh;
    font-size: 1.4vh;
  }
`

export const UIButton = styled.button`
  -webkit-appearance: none;
  padding: 1vh 3vh;
  background: black;
  border: 0;
  margin: 1vh;
  color: white;
  font-size: 2vh;
  border-radius: 5px;
  text-transform: uppercase;
  font-family: 'Press Start 2P', sans-serif;
  cursor: pointer;
  &:hover {
    background: ${theme.colours.grey};
  }
  border: 2px solid white;
`

const StyledFooterUI = styled.div`
  width: calc(100% - 6vh);
  display: flex;
  height: 20vh;
  position: absolute;
  bottom: 0;
  margin: 2vh;
  background: rgba(40, 40, 40, 0.4);
  border-radius: 5px;
  padding: 1vh;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 2px black;
  > div {
    flex: 1;
    padding: 2vh;
    margin: 0.5vh;
    background: rgba(40, 40, 40, 0.4);
    border-radius: 5px;
    &:last-child {
      width: 20vh;
      flex: none;
    }
  }
  h3 {
    margin: 0;
    font-size: 1.6vh;
  }
  p {
    margin: 0;
  }
`

const CritterList = styled.div`
  margin-top: 1vh;
  max-height: 13vh;
  overflow-y: scroll;
  > div { 
    display: inline-flex;
    align-items: center;
    width: calc(100% / 3);
  }
  .icon {
    font-size: 4vh;
    position: relative;
    width: 4vh;
    height: 4vh;
  }
  .active {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1.5vh;
    height: 1.5vh;
    font-size: 1.5vh;
  }
  .stats {
    font-size: 1.2vh;
    line-height: 2vh;
    margin-left: 1vh;
  }
`

const ClinicNote = styled.div`
  width: calc(100% - 4vh);
  background: rgba(255,0,0,0.6);
  height: calc(100% - 4vh);
  margin-bottom: calc(-20vh + 5vh);
  z-index: 2;
  position: relative;
  padding: 2vh;
  display: flex;
  align-items: center;
  font-size: 2vh;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
  line-height: 2;
`

const ConnectedMenuUI = connect(null, (dispatch) => ({ startGame: () => dispatch(startGame()) }))(MenuUI)
const ConnectedEndUI = connect(null, (dispatch) => ({ startGame: () => dispatch(startGame()) }))(EndUI)

export default connect((state) => ({ player: state.player, ui: state.ui }))(UI)