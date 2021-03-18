import { combineReducers, createReducer, nanoid } from "@reduxjs/toolkit";
import {
  // addToDo,
  // removeToDo,
  filterChange,
  fetchTodosRequested,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequested,
  addTodoSuccess,
  addTodoFailure,
  removeTodoRequested,
  removeTodoSuccess,
  removeTodoFailure
} from "./todosActions";

const loading = createReducer(false, {
  [fetchTodosRequested]: () => true,
  [fetchTodosSuccess]: () => false,
  [fetchTodosFailure]: () => false,
  [addTodoRequested]: () => true,
  [addTodoSuccess]: () => false,
  [addTodoFailure]: () => false,
  [removeTodoRequested]: () => true,
  [removeTodoSuccess]: () => false,
  [removeTodoFailure]: () => false
});

const items = createReducer([], {
  [fetchTodosSuccess]: (_, { payload }) => payload,
  [addTodoSuccess]: (state, { payload }) => [...state, payload],
  [removeTodoSuccess]: (state, { payload }) => {
    const index = state.findIndex(({ id }) => id === Number(payload));
    // return state.filter(item => item.id !== payload)
    return [...state.slice(0, index), ...state.slice(index + 1)];
  }
});

const handleError = (_, { payload }) => payload.response.data;
const clearError = () => null;

const error = createReducer(null, {
  [fetchTodosRequested]: clearError,
  [fetchTodosFailure]: handleError,
  [addTodoRequested]: clearError,
  [addTodoFailure]: handleError,
  [removeTodoRequested]: clearError,
  [removeTodoFailure]: handleError
});

const filterReducer = createReducer("", {
  [filterChange]: (_, { payload }) => payload
});

const todosReducer = combineReducers({
  items,
  loading,
  error,
  filter: filterReducer
});

export default todosReducer;
