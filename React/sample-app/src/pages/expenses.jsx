import { useEffect, useState } from "react";
import axios from 'axios';
export const Expenses = () => {
    const [todos, setTodos] = useState([]);
    const createTodoListComponent = () => {
        const todoListComponent = todos.map(todo => `<li>${todo.title}</li>`);
        return `<ul>${todoListComponent}</ul>`;
    };
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos',  {headers: {
            'Access-Control-Allow-Origin': '*',
          }}).then(res => {
            setTodos(res.data.filter(todo => todo.id <= 10));
          }).catch(err => console.log('axios error', err));
    }, []);
    return (
        <div>
            <div>Expenses Page!!!</div>
            <div>Activities with expenses</div>
            {todos.length>0 && (createTodoListComponent())}
        </div>
    )
};