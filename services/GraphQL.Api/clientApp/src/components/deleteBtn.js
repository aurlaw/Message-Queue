import React from 'react';

import './deleteBtn.css';


export const DeleteBtn = (props) => (
    <button className="btn btn-danger p-del" onClick={e => {
        e.preventDefault();
        props.onDelete();
    }}>X</button>
);