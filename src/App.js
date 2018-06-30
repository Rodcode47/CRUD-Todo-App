import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import giphy from './giphy.gif';
import './App.css';

import ListItem from './ListItem';

class App extends Component {

  constructor() {
    super();
    this.state = {

      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [],
      loading: true
    };

    this.apiUrl = 'https://5b377ab46223c4001460586c.mockapi.io';
    this.alertTodo = this.alertTodo.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  async componentDidMount(){
    const response = await axios.get(`${this.apiUrl}/todos`);
    
    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      });
    }, 1000);
  }

  handlerChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  }

  async addTodo(){
    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;
    todos.push(response.data);

    this.setState({
      todos: todos,
      newTodo: ''
    });

    this.alertTodo('Todo added successfully')
  }

  editTodo(index) {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }

  async updateTodo(){
    const todo = this.state.todos[this.state.editingIndex];
    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;
      todos[this.state.editingIndex] = response.data;
      this.setState({ todos, editing: false, editingIndex: null, newTodo: '' 
    });
    this.alertTodo('Todo updated successfully')
  }

  alertTodo(notification) {
    this.setState({ notification });
    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 3000);
  }

  async deleteTodo(index) {
    const todos = this.state.todos;
    const todo = todos[index];
      await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
      delete todos[index];

      this.setState({ todos });
      this.alertTodo('Todo deleted successfully')
  };

  render() {
    console.log(this.state.newTodo);
    return (
      <div className="App">
        <header className="App-header shadow p-3 mb-3">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Todo</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="container-fluid mb-3">
          {
            this.state.notification &&
            <div className="alert alert-warning alert-dismissible fade show">
              <strong>Holy guacamole!</strong> {this.state.notification}
            </div>
          }
          <div className="card shadow p-3 mb-5 bg-white rounded">
          <h3 className="text-center text-info"><b>Todos App</b></h3>
            <div className="card-body">
              <input 
                type="text"
                name="todo"
                className="form-control mb-3"
                placeholder="Add a new todo"
                onChange={this.handlerChange}
                value={this.state.newTodo}
              />
              <button 
                onClick={this.state.editing ? this.updateTodo : this.addTodo}
                title="Add a new Or Edit Todo"
                className="btn btn-outline-success btn-sm form-control mb-3"
                disabled={this.state.newTodo.length < 5}
                > 
                 {this.state.editing ? 'Update Todo' : 'Add Todo'}
              </button>

              {
                this.state.loading &&
                <img className="loader" src={giphy} alt="Loading Todos" />
              }

              {
                (!this.state.editing || this.state.loading) &&
                <ul className="list-group">
                  {this.state.todos.map((item, index) => {
                    return <ListItem
                    key={item.id}
                    item={item}
                    editTodo={() => {this.editTodo(index); }}
                    deleteTodo={() => {this.deleteTodo(index); }}
                  />;
                  })}
                </ul>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
