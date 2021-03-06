import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from "./components/bookList";
import AddBook from "./components/addBook";
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})
function App() {
  return (
   <ApolloProvider client={client}>
       <BookList/>
       <AddBook/>
   </ApolloProvider>
  );
}

export default App;
