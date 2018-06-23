import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';

class App extends Component {

  state={
    newTodo:'',
    editing:false,
    editingIndex: null,
    notification: null,
    Todos:[
      {id:1,
      name:'play doto'
      },
      {id:2,
      name:'play doto'
      },
      {id:3,
      name:'play doto'
      }
    ]
  }
  // setting newTodo 
  handleChange = (e) =>{
    this.setState({
      newTodo: e.target.value
    })
  }

  // pushing it to todos
  changeHandler = () => {
    const oldTodo = {
      id: this.state.Todos.length+ 1,
      name: this.state.newTodo
    }

    const copyTodo = this.state.Todos;
    copyTodo.push(oldTodo);

    this.setState({
      Todos: copyTodo,
      newTodo:""
    })
  }

  // delete
  deleteTodo = (index) => {
    console.log(index);
    const Todos = this.state.Todos;
    delete Todos[index];
    this.setState({Todos})
    this.alert("Deleted Successfully")
  }

  // edit
  editTodo = (index) => {
    const todo = this.state.Todos[index];
    this.setState({ 
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    })
    console.log(this.state.editingIndex);
  }
 // update 
 updateTodo = () => {
   const todo= this.state.Todos[this.state.editingIndex];
   todo.name = this.state.newTodo;
    const Todos = this.state.Todos;
    Todos[this.state.editingIndex] = todo;
    console.log(Todos[this.state.editingIndex]);
   this.setState({ Todos,
    editing: false, 
    editingIndex: null
  })
  this.alert('Todo Updated Successfully')
 }

 // alert 
 alert = (notification) => {
   this.setState({notification})
   setTimeout(() => {this.setState({notification: null})}, 3000)
    
 }

 // api call
 getData = () => {
   fetch(`http://5b2d89ab23b5af0014043ce4.mockapi.io/todos`)
   .then(data => data.json())
   console.log(data);
   
 }

  render() {
    return (
      <div className="App">
        <div className="container">
        <button onClick={this.getData}> Click </button>
        {
          this.state.notification &&
            <div className="alert alert-success">
              <p className="text-center"> {this.state.notification}</p>
            </div>
        }
        
        <input 
          type="text" 
          className="m-4 form-control" 
          placeholder="Add"
          onChange={this.handleChange}
          name="input"
          value={this.state.newTodo}
          />

          <button 
            className="btn-info mb-3 form-control"
            onClick={ this.state.editing? this.updateTodo: this.changeHandler}> 
            {this.state.editing? "Update": "Add"} </button>

          { 
            !this.state.editing && 
              <ul className="list-group">
                {this.state.Todos.map( (i,index) => {
                  return <ListItem 
                    key={i.id}
                    i = {i}
                    deleteTodo = {() =>  this.deleteTodo(index)}
                    editTodo = {() => this.editTodo(index)}
                  />
                })}
              </ul>
          }
        </div>
      </div>
    );
  }
}

export default App;
