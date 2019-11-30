import ACTIONS from "./actions";
import names from "../utils/names";
import types from "../utils/types";

const gameReducer = (state, action) => {
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
    case ACTIONS.Actions.ADD_CRITTER: {
      const xPos = Math.floor(Math.random() * state.world.worldSize)
      const yPos = Math.floor(Math.random() * state.world.worldSize)
      const newCritters = state.critters
      newCritters.push({
        name: names[Math.floor(Math.random() * names.length)],
        types: types[Math.floor(Math.random() * types.length)],
        position: { x: xPos, y: yPos }
      })
      return Object.assign({}, state, { critters: newCritters })
    }
    default:
      return state;
  }
};

export default gameReducer;