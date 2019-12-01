const Actions = {
  UPDATE_PLAYER_POSITION: "UPDATE_PLAYER_POSITION",
  ADD_CRITTER_TO_WORLD: "ADD_CRITTER_TO_WORLD",
  ADD_CRITTER_TO_PLAYER: "ADD_CRITTER_TO_PLAYER"
};

export const updatePlayerPosition = key => ({
  type: Actions.UPDATE_PLAYER_POSITION,
  payload: key
});

export const addCritterToWorld = () => ({
  type: Actions.ADD_CRITTER_TO_WORLD
})

export const addCritterToPlayer = (critterId?) => ({
  type: Actions.ADD_CRITTER_TO_PLAYER,
  payload: critterId
})

export default {
  updatePlayerPosition,
  addCritterToWorld,
  addCritterToPlayer,
  Actions
};