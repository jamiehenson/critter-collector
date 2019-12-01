import React from 'react';
import styled from "styled-components"
import { Provider as ReduxProvider } from "react-redux";

import configureStore from "./ducks/store";
import World from "./World"

const cellRowSize: number = 9
const worldSize: number = 27
const initialState = {
  world: {
    worldSize: worldSize,
    cellRowSize: cellRowSize,
    cellSize: 100.0 / cellRowSize,
    edgeCellPosition: Math.floor(cellRowSize / 2),
    critterCount: 10,
    sandEdgeCells: 2
  },
  player: {
    position: { x: Math.floor(Math.random() * worldSize), y: Math.floor(Math.random() * worldSize) },
    direction: "down"
  },
  ui: {
    scalingFactor: 0.8
  },
  critters: []
};

const reduxStore = configureStore(initialState);

const App: React.FC = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <StyledApp>
        <DecorativeWrapper />
        <World />
      </StyledApp>
    </ReduxProvider>
  );
}

const StyledApp = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #333333;
  display: flex;
  justify-content: center;
  position: relative;
`

const DecorativeWrapper = styled.div`
  position: absolute;
  height: calc(100vh - 0.5rem);
  width: 95vh;
  background: #7851a9;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 0.5rem;
`

export default App;
