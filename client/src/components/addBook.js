import React, {useEffect, useState} from 'react';
import {graphql} from "react-apollo";
import {flowRight as compose} from 'lodash';
import {getBooksQuery} from "../queries/queries";


import {getAuthorsQuery} from "../queries/queries";
import {addBookMutation} from "../queries/queries";

const AddBook = (props) => {
    const [book, setBook] = useState({
        name: '',
        genre: '',
        authorId: ''
    });
    const displayAuthors = ()=> {
        const data = props.getAuthorsQuery;
        if(data.loading) {
            return (<option>Loading</option>)
        } else {
            return data.authors.map((v) => {
                return (<option value={v.id} key={v.id}>
                    {v.name}
                </option>)
            })
        }
    }

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        const data = {};
        data[event.target.name] = event.target.value;
        setBook({
            ...book,
            ...data
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addBookMutation({
            variables: book,
            refetchQueries: [{query: getBooksQuery }]
        });
    }

    return (<form onSubmit={(e) => handleSubmit(e)}>
        <div className='field'>
            <label>Book Name</label>
            <input name="name" onChange={(e) => handleChange(e)} type="text"/>
        </div>
        <div className='field'>
            <label>Genra</label>
            <input name="genre" onChange={(e) => handleChange(e)} type="text"/>
        </div>
        <div className='field'>
            <label>Author</label>
            <select name="authorId" onChange={(e) => handleChange(e)}>
                <option>Select author</option>
                {displayAuthors()}
            </select>
        </div>
        <button type="submit">Save</button>
    </form>)
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);