import React from 'react';
import styled from "styled-components"

import World from "./World"

const App: React.FC = () => {
  return (
    <StyledApp>
      <World />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
`

export default App;
