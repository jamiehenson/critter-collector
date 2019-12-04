import React from 'react';
import styled from "styled-components"
import { Provider as ReduxProvider } from "react-redux";

import configureStore from "./ducks/store";
import World from "./World"
import theme from "./utils/theme"
import stripe from "./img/stripe.png"

const cellRowSize: number = 9
const worldSize: number = 27
const initialState = {
  world: {
    worldSize: worldSize, // How many cells the world is in both X and Y axes
    cellRowSize: cellRowSize, // How many cells per visible row
    cellSize: 100.0 / cellRowSize, // Portion of the viewport dedicated to each cell
    edgeCellPosition: Math.floor(cellRowSize / 2), // Used in calculating the edge bound of the world to restrict player movement
    critterMaxPopulation: 10, // The max amount of critters in the world at one time
    sandEdgeCells: 2, // How many cells on the periphery of the world are marked as edges (for sand textures)
    critters: [], // An empty set of critters in the world
    critterCounter: 0 // How many critters have ever been spawned
  },
  player: {
    position: { x: Math.floor(Math.random() * worldSize), y: Math.floor(Math.random() * worldSize) }, // Random coordinate for player spawn
    direction: "down", // Face the "camera" on start
    critters: [], // A starting player has no critters
    nearbyCritters: [], // A starting player is not by any critters, at least until computed
    battle: { active: false } // A starting player is not in a battle
  },
  ui: {
    scalingFactor: 0.8, // A scaling factor used to govern UI proportionality
    gameState: "menu" // The initial game state, renders the menu UI component
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
  background-image: url(${stripe});
  background-repeat: repeat;
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
    align-items: baseline;
    justify-content: center;
    padding: 1vh 0 1.5vh;
    border-radius: 5px;
    > span:last-child {
      margin-left: 2vh;
    }
  }
  .critter {
    font-family: "Lato", "Press Start 2P", sans-serif;
    font-style: italic;
    font-size: 3.5vh;
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
