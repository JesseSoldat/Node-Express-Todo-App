import { GET_TODOS, REMOVE_TODO, ADD_TODO, UPDATE_TODO  } from '../actions/types';

let initialState = {
  todos: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_TODOS:
      console.log('GET_TODOS', action.payload); 
      return { todos: action.payload.todos.reverse()};

    case ADD_TODO: 
      console.log('ADD_TODO', action.payload);
      let newAddTodo = state.todos.slice();
      newAddTodo.unshift(action.payload);
      return {todos: newAddTodo};

    case REMOVE_TODO:
      console.log('REMOVE_TODO', action.payload);    
      let newTodos = state.todos.slice();
      newTodos = newTodos.filter(todo => todo._id !== action.payload);
      return {todos: newTodos};

    case UPDATE_TODO: 
      console.log('UPDATE_TODO', action.payload);
      
      return state;

    default:
      return state;
  }
}