import React from 'react';
const style = {
    border: 'none',
    margin: 0,
    padding: 0
  }
export default (props)=><div><label htmlFor={props.id}>{props.label}</label>
<input type="number" id={props.id} name={props.id} onKeyUp={props.handler}/></div>