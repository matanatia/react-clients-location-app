import React from 'react';
import './List.css';

const List = props => (
    <ul>
    {
        props.arr.map(elem =>
        <li key={elem} onClick={ props.sendData } data-id = {elem.replace(/[. ,:-]+/g, "-")} >
            <h3>{elem}</h3>
        </li> )
    }
    </ul>
);

export default List;