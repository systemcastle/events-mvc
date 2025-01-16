import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import eventsReducer from "./Events/Events.reducer";
import authReducer from "./Auth/auth.reducer";
import athletesReducers from "./Athlete/Athlete.reducer";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const reducers = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  athletes:athletesReducers
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
