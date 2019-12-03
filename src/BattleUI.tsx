import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"

import { UIProps } from "./UI"
import { addCritterToPlayer, advanceFromBattle, removeCritterFromWorld } from "./ducks/actions"
import { typeModifiers } from "./utils/critters"
import theme from "./utils/theme"

type StyledBattleUIProps = {
  scaling: number
}

interface BattleUIProps extends UIProps {
  addCritterToPlayer: Function,
  advanceFromBattle: Function,
  removeCritterFromWorld: Function
}

const BattleUI: React.FC<BattleUIProps> = ({ ui, player, addCritterToPlayer, removeCritterFromWorld, advanceFromBattle }) => {
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

  while (yourCritter.healthPoints * yourCritter.level > 0 && theirCritter.healthPoints * theirCritter.level > 0) {
    if (yourGo) {
      const attack = yourCritter.combatPoints * typeModifiers[yourCritter.type][theirCritter.type] * yourCritter.level
      theirCritter.healthPoints = Math.max(theirCritter.healthPoints - attack, 0)
      battleLog.push(`${you.titleisedName} hits ${them.titleisedName} for (${yourCritter.combatPoints * yourCritter.level} x ${typeModifiers[yourCritter.type][theirCritter.type]}) ${attack}!`)
    } else {
      const attack = theirCritter.combatPoints * typeModifiers[theirCritter.type][yourCritter.type] * theirCritter.level
      yourCritter.healthPoints = Math.max(yourCritter.healthPoints - attack, 0)
      battleLog.push(`${them.titleisedName} hits ${you.titleisedName} for (${theirCritter.combatPoints * theirCritter.level} x ${typeModifiers[theirCritter.type][yourCritter.type]}) ${attack}!`)
    }
    yourGo = !yourGo
  }

  if (yourCritter.healthPoints === 0) {
    battleLog.push(`${them.titleisedName} wins! ${you.titleisedName} faints.`)
  } else {
    if (!player.critters.find((critter) => critter.id === them.critter.id)) {
      addCritterToPlayer(them.critter)
      removeCritterFromWorld(them.critter)
    }
    battleLog.push(`${you.titleisedName} wins! ${them.titleisedName} caught.`)
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
        {battleLog.map((logItem, i) => (
          <p key={i}>{logItem}</p>
        ))}
      </FightScreen>
      <button onClick={() => advanceFromBattle()}>Advance</button>
    </StyledBattleUI>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addCritterToPlayer: (critter) => dispatch(addCritterToPlayer(critter)),
  removeCritterFromWorld: (critter) => dispatch(removeCritterFromWorld(critter)),
  advanceFromBattle: () => dispatch(advanceFromBattle())
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
  width: calc(100% - 4rem);
  display: flex;
  height: calc(${({ scaling }) => 100 * scaling}vh - 7rem - 150px);
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
  text-shadow: 0 0 2px black;
  p {
    margin: 0;
  }
  h2 {
    margin: 0;
  }
  button {
    -webkit-appearance: none;
    padding: 0.5rem 1.5rem;
    background: black;
    border: 0;
    margin: 0.5rem;
    color: white;
    font-size: 1rem;
    border-radius: 5px;
    text-transform: uppercase;
    font-family: 'Press Start 2P', sans-serif;
    cursor: pointer;
    &:hover {
      background: ${theme.colours.grey};
    }
  }
`

const FightIntro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  > div {
    text-align: center;
    padding: 1rem;
  }
  small {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.6rem;
  }
`

const FightScreen = styled.div`
  width: 100%;
  height: 200px;
  overflow-y: auto;
  background: rgba(40, 40, 40, 0.75);
  margin-top: 1rem;
  p {
    font-size: 0.8rem;
    margin: 0.5rem;
  }
`

const CritterIcon = styled.div`
  font-size: 6rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  width: 6rem;
  height: 6rem;
  border-radius: 5px;
  .type {
    position: absolute;
    font-size: 2rem;
    bottom: 0;
    right: 0;
  }
`
