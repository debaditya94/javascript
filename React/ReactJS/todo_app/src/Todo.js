import React from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Button } from '@material-ui/core';
import './Todo.css';
import { db } from './firebase';

function Todo(props) {
    return (
        <List className="todo_list">
            <ListItem >
                <ListItemAvatar>
                    {/* <Avatar>
                        <ImageIcon/>
                    </Avatar> */}
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Dummy deadline" />
            </ListItem>
            <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()}> DELETE ME</Button>
        </List>
    )
}

export default Todo;
