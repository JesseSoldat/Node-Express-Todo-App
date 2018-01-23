import axios from 'axios';
import { REGISTER_USER, LOGIN_USER, GET_USER, LOGOUT_USER } from './types';

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

  const res = await axios.request('POST', {
    url: '/users/me/token',
    headers: { 'x-auth': auth }
  });
  dispatch({ type: LOGOUT_USER })
}