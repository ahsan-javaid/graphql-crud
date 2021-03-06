import React, {useEffect, useState} from 'react';
import {graphql} from "react-apollo";
import {getBooksQuery} from "../queries/queries";
import BookDetailes from './BookDetailes';

const BookList = (props) => {

    const [id, setId] = useState(null);

    const onBookClick = (id) => {
        console.log("id", id);
        setId(id);
    }
    const displayBooks = () => {
        let data = props.data;
        if(data.loading) {
            return (<div>Loading Books</div>)
        } else {
            return data.books.map((book) => {
                return (
                    <li onClick={() => onBookClick(book.id)} key={book.id}>{book.name}</li>
                )
            })
        }
    }
    return (<div>
        <h1>Ninja's Reading List</h1>
        <ul id="book-list">
            {displayBooks()}

        </ul>
        <h2>Add new book</h2>
        <BookDetailes id={id}/>
    </div>)
}

export default graphql(getBooksQuery)(BookList);