import { REGISTER_USER, LOGIN_USER, GET_USER, LOGOUT_USER } from '../actions/types';

let initialState = {
  xauth: null,
  uid: null
}

let user = JSON.parse(localStorage.getItem('user'));

if(user && user.xauth !== null) {
  initialState = {
    xauth: user.xauth,
    uid: user.uid
  }
}

export default function(state = initialState, action) {
  let newState;

  switch(action.type) {
    case REGISTER_USER:
      console.log('REGISER reducer', action);

      newState = Object.assign({}, state, action.payload);
      return newState;

    case LOGIN_USER:
      console.log('LOGIN reducer', action);
    
      newState = Object.assign({}, state, action.payload);
      return newState;  

    case LOGOUT_USER:
      console.log('LOGOUT reducer');

      initialState = { xauth: null, uid: null };
      localStorage.setItem('user', JSON.stringify(initialState));
      return initialState;

    case GET_USER:
      console.log('GET_USER', action.payload);
      newState = Object.assign({}, state);
      return newState;  

    default:
      // console.log('INITIAL STATE', state);
      return state;
  }
}