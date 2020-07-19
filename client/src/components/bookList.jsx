import React, {useEffect} from 'react';
import {graphql} from "react-apollo";
import {getBooksQuery} from "../queries/queries";

const BookList = (props) => {
    const displayBooks = () => {
        let data = props.data;
        if(data.loading) {
            return (<div>Loading Books</div>)
        } else {
            return data.books.map((book) => {
                return (
                    <li key={book.id}>{book.name}</li>
                )
            })
        }
    }
    return (<div>
        <h1>Ninja's Reading List</h1>
        {displayBooks()}
        <h2>Add new book</h2>
    </div>)
}

export default graphql(getBooksQuery)(BookList);