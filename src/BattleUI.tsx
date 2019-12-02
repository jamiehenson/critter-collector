import React from "react"
import styled from "styled-components"

import { UIProps } from "./UI"
import { typeModifiers } from "./utils/critters"

type StyledBattleUIProps = {
  scaling: number
}

const BattleUI: React.FC<UIProps> = ({ ui, player }) => {
  const yourCritter = player.critters[0]
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

  let battleLog: String[] = []
  let yourGo: boolean = true

  while (yourCritter.healthPoints > 0 && theirCritter.healthPoints > 0) {
    if (yourGo) {
      const attack = yourCritter.combatPoints * typeModifiers[yourCritter.type][theirCritter.type]
      theirCritter.healthPoints -= attack
      battleLog.push(`${you.titleisedName} hits ${them.titleisedName} for ${attack}!`)
    } else {
      const attack = theirCritter.combatPoints * typeModifiers[theirCritter.type][yourCritter.type]
      yourCritter.healthPoints -= attack
      battleLog.push(`${them.titleisedName} hits ${you.titleisedName} for ${attack}!`)
    }
    yourGo = !yourGo
  }

  if (yourCritter.healthPoints <= 0) {
    battleLog.push(`${them.titleisedName} wins!`)
  } else {
    battleLog.push(`${you.titleisedName} wins!`)
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
          <small>(HP: {you.critter.healthPoints}, CP: {you.critter.combatPoints})</small>
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
          <small>(HP: {them.critter.healthPoints}, CP: {them.critter.combatPoints})</small>
        </div>
      </FightIntro>
      <FightScreen>
        {battleLog.map((logItem, i) => (
          <p key={i}>{logItem}</p>
        ))}
      </FightScreen>

    </StyledBattleUI>
  )
}

export default BattleUI

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
  width: calc(100% - 4rem);
  display: flex;
  height: calc(${({ scaling }) => 100 * scaling}vh - 7rem - 100px);
  position: absolute;
  top: 0;
  margin: 1rem;
  background: rgba(40, 40, 40, 0.75);
  border: 1px solid black;
  padding: 1rem;
  color: white;
  font-weight: bold;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
  p {
    margin: 0;
  }
  h2 {
    margin-bottom: 0.5rem;
  }
`

const FightIntro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    text-align: center;
    padding: 1rem;
  }
  small {
    font-size: 0.6rem;
  }
`

const FightScreen = styled.div`
  p {
    font-size: 1rem;
    margin: 0.5rem;
  }
`

const CritterIcon = styled.div`
  font-size: 6rem;
  position: relative;
  margin-bottom: 0.5rem;
  .type {
    position: absolute;
    font-size: 2rem;
    bottom: 0;
    right: 0;
  }
`
