import ACTIONS from "./actions";

const defaultState = {
  player: {
    position: { x: 4, y: 4 }
  }
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Actions.UPDATE_PLAYER_POSITION: {
      const key = action.payload;
      const { x, y } = state.player.position
      let newState = {}

      if (["w", "ArrowUp", "87", "38"].includes(key)) {
        newState = { x: x, y: y - 1 };
      } else if (["s", "ArrowDown", "83", "40"].includes(key)) {
        newState = { x: x, y: y + 1 };
      } else if (["a", "ArrowLeft", "65", "37"].includes(key)) {
        newState = { x: x - 1, y: y };
      } else if (["d", "ArrowRight", "68", "39"].includes(key)) {
        newState = { x: x + 1, y: y };
      }

      if (newState) {
        return Object.assign({}, state, { player: { position: newState } });
      } else {
        return state
      }
    }

    default:
      return state;
  }
};

export default gameReducer;