import { gql } from 'apollo-boost';

const allAuthors = gql`
{
  authors {
    name
    id
  }
}
`;

const allBooks = gql`
{
	books {
		name
		id
		author {
			name
		}
	}
}`;


const getBook =(id)=> gql`
{
	book(id:"${id}") {
		name
		genre
		id
		author {
			name
		}
	}
}`;


const getBooks = (id) => gql`
{
	author(id: "${id}") {
		name
		books {
			name
			id
		}
	}
}`;

const addNewBook= gql`
mutation ($name: String!, $genre: String!, $authorID: String!) {
	addBook (name: $name,genre: $genre ,authorID: $authorID) {
		name
		id
		author {
			name
		}
	}
}`;

const addNewAuthor= gql`
mutation ($name: String!, $age: Int!) {
	addNewAuthor (name: $name, age: $age) {
		name
		age
	}
}`;


export { allAuthors, allBooks, getBooks, addNewBook, getBook, addNewAuthor }
