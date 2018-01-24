import { GET_TODOS, REMOVE_TODO, ADD_TODO  } from '../actions/types';

let initialState = {
  todos: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_TODOS:
      console.log('GET_TODOS', action.payload);
      // newTodos = newTodos.concat(...action.payload.todos);  
      return { todos: action.payload.todos};

    case ADD_TODO: 
      console.log('ADD_TODO', action.payload);
      let newAddTodo = state.todos.slice();

      return state;
      
    case REMOVE_TODO:
      let newTodos = state.todos.slice();
      newTodos.filter(todo => todo._id !== action.payload.id);
      console.log('DELETE_TODOS', newTodos);
      
      return state;
    default:
      return state;
  }
}