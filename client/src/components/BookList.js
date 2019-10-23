import React from 'react';
import { Query } from 'react-apollo';
import { allBooks } from '../queries';
const style = {

}

const detail = (book, index) => (
  <div key={index}>
    <div style={{ display: 'inline-block', width: '66%'}}>
      {book.name}
    </div>
    <div style={{ display: 'inline-block' }}>
      <em>
        <small>
          {book.author.name}
        </small>
      </em>
    </div>
  </div>
);

export default () => {
  return (

    <div id='book-list'>
      <Query query={allBooks}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              {data.books ? data.books.map((book, index) => {
                return detail(book, index)
              }) : ""}
            </div>
          );
        }}
      </Query>
    </div>
  );
}



