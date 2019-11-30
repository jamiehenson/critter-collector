import ACTIONS from "./actions";

const cellRowSize: number = 9

const defaultState = {
  world: {
    worldSize: 27,
    cellRowSize: cellRowSize,
    cellSize: 100.0 / cellRowSize,
    edgeCellPosition: Math.floor(cellRowSize / 2)
  },
  player: {
    position: { x: 4, y: 4 }
  }
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Actions.UPDATE_PLAYER_POSITION: {
      const key = action.payload;
      const { x, y } = state.player.position
      const { worldSize } = state.world
      let newState = {}

      if (["w", "ArrowUp", "87", "38"].includes(key)) {
        newState = { x: x, y: Math.max(y - 1, 0) };
      } else if (["s", "ArrowDown", "83", "40"].includes(key)) {
        newState = { x: x, y: Math.min(y + 1, worldSize - 1) };
      } else if (["a", "ArrowLeft", "65", "37"].includes(key)) {
        newState = { x: Math.max(x - 1, 0), y: y };
      } else if (["d", "ArrowRight", "68", "39"].includes(key)) {
        newState = { x: Math.min(x + 1, worldSize - 1), y: y };
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