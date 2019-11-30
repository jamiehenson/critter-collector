const Actions = {
  UPDATE_CHARACTER_POSITION: "UPDATE_CHARACTER_POSITION"
};

const updateCharacterPosition = task => ({
  type: Actions.UPDATE_CHARACTER_POSITION,
  payload: task
});

export default {
  updateCharacterPosition,
  Actions
};