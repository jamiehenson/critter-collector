const Actions = {
  UPDATE_PLAYER_POSITION: "UPDATE_PLAYER_POSITION"
};

export const updatePlayerPosition = key => ({
  type: Actions.UPDATE_PLAYER_POSITION,
  payload: key
});

export default {
  updatePlayerPosition,
  Actions
};