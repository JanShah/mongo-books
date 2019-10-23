import React from 'react';
import { Query } from 'react-apollo';
import { allAuthors } from '../queries';

export default props=><div><label htmlFor={props.id}>{props.label}</label>
<Query query={allAuthors}>
    {({ loading, error, data }) => {
        if (loading) return <label>Loading...</label>;
        if (error) return `Error! ${error.message}`;
        return (
            <select id={props.id} onChange={props.handler}>
                <option>Select an author</option>
                {data.authors.map((author, index) => 
                    <option key={author.id} value={author.id}>{author.name}</option>
                )}
            </select>
        );
    }}
</Query></div>