import React from 'react';
import './user.css';

const User = (props) => {
        return (
            <div>
                <h3>{props.user.real_name}</h3>
                <p onClick={props.click}>View Activity</p>
            </div>
        );
};

export default User;