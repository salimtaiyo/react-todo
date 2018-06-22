import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state={
    newTodo:'',

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

  handleChange = (e) =>{
    this.setState({
      newTodo: e.target.value
    })
  }

  changeHandler = () => {
    const oldTodo = {
      id: this.state.Todos.length + 1,
      name: this.state.newTodo
    }

    const copyTodo = this.state.Todos;
    copyTodo.push(oldTodo);

    this.setState({
      Todos: copyTodo,
      newTodo:""
    })
  }

  deleteTodo = (index) => {
    
    const Todos = this.state.Todos;
    delete Todos[index];
    this.setState({
      Todos
    })
  

  }
  render() {
    console.log(this.state.newTodo);
    return (
      <div className="App">
        <div className="container">
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
            onClick={this.changeHandler}
            > Add </button>
          <ul className="list-group">
            {this.state.Todos.map( (i,index) => {
              return <li key={i.id} className="list-group-items"> 
                {i.name} 
                <button className="btn-sm btn-danger ml-4" onClick= {() =>{
                  this.deleteTodo(index)}
                }> X</button>
              </li>;
            })}
            

          </ul>
        </div>
      </div>
    );
  }
}

export default App;
