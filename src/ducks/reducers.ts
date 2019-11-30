import ACTIONS from "./actions";

const defaultState = {
  player: {
    position: { x: 7, y: 7 }
  }
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Actions.UPDATE_PLAYER_POSITION: {
      let coordinates = action.payload;
      state.player.position = coordinates;
      return state;
    }

    default:
      return state;
  }
};

export default gameReducer;