import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { UIProps, UIButton } from "./UI"
import { addCritterToPlayer, advanceFromBattle, removeCritterFromWorld, updateActiveCritterFighter, increaseCritterLevel } from "./ducks/actions"
import { typeModifiers } from "./utils/critters"

type StyledBattleUIProps = {
  scaling: number
}

interface BattleUIProps extends UIProps {
  addCritterToPlayer: Function,
  advanceFromBattle: Function,
  removeCritterFromWorld: Function,
  updateActiveCritterFighter: Function,
  increaseCritterLevel: Function
}

const BattleUI: React.FC<BattleUIProps> = ({ ui, player, advanceFromBattle, addCritterToPlayer, removeCritterFromWorld, updateActiveCritterFighter, increaseCritterLevel }) => {
  const yourCritter = player.critters.find((critter) => critter.activeFighter)

  const [battle, setBattle] = useState({ log: [""], playerLoss: false })

  useEffect(() => {
    let tempBattle = computeBattle(you, them)
    if (tempBattle.playerLoss) {
      tempBattle.log.push(`${them.titleisedName} wins! Your ${you.titleisedName} faints.`)
      const aliveCritters = [...player.critters.filter((critter) => critter.healthPoints > 0)]
      if (aliveCritters.length > 0) {
        tempBattle.log.push(`Go ${aliveCritters[0].name}!`)
        updateActiveCritterFighter(aliveCritters[0])
      } else {
        tempBattle.log.push("All critters have fainted!")
      }
    } else {
      if (!player.critters.find((critter) => critter.id === them.critter.id)) {
        addCritterToPlayer(them.critter)
        removeCritterFromWorld(them.critter)
      }
      let levelText = ""
      if (Math.random() >= 0.5) {
        increaseCritterLevel(you.critter)
        levelText = `They level up to Lv. ${you.critter.level}.`
      }
      tempBattle.log.push(`Your ${you.titleisedName} wins! ${them.titleisedName} caught.` + levelText)
    }
    setBattle(tempBattle)
  }, [])

  if (!yourCritter) {
    return null;
  }

  const theirCritter = player.battle.combatant
  const you = {
    critter: yourCritter,
    titleisedName: yourCritter.name.charAt(0).toUpperCase() + yourCritter.name.slice(1).toLowerCase(),
    typeIcon: getTypeIcon(yourCritter.type)
  }
  const them = {
    critter: theirCritter,
    titleisedName: theirCritter.name.charAt(0).toUpperCase() + theirCritter.name.slice(1).toLowerCase(),
    typeIcon: getTypeIcon(theirCritter.type)
  }

  return (
    <StyledBattleUI scaling={ui.scalingFactor}>
      <h2>FIGHT!</h2>
      <FightIntro>
        <div>
          <CritterIcon>
            <span className="icon">{you.critter.icon}</span>
            <span className="type">{you.typeIcon}</span>
          </CritterIcon>
          <p>{you.titleisedName}</p>
          <small>Lv. {you.critter.level}</small>
          <small>(HP: {you.critter.healthPoints * you.critter.level}, CP: {you.critter.combatPoints * you.critter.level})</small>
        </div>
        <div>
          VS
        </div>
        <div>
          <CritterIcon>
            <span className="icon">{them.critter.icon}</span>
            <span className="type">{them.typeIcon}</span>
          </CritterIcon>
          <p>{them.titleisedName}</p>
          <small>Lv. {them.critter.level}</small>
          <small>(HP: {them.critter.healthPoints * them.critter.level}, CP: {them.critter.combatPoints * them.critter.level})</small>
        </div>
      </FightIntro>
      <FightScreen>
        {battle.log.map((logItem, i) => (
          <p key={i}>{logItem}</p>
        ))}
      </FightScreen>
      <UIButton onClick={() => advanceFromBattle()}>Advance</UIButton>
    </StyledBattleUI>
  )
}

const computeBattle = (you, them) => {
  let battleLog: string[] = []
  let yourGo: boolean = true

  while (you.critter.healthPoints * you.critter.level > 0 && them.critter.healthPoints * them.critter.level > 0) {
    if (yourGo) {
      const attack = you.critter.combatPoints * typeModifiers[you.critter.type][them.critter.type] * you.critter.level
      battleLog.push(`Your ${you.titleisedName} hits ${them.titleisedName} for (${you.critter.combatPoints * you.critter.level} x ${typeModifiers[you.critter.type][them.critter.type]}) ${attack}!`)
      them.critter.healthPoints = Math.max(them.critter.healthPoints - attack, 0)
    } else {
      const attack = them.critter.combatPoints * typeModifiers[them.critter.type][you.critter.type] * them.critter.level
      battleLog.push(`${them.titleisedName} hits your ${you.titleisedName} for (${them.critter.combatPoints * them.critter.level} x ${typeModifiers[them.critter.type][you.critter.type]}) ${attack}!`)
      you.critter.healthPoints = Math.max(you.critter.healthPoints - attack, 0)
    }
    yourGo = !yourGo
  }
  return { log: battleLog, playerLoss: you.critter.healthPoints === 0 }
}

const mapDispatchToProps = (dispatch) => ({
  addCritterToPlayer: (critter) => dispatch(addCritterToPlayer(critter)),
  removeCritterFromWorld: (critter) => dispatch(removeCritterFromWorld(critter)),
  advanceFromBattle: () => dispatch(advanceFromBattle()),
  updateActiveCritterFighter: (critter) => dispatch(updateActiveCritterFighter(critter)),
  increaseCritterLevel: (critter) => dispatch(increaseCritterLevel(critter))
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
