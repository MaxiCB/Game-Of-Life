import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { reducer } from "./reducers";

const rootReducer = combineReducers({
  app: reducer,
});

export type AppState = ReturnType<typeof reducer>;

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));

  return store;
}
