import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const loggerMiddleware = store => next => action => {
  console.group(action.type);

  console.info(action);
  console.log(action.type);

  console.groupEnd();
  return next(action);
};

const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [...getDefaultMiddleware(), loggerMiddleware]
});

export default store;
