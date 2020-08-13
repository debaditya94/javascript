import React from 'react';
import Button from 'react-bootstrap/Button';

const CustomInput = ({ value, onClick }) => {
    return <Button className="example-custom-input" onClick={onClick}>
      {value}
    </Button>
};

export default CustomInput;