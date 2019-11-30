import React from 'react';
import styled from "styled-components"
import { Provider as ReduxProvider } from "react-redux";

import configureStore from "./ducks/store";
import World from "./World"

const reduxStore = configureStore();

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
`

export default App;
