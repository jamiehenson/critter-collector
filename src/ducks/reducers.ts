import ACTIONS from "./actions";

const defaultState = {
  characterPosition: { x: 7, y: 7 }
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Actions.UPDATE_CHARACTER_POSITION: {
      console.log(action);
      let coordinates = action.payload;
      state.characterPosition = coordinates;
      return state;
    }

    default:
      return state;
  }
};

export default gameReducer;