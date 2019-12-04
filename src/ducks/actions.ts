const Actions = {
  UPDATE_PLAYER_POSITION: "UPDATE_PLAYER_POSITION",
  ADD_CRITTER_TO_WORLD: "ADD_CRITTER_TO_WORLD",
  ADD_CRITTER_TO_PLAYER: "ADD_CRITTER_TO_PLAYER",
  ADVANCE_FROM_BATTLE: "ADVANCE_FROM_BATTLE",
  REMOVE_CRITTER_FROM_WORLD: "REMOVE_CRITTER_FROM_WORLD",
  UPDATE_ACTIVE_CRITTER_FIGHTER: "UPDATE_ACTIVE_CRITTER_FIGHTER",
  START_GAME: "START_GAME",
  INCREASE_CRITTER_LEVEL: "INCREASE_CRITTER_LEVEL",
  ADD_CLINIC_TO_WORLD: "ADD_CLINIC_TO_WORLD",
  UPDATE_BATTLE_STATUS: "UPDATE_BATTLE_STATUS",
  INITIATE_BATTLE: "INITIATE_BATTLE",
  FLEE_BATTLE: "FLEE_BATTLE"
};

export const updatePlayerPosition = (key?) => ({
  type: Actions.UPDATE_PLAYER_POSITION,
  payload: key
});

export const addCritterToWorld = () => ({
  type: Actions.ADD_CRITTER_TO_WORLD
})

export const addCritterToPlayer = (critter?) => ({
  type: Actions.ADD_CRITTER_TO_PLAYER,
  payload: critter
})

export const advanceFromBattle = () => ({
  type: Actions.ADVANCE_FROM_BATTLE
})

export const removeCritterFromWorld = (critter) => ({
  type: Actions.REMOVE_CRITTER_FROM_WORLD,
  payload: critter
})

export const updateActiveCritterFighter = (critter) => ({
  type: Actions.UPDATE_ACTIVE_CRITTER_FIGHTER,
  payload: critter
})

export const startGame = () => ({
  type: Actions.START_GAME
})

export const increaseCritterLevel = (critter) => ({
  type: Actions.INCREASE_CRITTER_LEVEL,
  payload: critter
})

export const addClinicToWorld = () => ({
  type: Actions.ADD_CLINIC_TO_WORLD
})

export const updateBattleStatus = (battle) => ({
  type: Actions.UPDATE_BATTLE_STATUS,
  payload: battle
})

export const initiateBattle = () => ({
  type: Actions.INITIATE_BATTLE
})

export const fleeBattle = () => ({
  type: Actions.FLEE_BATTLE
})

export default {
  updatePlayerPosition,
  addCritterToWorld,
  addCritterToPlayer,
  removeCritterFromWorld,
  updateActiveCritterFighter,
  startGame,
  increaseCritterLevel,
  addClinicToWorld,
  updateBattleStatus,
  initiateBattle,
  fleeBattle,
  Actions
};