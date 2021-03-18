import axios from "axios";

import {
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

axios.defaults.baseURL = "http://localhost:3004";

const fetchTodos = () => async dispatch => {
  dispatch(fetchTodosRequested());
  try {
    const { data } = await axios.get("/todos");
    dispatch(fetchTodosSuccess(data));
  } catch (errors) {
    dispatch(fetchTodosFailure(errors));
  }
};

const deleteTodo = id => async dispatch => {
  dispatch(removeTodoRequested());
  try {
    await axios.delete(`/todos/${id}`);
    dispatch(removeTodoSuccess(id));
  } catch (errors) {
    dispatch(removeTodoFailure(errors));
  }
};

const addTodo = label => async dispatch => {
  dispatch(addTodoRequested());
  try {
    const { data } = await axios.post(`/todos`, { label });
    dispatch(addTodoSuccess(data));
  } catch (errors) {
    dispatch(addTodoFailure(errors));
  }
};

export { fetchTodos, deleteTodo, addTodo };
