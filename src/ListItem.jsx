import React from 'react'

const ListItem = (props) => 
    <li className="list-group-items"> 
        {props.i.name} 

        <button className="btn-sm btn-danger ml-4" onClick= {props.deleteTodo}> X</button>

        <button className="btn-sm btn-info ml-4" onClick= {props.editTodo}> U</button>
    </li>;


export default ListItem;