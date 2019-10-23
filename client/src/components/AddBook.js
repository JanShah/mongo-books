import React from 'react';
import { Mutation } from 'react-apollo';
import { addNewBook, allBooks, getBooks } from '../queries'
import Field from './Field';
import SelectAuthor from './SelectAuthor';

const store = () => {
	const fields = {
	}

	return (key, value) => {
		if (key)
			fields[key] = value;
		else return fields;
	}
}

const storeData = store();

const handleChange = e => {
	const value = e.target.value;
	const key = e.target.id;
	storeData(key, value);
}

export default props => {
	return (
		<Mutation mutation={addNewBook}
			update={(cache, { data: { addBook } }) => {
				const { books } = cache.readQuery({ query: allBooks });
				cache.writeQuery({
					query: allBooks,
					data: { books: books.concat([addBook]) },
				});
			}}>
			{(addBook, { data }) => {
				return (
					<form>
						<Field id={"name"} label={"Name"} handler={handleChange} />
						<Field id={"genre"} label={"Genre"} handler={handleChange} />
						<SelectAuthor id={"authorID"} label={"Author"} handler={handleChange} />
						<input type="submit" value="Submit" onClick={e => {
							e.preventDefault();
							if (props.selectedAuthor) {
								addBook({
									variables: storeData(),
									//refetch the data for the selected author
									refetchQueries: [{ query: getBooks(props.selectedAuthor) }]
								});
							} else {
								addBook({
									variables: storeData()
								});
							}

						}} />
					</form>
				)
			}}
		</Mutation>
	);
}