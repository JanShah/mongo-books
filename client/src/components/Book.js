import React from 'react';
import { Query } from 'react-apollo';
import { getBooks } from '../queries';
import BookDetails from './BookDetails';

const book = (detail) => {
    return (
        <div key={detail.id}>
            {detail.name}
            <BookDetails id={detail.id} />
        </div>
    )
}

export default props => {
    const query = getBooks(props.author);
    return (
        <Query query={query}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                return (
                    <div>
                        <h2>{data.author.name}</h2>
                        {data.author.books.map(detail => book(detail))}
                    </div>
                );
            }}
        </Query>
    )
};
