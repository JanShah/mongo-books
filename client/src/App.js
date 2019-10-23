import React, { Component } from 'react';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import AddBook from './components/AddBook';
import Book from './components/Book';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AddAuthor from './components/AddAuthor';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      author: null
    }
  }

  changeAuthor(author) {
    if (author === "Select an author") {
      author = null;
    }
    this.setState({
      author: author
    })
  }

  render() {
    const style = {
      margin: '20px',
      display: 'grid',
      gridTemplate: '"a a a"/ 1fr 1fr 1fr'
    }
    return (
      <ApolloProvider client={client}>
        <div className="App" style={style}>
          <div>
          <h1>List</h1>
            <AuthorList changeAuthor={this.changeAuthor.bind(this)} showBooks={true} />
            <div style={{ minHeight: '200px' }}>
              {this.state.author ? <Book author={this.state.author} /> : <BookList />}
            </div>
          </div>
          <div style={{position:'relative'}}>
            <h1>Add a book</h1>
            <AddBook selectedAuthor={this.state.author} />
          </div>

          <div style={{position:'relative'}}>
            <h1>Add an author</h1>

            <AddAuthor />
          </div>

        </div>
      </ApolloProvider>
    )
  }
}