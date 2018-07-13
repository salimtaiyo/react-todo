import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();

    this.state={
      newTodo:'',
      editing:false,
      editingIndex: null,
      notification: null,
      Todos:[],
      loading: true
    }
    this.apiUrl = 'http://5b2d89ab23b5af0014043ce4.mockapi.io' ;
    this.changeHandler = this.changeHandler.bind(this);
  }
  
  
  // setting newTodo 
  handleChange = (e) =>{
    this.setState({
      newTodo: e.target.value
    })
  }

  // pushing it to todos
  async changeHandler() {
    // const oldTodo = {
    //   id: this.state.Todos.length+ 1,
    //   name: this.state.newTodo
    // }

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });
  
    const copyTodo = this.state.Todos;
    copyTodo.push(response.data);

    this.setState({
      Todos: copyTodo,
      newTodo:""
    })
  }


  // delete
  deleteTodo = async (index) => {
    const Todos = this.state.Todos;
    const todo = Todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`)
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
 updateTodo = async () => {
   const todo= this.state.Todos[this.state.editingIndex];
   todo.name = this.state.newTodo;
   const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {name: this.state.newTodo})
    const Todos = this.state.Todos;
    Todos[this.state.editingIndex] = response.data;
  
   this.setState({ 
      Todos,
      editing: false, 
      editingIndex: null,
      newTodo: ""
  })
  this.alert('Todo Updated Successfully')
 }

 // alert 
 alert = (notification) => {
   this.setState({notification})
   setTimeout(() => {this.setState({notification: null})}, 3000)
    
 }

async componentDidMount(){
  const res = await axios.get(`${this.apiUrl}/todos`);
  console.log(res);
  this.setState({
    Todos: res.data,
    loading:false
  })
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
            {this.state.editing? "Update": "Add"}
          </button>

          {
            this.state.loading && <h1> Loading </h1>
          }

          { 
            (!this.state.editing || this.state.loading) && 
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
