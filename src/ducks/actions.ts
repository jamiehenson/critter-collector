const Actions = {
  UPDATE_PLAYER_POSITION: "UPDATE_PLAYER_POSITION"
};

const updatePlayerPosition = task => ({
  type: Actions.UPDATE_PLAYER_POSITION,
  payload: task
});

export default {
  updatePlayerPosition,
  Actions
};