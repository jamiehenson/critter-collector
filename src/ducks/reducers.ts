import ACTIONS from "./actions";
import allCritters from "../utils/critters";

const gameReducer = (state, action) => {
  switch (action.type) {
    // Handler to update player position, detect adjacent obstructions and detect nearby critters/clinic
    case ACTIONS.Actions.UPDATE_PLAYER_POSITION: {
      const key = action.payload;
      let { position, direction, battle, critters: playerCritters } = state.player
      const { worldSize, critters, clinic } = state.world

      if (state.ui.gameState !== "play" || battle.active) { return state; }

      // Move player if there are no adjacent obstructions
      const checkObstruction = (axis, polarity) => {
        const perpendicularAxis = axis === "x" ? "y" : "x"
        const critterPresence = critters.find((critter) => (
          critter.position[perpendicularAxis] === position[perpendicularAxis] && critter.position[axis] === position[axis] - polarity
        ))
        const clinicPresence = position[perpendicularAxis] === clinic[perpendicularAxis] && position[axis] === clinic[axis] - polarity
        return critterPresence || clinicPresence
      }

      // This object contains the results of the above method with different axes and polarities, checking for critters and clinics in those cells
      // by cross-referencing coordinate values
      const obstructions = {
        up: checkObstruction("y", -1),
        down: checkObstruction("y", 1),
        left: checkObstruction("x", -1),
        right: checkObstruction("x", 1)
      }

      if (key) {
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
      }

      // Detection of critter proximity
      const nearbyCritters = critters.filter((critter) => {
        const xDiff = Math.abs((position as any).x - critter.position.x)
        const yDiff = Math.abs((position as any).y - critter.position.y)
        const fighter = playerCritters.find((critter) => critter.activeFighter)
        if (xDiff <= 1 && yDiff <= 1) {
          battle = {
            ...battle,
            active: true,
            opponent: critter,
            log: [],
            fighter: fighter,
            initialFighter: fighter,
            paused: true
          }
          return true
        } else if (xDiff <= 2 && yDiff <= 2) {
          battle.active = false
          return true
        }
        return false
      })

      // Clinic health recharging
      const xDiffToClinic = Math.abs((position as any).x - clinic.x)
      const yDiffToClinic = Math.abs((position as any).y - clinic.y)
      const nearToClinic = xDiffToClinic <= 1 && yDiffToClinic <= 1
      const newCritters = nearToClinic ? [...playerCritters].map((critter) => ({ ...critter, healthPoints: critter.fullHealthPoints })) : playerCritters

      const newState = {
        player: { ...state.player, position, direction, nearbyCritters, battle, critters: newCritters },
        ui: { ...state.ui, clinic: nearToClinic }
      }

      return Object.assign({}, state, newState);
    }

    // Adds a random critter to the world in a random location with random bounded stats
    case ACTIONS.Actions.ADD_CRITTER_TO_WORLD: {
      const { worldSize, critters, critterCounter } = state.world
      const xPos = Math.floor(Math.random() * worldSize)
      const yPos = Math.floor(Math.random() * worldSize)
      const newCritters = critters
      const newHealthPoints = Math.floor(Math.random() * 100 + 50)
      const difficultyRamp = Math.max(Math.floor(state.world.critterCounter / 5) - 2, 0)
      const newCritterState = {
        id: critterCounter,
        position: { x: xPos, y: yPos },
        healthPoints: newHealthPoints,
        fullHealthPoints: newHealthPoints,
        combatPoints: Math.floor(Math.random() * 20 + 20),
        level: Math.ceil(Math.random() * 3) + difficultyRamp
      }
      const randomCritter = Object.assign({}, allCritters[Math.floor(Math.random() * allCritters.length)], newCritterState)
      newCritters.push(randomCritter)
      return Object.assign({}, state, {
        world: { ...state.world, critterCounter: critterCounter + 1, critters: newCritters }
      })
    }

    // If there's a critter argument, add that particular critter to the player's collection, otherwise, add a random new
    // critter to the player's collection with random bounded stats (used at the game start)
    case ACTIONS.Actions.ADD_CRITTER_TO_PLAYER: {
      const newCritters = state.player.critters

      if (action.payload) {
        const critterMatch = [...state.world.critters].find((critter) => critter.id === action.payload.id)
        critterMatch.activeFighter = false
        delete critterMatch.position
        newCritters.push(critterMatch)
      } else {
        const newHealthPoints = Math.floor(Math.random() * 100 + 50)
        const newCritterState = {
          id: state.world.critterCounter,
          healthPoints: newHealthPoints,
          fullHealthPoints: newHealthPoints,
          combatPoints: Math.floor(Math.random() * 20 + 20),
          level: Math.ceil(Math.random() * 3),
          activeFighter: newCritters.length === 0
        }
        const randomCritter = Object.assign({}, allCritters[Math.floor(Math.random() * allCritters.length)], newCritterState)
        newCritters.push(randomCritter)
      }

      return Object.assign({}, state, { player: { ...state.player, critters: newCritters }, world: { ...state.world, critterCounter: state.world.critterCounter + 1 } })
    }

    // Move on from the battle, wiping the active battle state, and ending the game if all player critters are down
    case ACTIONS.Actions.ADVANCE_FROM_BATTLE: {
      if (state.player.critters.find((critter) => critter.healthPoints > 0)) {
        return Object.assign({}, state, { player: { ...state.player, battle: { active: false } } })
      } else {
        return Object.assign({}, state, { player: { ...state.player, battle: { active: false } }, ui: { ...state.ui, gameState: "end" } })
      }
    }

    // Removes a critter from the world pool and the player's nearby pool when caught by a player
    case ACTIONS.Actions.REMOVE_CRITTER_FROM_WORLD: {
      const newNearbyCritters = [...state.player.nearbyCritters]
      const newWorldCritters = [...state.world.critters]
      const nearbyCritterMatch = newNearbyCritters.find((critter) => critter.id === action.payload.id)
      const worldCritterMatch = newWorldCritters.find((critter) => critter.id === action.payload.id)
      if (worldCritterMatch && nearbyCritterMatch) {
        newNearbyCritters.splice(newNearbyCritters.indexOf(nearbyCritterMatch), 1)
        newWorldCritters.splice(newWorldCritters.indexOf(worldCritterMatch), 1)
        return Object.assign({}, state, {
          world: { ...state.world, critters: newWorldCritters },
          player: { ...state.player, nearbyCritters: newNearbyCritters }
        })
      } else {
        return state
      }
    }

    // Change a player's active fighter critter. This critter fights first in a battle
    case ACTIONS.Actions.UPDATE_ACTIVE_CRITTER_FIGHTER: {
      const newCritters = [...state.player.critters].map((critter) => ({ ...critter, activeFighter: critter.id === action.payload.id }))
      return Object.assign({}, state, { player: { ...state.player, critters: newCritters } })
    }

    // Start the game by changing the UI state
    case ACTIONS.Actions.START_GAME: {
      return Object.assign({}, state, { ui: { ...state.ui, gameState: "play" } })
    }

    // Increment a critter's level by 1
    case ACTIONS.Actions.INCREASE_CRITTER_LEVEL: {
      const newCritters = [...state.player.critters].map((critter) => {
        if (critter.id === action.payload.id) { critter.level += 1 }
        return critter
      })
      return Object.assign({}, state, { player: { ...state.player, critters: newCritters } })
    }

    // Add the clinic to a random vacant cell in the world
    case ACTIONS.Actions.ADD_CLINIC_TO_WORLD: {
      let unobstructed = true
      while (unobstructed) {
        const candidateX = Math.floor(Math.random() * state.world.worldSize)
        const candidateY = Math.floor(Math.random() * state.world.worldSize)
        const clinicState = { x: candidateX, y: candidateY }
        const critterPositionMatch = state.world.critters.find((critter) => critter.position === clinicState)
        const playerPositionMatch = state.player.position === clinicState
        if (!critterPositionMatch && !playerPositionMatch) {
          unobstructed = false
          return Object.assign({}, state, { world: { ...state.world, clinic: clinicState } })
        }
      }
      return state
    }

    // Update a player's active battle status as it progresses
    case ACTIONS.Actions.UPDATE_BATTLE_STATUS: {
      const newBattle = action.payload
      return Object.assign({}, state, { player: { ...state.player, battle: newBattle } })
    }

    // When encountering a critter, a player can either initiate the battle, unpausing the active state, or flee, which cancels
    // the battle state
    case ACTIONS.Actions.INITIATE_BATTLE: {
      return Object.assign({}, state, { player: { ...state.player, battle: { ...state.player.battle, paused: false } } })
    }
    case ACTIONS.Actions.FLEE_BATTLE: {
      return Object.assign({}, state, { player: { ...state.player, battle: { active: false } } })
    }
    default:
      return state;
  }
};

export default gameReducer;