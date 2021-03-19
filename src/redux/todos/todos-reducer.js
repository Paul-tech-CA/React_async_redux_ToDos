import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  filterChange,
  fetchTodosFailure,
  fetchTodosSuccess,
  fetchTodosRequested,
  removeTodoRequested,
  removeTodoSuccess,
  removeTodoFailure,
  addTodoSuccess,
  addTodoRequested,
  addTodoFailure,
  toggleCompletedRequest,
  toggleCompletedSuccess,
  toggleCompletedFailure,
} from "./todos-actions";

const loading = createReducer(false, {
  [fetchTodosRequested]: () => true,
  [fetchTodosSuccess]: () => false,
  [fetchTodosFailure]: () => false,
  [addTodoRequested]: () => true,
  [addTodoSuccess]: () => false,
  [addTodoFailure]: () => false,
  [removeTodoRequested]: () => true,
  [removeTodoSuccess]: () => false,
  [removeTodoFailure]: () => false,
  [toggleCompletedRequest]: () => true,
  [toggleCompletedSuccess]: () => false,
  [toggleCompletedFailure]: () => false,
});

const items = createReducer([], {
  [fetchTodosSuccess]: (_, { payload }) => payload,
  [addTodoSuccess]: (state, { payload }) => [...state, payload],
  [removeTodoSuccess]: (state, { payload }) => {
    const index = state.findIndex(({ id }) => id === Number(payload));
    return [...state.slice(0, index), ...state.slice(index + 1)];
  },
  [toggleCompletedSuccess]: (state, { payload }) => {
    const index = state.findIndex((item) => item.id === payload.id);
    return [...state.slice(0, index), payload, ...state.slice(index + 1)];
  },
});

const handleError = (_, { payload }) => payload.response.data;
const clearError = () => null;

const error = createReducer(null, {
  [fetchTodosRequested]: clearError,
  [fetchTodosFailure]: handleError,
  [addTodoRequested]: clearError,
  [addTodoFailure]: handleError,
  [removeTodoRequested]: clearError,
  [removeTodoFailure]: handleError,
  [toggleCompletedRequest]: clearError,
  [toggleCompletedFailure]: handleError,
});

const filter = createReducer("", {
  [filterChange]: (_, { payload }) => payload,
});

const todos = combineReducers({
  items,
  loading,
  error,
  filter,
});

export default todos;
