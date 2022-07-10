import { useState } from 'react';
export const Component2 = () => {
    const [name, setName] = useState('');
    const updateName = event => {
        const { target : { value : name } } = event;
        setName(name)
    };
    return (
        <div>
            <div>Component 2!</div>
            <form>
                <input type='text' value={name} onChange={updateName}></input>
                <button type='button'>Submit</button>
            </form>
            <div>Name is {name}</div>
        </div>
    );
};