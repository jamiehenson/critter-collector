const Actions = {
  UPDATE_PLAYER_POSITION: "UPDATE_PLAYER_POSITION",
  ADD_CRITTER: "ADD_CRITTER"
};

export const updatePlayerPosition = key => ({
  type: Actions.UPDATE_PLAYER_POSITION,
  payload: key
});

export const addCritter = () => ({
  type: Actions.ADD_CRITTER
})

export default {
  updatePlayerPosition,
  addCritter,
  Actions
};