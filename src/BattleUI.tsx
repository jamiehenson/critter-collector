import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { UIProps, UIButton, titleise } from "./UI"
import { addCritterToPlayer, advanceFromBattle, initiateBattle, fleeBattle } from "./ducks/actions"

type StyledBattleUIProps = {
  scaling: number
}

interface BattleUIProps extends UIProps {
  addCritterToPlayer: Function,
  advanceFromBattle: Function,
  initiateBattle: Function,
  fleeBattle: Function
}

const BattleUI: React.FC<BattleUIProps> = ({ ui, player, advanceFromBattle, initiateBattle, fleeBattle }) => {
  const { fighter, opponent, log, paused, initialFighter } = player.battle

  return (
    <StyledBattleUI scaling={ui.scalingFactor}>
      <h2>BATTLE!</h2>
      <FightIntro>
        <div className="fightCritter" style={{ backgroundColor: introCellColour(initialFighter.type) }}>
          <CritterIcon>
            <span className="icon">{initialFighter.icon}</span>
            <span className="type">{getTypeIcon(initialFighter.type)}</span>
          </CritterIcon>
          <p>{titleise(initialFighter.name)}</p>
          <small>Lv. {fighter.level}</small>
          {fighter === initialFighter ?
            <small>(HP: {fighter.healthPoints * fighter.level}, CP: {fighter.combatPoints * fighter.level})</small>
            : <small>FAINTED</small>
          }
        </div>
        <div>
          VS
        </div>
        <div className="fightCritter" style={{ backgroundColor: introCellColour(opponent.type) }}>
          <CritterIcon>
            <span className="icon">{opponent.icon}</span>
            <span className="type">{getTypeIcon(opponent.type)}</span>
          </CritterIcon>
          <p>{titleise(opponent.name)}</p>
          <small>Lv. {opponent.level}</small>
          {opponent.healthPoints > 0 ?
            <small>(HP: {opponent.healthPoints * opponent.level}, CP: {opponent.combatPoints * opponent.level})</small>
            : <small>FAINTED</small>}
        </div>
      </FightIntro>
      {paused ?
        <Choice>
          <UIButton onClick={() => initiateBattle()}>FIGHT</UIButton>
          <p>OR</p>
          <UIButton onClick={() => fleeBattle()}>FLEE</UIButton>
        </Choice>
        : <>
          <FightScreen>
            {log.map((logItem, i) => (
              <p key={i}>{logItem}</p>
            ))}
          </FightScreen>
          <UIButton onClick={() => advanceFromBattle()}>Advance</UIButton>
        </>}
    </StyledBattleUI>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addCritterToPlayer: (critter) => dispatch(addCritterToPlayer(critter)),
  advanceFromBattle: () => dispatch(advanceFromBattle()),
  initiateBattle: () => dispatch(initiateBattle()),
  fleeBattle: () => dispatch(fleeBattle())
})

export default connect(null, mapDispatchToProps)(BattleUI)

const getTypeIcon = (type) => {
  if (type === "fire") {
    return "🔥"
  } else if (type === "water") {
    return "💧"
  } else if (type === "grass") {
    return "🌱"
  }
}

const introCellColour = (type) => {
  if (type === "fire") {
    return "rgba(255, 0, 0, 0.3)"
  } else if (type === "water") {
    return "rgba(0, 0, 255, 0.3)"
  } else if (type === "grass") {
    return "rgba(0, 255, 0, 0.3)"
  }
}

const StyledBattleUI = styled.div<StyledBattleUIProps>`
  width: calc(100% - 8vh);
  display: flex;
  height: calc(${({ scaling }) => 100 * scaling}vh - 11vh - 20vh);
  position: absolute;
  top: 0;
  margin: 2vh;
  background: rgba(40, 40, 40, 0.75);
  border-radius: 5px;
  padding: 2vh;
  color: white;
  font-weight: bold;
  align-items: center;
  flex-direction: column;
  font-size: 3vh;
  text-shadow: 0 0 2px black;
  p {
    margin: 0;
  }
  h2 {
    margin: 2vh 0;
  }
`

const Choice = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  p {
    margin: 0 2vh;
  }
`

const FightIntro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  > div {
    text-align: center;
    padding: 2vh;
    flex: none;
  }
  small {
    display: block;
    margin-top: 1vh;
    font-size: 1.2vh;
  }
  .fightCritter {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
  }
`

const FightScreen = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.5);
  margin: 2vh 0;
  p {
    font-size: 1.2vh;
    margin: 1vh;
  }
`

const CritterIcon = styled.div`
  font-size: 8vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2vh;
  width: 8vh;
  height: 8vh;
  border-radius: 5px;
  .type {
    position: absolute;
    font-size: 3vh;
    bottom: 0;
    right: 0;
  }
`
