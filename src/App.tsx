import React from 'react';
import styled from "styled-components"
import { Provider as ReduxProvider } from "react-redux";

import configureStore from "./ducks/store";
import World from "./World"

const cellRowSize: number = 9
const initialState = {
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

const reduxStore = configureStore(initialState);

const App: React.FC = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <StyledApp>
        <World />
      </StyledApp>
    </ReduxProvider>
  );
}

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  background-color: darkblue;
  display: flex;
  justify-content: center;
`

export default App;
