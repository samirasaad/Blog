import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
// ======== Compose redux dev tool with applyMiddleware ========
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; // create the saga middleware


const store = createStore(rootReducer, composeEnhancers());

export default store;
