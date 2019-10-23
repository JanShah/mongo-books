import React from 'react';
import SelectAuthor from './SelectAuthor';

export default (props)=>{
	const onChange=(e)=>{
		props.changeAuthor(e.target.value);
	}
	return <SelectAuthor id={"authorID" }label={"Author"} handler={(e)=>onChange(e)} />};