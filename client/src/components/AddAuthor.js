import React from 'react';
import { Mutation} from 'react-apollo';
import {allAuthors, addNewAuthor} from '../queries'
import Field from './Field';

const store =()=>{
	const fields = {
	}

	return (key,value)=>{
		if(key)
		fields[key] = value;
		else return fields;
	}
}

const storeData = store();

const handleChange = e=>{
    let value;
    if(e.target.type==="number")
        value = Number(e.target.value);
    else
        value = e.target.value;
	const key = e.target.id;
	storeData(key,value);
}

export default props => {
	return (
		<Mutation mutation={addNewAuthor}
		update={(cache, { data: { addNewAuthor } }) => {
			const { authors } = cache.readQuery({ query: allAuthors });
			cache.writeQuery({
				query: allAuthors,
				data: { authors: authors.concat([addNewAuthor]) },
			});
		}}>
			 {(addNewAuthor, { data }) => { 
				 return (
			 <form>
					<Field type="text" id={"name"} label={"Name"} handler={handleChange} />
					<Field type="number" id={"age"} label={"Age"} handler={handleChange} />
					
					<input type="submit" value="Submit" onClick={e=>{
                        e.preventDefault();
                        debugger
                        addNewAuthor({
                            variables:storeData(),
                            //refetch the data for the selected author
                            refetchQueries:[{query:allAuthors}]
                        });
				
					}}/>
			</form>
			)}}
		</Mutation>
	);
}