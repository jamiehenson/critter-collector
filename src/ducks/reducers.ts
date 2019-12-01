import ACTIONS from "./actions";
import allCritters from "../utils/critters";

const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.Actions.UPDATE_PLAYER_POSITION: {
      const key = action.payload;
      let { position, direction } = state.player
      const { worldSize, critters } = state.world

      const obstructions = {
        up: critters.find((critter) => critter.position.x === position.x && critter.position.y === position.y - 1),
        down: critters.find((critter) => critter.position.x === position.x && critter.position.y === position.y + 1),
        left: critters.find((critter) => critter.position.y === position.y && critter.position.x === position.x - 1),
        right: critters.find((critter) => critter.position.y === position.y && critter.position.x === position.x + 1)
      }

      if (["w", "ArrowUp", "87", "38"].includes(key)) {
        if (!obstructions.up) {
          position = { x: position.x, y: Math.max(position.y - 1, 0) };
        }
        direction = "up";
      } else if (["s", "ArrowDown", "83", "40"].includes(key)) {
        if (!obstructions.down) {
          position = { x: position.x, y: Math.min(position.y + 1, worldSize - 1) };
        }
        direction = "down";
      } else if (["a", "ArrowLeft", "65", "37"].includes(key)) {
        if (!obstructions.left) {
          position = { x: Math.max(position.x - 1, 0), y: position.y };
        }
        direction = "left";
      } else if (["d", "ArrowRight", "68", "39"].includes(key)) {
        if (!obstructions.right) {
          position = { x: Math.min(position.x + 1, worldSize - 1), y: position.y };
        }
        direction = "right";
      }

      const nearbyCritters = critters.filter((critter) => {
        return Math.abs((position as any).x - critter.position.x) <= 2 &&
          Math.abs((position as any).y - critter.position.y) <= 2
      })

      return Object.assign({}, state, { player: { ...state.player, position, direction, nearbyCritters } });
    }
    case ACTIONS.Actions.ADD_CRITTER_TO_WORLD: {
      const xPos = Math.floor(Math.random() * state.world.worldSize)
      const yPos = Math.floor(Math.random() * state.world.worldSize)
      const newCritters = state.world.critters
      let randomCritter = Object.assign({}, allCritters[Math.floor(Math.random() * allCritters.length)], { position: { x: xPos, y: yPos } })
      newCritters.push(randomCritter)
      return Object.assign({}, state, { world: { ...state.world, critters: newCritters } })
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