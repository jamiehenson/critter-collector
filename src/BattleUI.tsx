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
  const { fighter, opponent, log, paused } = player.battle

  return (
    <StyledBattleUI scaling={ui.scalingFactor}>
      <h2>BATTLE!</h2>
      <FightIntro>
        <div>
          <CritterIcon>
            <span className="icon">{fighter.icon}</span>
            <span className="type">{getTypeIcon(fighter.type)}</span>
          </CritterIcon>
          <p>{titleise(fighter.name)}</p>
          <small>Lv. {fighter.level}</small>
          <small>(HP: {fighter.healthPoints * fighter.level}, CP: {fighter.combatPoints * fighter.level})</small>
        </div>
        <div>
          VS
      </div>
        <div>
          <CritterIcon>
            <span className="icon">{opponent.icon}</span>
            <span className="type">{getTypeIcon(opponent.type)}</span>
          </CritterIcon>
          <p>{titleise(opponent.name)}</p>
          <small>Lv. {opponent.level}</small>
          <small>(HP: {opponent.healthPoints * opponent.level}, CP: {opponent.combatPoints * opponent.level})</small>
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
    margin: 0 0 2vh 0;
  }
`

const Choice = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 2vh
  p {
    margin: 0 2vh;
  }
`

const FightIntro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  > div {
    text-align: center;
    padding: 2vh;
  }
  small {
    display: block;
    margin-top: 1vh;
    font-size: 1.2vh;
  }
`

const FightScreen = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  background: rgba(40, 40, 40, 0.75);
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
