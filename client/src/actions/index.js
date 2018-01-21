import axios from 'axios';
import { REGISTER_USER, LOGIN_USER } from './types';

export const registerUser = (user) => async (dispatch) => {
  const res = await axios.post('/users', { email: user.email, password: user.password});
  localStorage.setItem('user', JSON.stringify(res.data));
  dispatch({ type: REGISTER_USER, payload: res.data });
}

export const loginUser = (user) => async (dispatch) => {
  const res = await axios.post('/users/login', { email: user.email, password: user.password });
  localStorage.setItem('user', JSON.stringify(res.data));
  dispatch({ type: LOGIN_USER, payload: res.data });
}