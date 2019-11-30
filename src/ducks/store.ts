import { createStore } from "redux";

import reducer from "./reducers";

type ReduxWindow = (typeof window) & {
  __REDUX_DEVTOOLS_EXTENSION__: Function;
}

export default function configureStore(initialState?) {
  const store = createStore(reducer, initialState, (window as ReduxWindow).__REDUX_DEVTOOLS_EXTENSION__ && (window as ReduxWindow).__REDUX_DEVTOOLS_EXTENSION__());
  return store;
}