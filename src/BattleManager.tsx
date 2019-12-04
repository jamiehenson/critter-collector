import React, { useEffect } from "react"
import { connect } from "react-redux"

import { titleise } from "./UI"
import { typeModifiers } from "./utils/critters"
import { BattleType } from "./utils/types"
import { increaseCritterLevel, addCritterToPlayer, removeCritterFromWorld, updateActiveCritterFighter, updateBattleStatus } from "./ducks/actions"

const BattleManager: React.FC<BattleType> = ({ player, updateActiveCritterFighter, addCritterToPlayer, removeCritterFromWorld, increaseCritterLevel, updateBattleStatus }) => {
  const methods = { updateActiveCritterFighter, addCritterToPlayer, removeCritterFromWorld, increaseCritterLevel, updateBattleStatus }

  useEffect(() => computeBattle(player, methods), [methods, player])

  return null
}

const computeBattle = (player, methods) => {
  const { battle, battle: { fighter, opponent } } = player
  const { updateActiveCritterFighter, addCritterToPlayer, removeCritterFromWorld, increaseCritterLevel, updateBattleStatus } = methods
  const newBattle = { ...battle, log: [] }
  let yourGo: boolean = true

  while (fighter.healthPoints * fighter.level > 0 && opponent.healthPoints * opponent.level > 0) {
    if (yourGo) {
      const attack = fighter.combatPoints * typeModifiers[fighter.type][opponent.type] * fighter.level
      newBattle.log.push(`Your ${titleise(fighter.name)} hits ${titleise(opponent.name)} for (${fighter.combatPoints * fighter.level} x ${typeModifiers[fighter.type][opponent.type]}) ${attack}!`)
      opponent.healthPoints = Math.max(opponent.healthPoints - attack, 0)
    } else {
      const attack = opponent.combatPoints * typeModifiers[opponent.type][fighter.type] * opponent.level
      newBattle.log.push(`${titleise(opponent.name)} hits your ${titleise(fighter.name)} for (${opponent.combatPoints * opponent.level} x ${typeModifiers[opponent.type][fighter.type]}) ${attack}!`)
      fighter.healthPoints = Math.max(fighter.healthPoints - attack, 0)
    }
    yourGo = !yourGo
  }

  if (battle.log.length === 0) {
    console.log(newBattle.log, battle.log)
    if (fighter.healthPoints === 0) {
      newBattle.log.push(`${titleise(opponent.name)} wins! Your ${titleise(fighter.name)} faints.`)
      const aliveCritters = [...player.critters.filter((critter) => critter.healthPoints > 0)]
      if (aliveCritters.length > 0) {
        const randomAliveCritter = aliveCritters[Math.floor(Math.random() * aliveCritters.length)]
        newBattle.log.push(`Go ${randomAliveCritter.name}!`)
        updateActiveCritterFighter(randomAliveCritter)
        newBattle.fighter = randomAliveCritter
      } else {
        newBattle.log.push("All critters have fainted!")
      }
    } else {
      if (!player.critters.find((critter) => critter.id === opponent.id)) {
        addCritterToPlayer(opponent)
        removeCritterFromWorld(opponent)
      }
      let levelText = ""
      if (Math.random() >= 0.5) {
        increaseCritterLevel(fighter)
        levelText = ` They level up to Lv. ${fighter.level}.`
      }
      newBattle.log.push(`Your ${titleise(fighter.name)} wins! ${titleise(opponent.name)} caught.` + levelText)
    }
    updateBattleStatus(newBattle)
  }
}

export default connect(
  (state) => ({ player: state.player }),
  (dispatch) => ({
    updateActiveCritterFighter: (critter) => dispatch(updateActiveCritterFighter(critter)),
    addCritterToPlayer: (critter) => dispatch(addCritterToPlayer(critter)),
    removeCritterFromWorld: (critter) => dispatch(removeCritterFromWorld(critter)),
    increaseCritterLevel: (critter) => dispatch(increaseCritterLevel(critter)),
    updateBattleStatus: (battle) => dispatch(updateBattleStatus(battle))
  }))(BattleManager)