import ACTIONS from "./actions";
import allCritters from "../utils/critters";

const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.Actions.UPDATE_PLAYER_POSITION: {
      const key = action.payload;
      const { x, y } = state.player.position
      const { worldSize } = state.world
      let position = {}
      let direction = ""

      if (["w", "ArrowUp", "87", "38"].includes(key)) {
        position = { x: x, y: Math.max(y - 1, 0) };
        direction = "up"
      } else if (["s", "ArrowDown", "83", "40"].includes(key)) {
        position = { x: x, y: Math.min(y + 1, worldSize - 1) };
        direction = "down"
      } else if (["a", "ArrowLeft", "65", "37"].includes(key)) {
        position = { x: Math.max(x - 1, 0), y: y };
        direction = "left"
      } else if (["d", "ArrowRight", "68", "39"].includes(key)) {
        position = { x: Math.min(x + 1, worldSize - 1), y: y };
        direction = "right"
      }

      if (Object.keys(position).length > 0) {
        return Object.assign({}, state, { player: { ...state.player, position, direction } });
      } else {
        return state
      }
    }
    case ACTIONS.Actions.ADD_CRITTER_TO_WORLD: {
      const xPos = Math.floor(Math.random() * state.world.worldSize)
      const yPos = Math.floor(Math.random() * state.world.worldSize)
      const newCritters = state.critters
      let randomCritter = Object.assign({}, allCritters[Math.floor(Math.random() * allCritters.length)], { position: { x: xPos, y: yPos } })
      newCritters.push(randomCritter)
      return Object.assign({}, state, { critters: newCritters })
    }
    case ACTIONS.Actions.ADD_CRITTER_TO_PLAYER: {
      const newCritters = state.player.critters

      if (action.payload) {
        const critterMatch = allCritters.find((critter) => critter.id === action.payload.critterID)
        newCritters.push(critterMatch)
      } else {
        newCritters.push(allCritters[Math.floor(Math.random() * allCritters.length)])
      }

      return Object.assign({}, state, { player: { ...state.player, critters: newCritters } })
    }
    default:
      return state;
  }
};

export default gameReducer;