import React from 'react';

const ListItem = (props) => {
    return <li className="list-group-item shadow-sm p-3 mb-1 text-dark bg-light rounded">
        {props.item.name}

        <button 
        onClick={props.editTodo}
        title="Edit Todo"
        className="btn btn-outline-info btn-sm ml-2 float-right">
        <i className="far fa-edit"></i>
        </button>

        <button 
        onClick={props.deleteTodo}
        title="Delete Todo"
        className="btn btn-outline-danger btn-sm ml-3 float-right">
        <i className="far fa-trash-alt"></i>
        </button>
    </li>;
        
};

export default ListItem;