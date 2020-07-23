import React, {useEffect} from 'react';
import {getBookQuery} from "../queries/queries";
import {graphql} from "react-apollo";

const BookDetails = (props) => {

    console.log('boo',props);

    const display = () => {
        const {book} = props.data;
        if(book) {
            return (<div>
                <h2>{book.name}</h2>
                <h2>{book.genre}</h2>
                <h2>{book.author.name}</h2>
                <h2>All Books</h2>

                <ul className="other-books">
                    {book.author.books.map((e) => {
                        return (<li key={e.id}>{e.name}</li>)
                    })
                    }
                </ul>
            </div>)
        } else {
            return (<div>No book found</div>)
        }
    }

    return (<div id="book-details">
            <p>Book Details</p>
        <div>
            {display()}
        </div>
    </div>)
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.id
            }
        }
    }

})(BookDetails)

