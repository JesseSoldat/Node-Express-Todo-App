import axios from 'axios';
import { REGISTER_USER, LOGIN_USER, GET_USER, LOGOUT_USER, GET_TODOS, REMOVE_TODO, ADD_TODO } from './types';

//USER---------------------------------------------------------------
export const registerUser = (user) => async (dispatch) => {
  const res = await axios.post('/users', { email: user.email, password: user.password});

  const userObj = {
    xauth: res.data.tokens[0].token,
    uid: res.data._id
  }
  localStorage.setItem('user', JSON.stringify(userObj));
  dispatch({ type: REGISTER_USER, payload: userObj });
}

export const loginUser = (user) => async (dispatch) => {
  const res = await axios.post('/users/login', { email: user.email, password: user.password });

  const userObj = {
    xauth: res.data.tokens[0].token,
    uid: res.data._id
  }
  localStorage.setItem('user', JSON.stringify(userObj));
  dispatch({ type: LOGIN_USER, payload: userObj });
}

export const getUser = (auth) => async (dispatch) => {
  const res = await axios.request('GET', {
    url: '/users/me',
    headers: { 'x-auth': auth }
  });
  dispatch({ type: GET_USER, payload: res.data});
}

export const logoutUser = (auth) => async (dispatch) => {
  await axios.request('POST', {
    url: '/users/me/token',
    headers: { 'x-auth': auth }
  });
  dispatch({ type: LOGOUT_USER })
}

//TODO---------------------------------------------------------------
export const getTodos = (auth) => async (dispatch) => {
  let res = await axios.request('GET', {
    url: '/todos',
    headers: { 'x-auth': auth }
  });
  dispatch({ type: GET_TODOS, payload: res.data });
}

export const addTodo = (text, auth) => async (dispatch) => {
  // console.log(text, auth);

  let config = {
    headers: { 'x-auth': auth }
  };

  let res = await axios.post('/todos', {text}, config);
  // axios.post('/save', { firstName: 'Marlon' }, config);
  dispatch({ type: ADD_TODO, payload: res.data });
}

export const removeTodo = (id, auth) => async (dispatch) => {
  await axios.delete(`/todos/${id}`, {
    headers: { 'x-auth': auth}
  });

  dispatch({ type: REMOVE_TODO, payload: id})
}