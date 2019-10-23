import React from 'react';
import { Query } from 'react-apollo';
import { getBook } from '../queries';

const detail = (book,index)=>{
    console.log(book)
    return ( 
    <div key={index}>
      {book.name} <b style={{padding:'0 10px'}}> {book.genre}</b> 
      <em>
        <small> 
          {book.author.name}
        </small>
      </em>
    </div> 
    )};
    
    export default (props)=>{
        const query = getBook(props.id);
        console.log('getting book info')
        return (
          <div>
            <Query query={query}>
              {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                return (
                  <div>
                   {detail(data.book,0)}
                  </div>
                );
              }}
            </Query>
          </div>
        );
    }
    