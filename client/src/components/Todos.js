import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Todos extends Component {
  state = {
    text: ''
  }

  componentDidMount() {
    this.props.getTodos(this.props.auth.xauth);
  }

  removeTodo = (id) => {
    this.props.removeTodo(id, this.props.auth.xauth);   
  }

  renderTodosList = () => {
    return this.props.todos.todos.map((todo, i) => {
      return (
        <li key={todo._id}
          className="list-group-item">
          {todo.text}
          <button type="button"
            onClick={() => this.removeTodo(todo._id)}
            className="close ml-auto"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </li>
      );
    })
  }

  handleTodoChange = (e) => {
    let text = e.target.value;
    this.setState(prevState => ({text}));
    
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let todo = this.state.text;
    this.props.addTodo(todo, this.props.auth.xauth);
  }

  render() {
   
    return (
      <div>
        <h4>Todos</h4>
        <hr/>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>New Todo</label>
            <input 
              value={this.state.text}
              onChange={this.handleTodoChange}
              className="form-control" 
            />
          </div>
        </form>
        <ul className="list-group">
          {this.renderTodosList()}
        </ul>
      </div>
    );
  }
}
function mapStateToProps({auth, todos}) {
  return { auth, todos };
}
export default connect(mapStateToProps, actions)(Todos);