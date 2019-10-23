import React from 'react';

export default (props)=><fieldset><label htmlFor={props.id}>{props.label}</label>
<input id={props.id} name={props.id} onKeyUp={props.handler}/></fieldset>