import React from 'react';
import styled from "styled-components"
import { Provider as ReduxProvider } from "react-redux";

import configureStore from "./ducks/store";
import World from "./World"
import theme from "./utils/theme"

const cellRowSize: number = 9
const worldSize: number = 27
const initialState = {
  world: {
    worldSize: worldSize,
    cellRowSize: cellRowSize,
    cellSize: 100.0 / cellRowSize,
    edgeCellPosition: Math.floor(cellRowSize / 2),
    critterMaxPopulation: 10,
    sandEdgeCells: 2,
    critters: [],
    critterCounter: 1
  },
  player: {
    position: { x: Math.floor(Math.random() * worldSize), y: Math.floor(Math.random() * worldSize) },
    direction: "down",
    critters: [],
    nearbyCritters: [],
    battle: { active: false, combatant: null }
  },
  ui: {
    scalingFactor: 0.8,
    gameState: "menu"
  }
};

const reduxStore = configureStore(initialState);

const App: React.FC = () => {
  return (
    <ReduxProvider store={reduxStore}>
      <StyledApp>
        <DecorativeWrapper />
        <World />
        <div className="title">
          <span className="critter">Critter</span>
          <span className="collector">
            <span style={{ color: "pink" }}>C</span>
            <span style={{ color: "cyan" }}>o</span>
            <span style={{ color: "purple" }}>l</span>
            <span style={{ color: "gold" }}>l</span>
            <span style={{ color: "green" }}>e</span>
            <span style={{ color: "red" }}>c</span>
            <span style={{ color: "yellow" }}>t</span>
            <span style={{ color: "orange" }}>o</span>
            <span style={{ color: "blue" }}>r</span>
          </span>
        </div>
      </StyledApp>
    </ReduxProvider>
  );
}

const StyledApp = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${theme.colours.grey};
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  .title {
    color: white;
    height: 4.5vh;
    text-transform: uppercase;
    position: relative;
    text-shadow: 0 0 2px black;
    margin: -6.2vh 0 0;
    background: ${theme.colours.grey};
    width: calc(${initialState.ui.scalingFactor * 100}vh + 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1vh 0 2vh;
    border-radius: 5px;
    > span:last-child {
      margin-left: 2vh;
    }
  }
  .critter {
    font-family: "Gill Sans", "Press Start 2P", sans-serif;
    font-style: italic;
    font-size: 4vh;
  }
  .collector {
    font-family: "Comic Sans MS", "Press Start 2P", sans-serif;
    font-size: 3.5vh;
  }
`

const DecorativeWrapper = styled.div`
  position: absolute;
  height: 99vh;
  width: 95vh;
  background: ${theme.colours.purple};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-top: 1vh;
`

export default App;
