const Actions = {
  UPDATE_PLAYER_POSITION: "UPDATE_PLAYER_POSITION",
  ADD_CRITTER_TO_WORLD: "ADD_CRITTER_TO_WORLD",
  ADD_CRITTER_TO_PLAYER: "ADD_CRITTER_TO_PLAYER",
  ADVANCE_FROM_BATTLE: "ADVANCE_FROM_BATTLE",
  REMOVE_CRITTER_FROM_WORLD: "REMOVE_CRITTER_FROM_WORLD"
};

export const updatePlayerPosition = key => ({
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

export default {
  updatePlayerPosition,
  addCritterToWorld,
  addCritterToPlayer,
  removeCritterFromWorld,
  Actions
};