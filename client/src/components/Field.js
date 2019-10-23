import React from 'react';

export default (props)=><div><label htmlFor={props.id}>{props.label}</label>
<input type={props.type||"text"} id={props.id} name={props.id} onKeyUp={props.handler}/></div>