import React from 'react';
import Book from './Book';
import { Link } from 'react-router-dom'

const Search = (props) => {
    
    return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search"></Link>
              <div className="search-books-input-wrapper">

                <input type="text" placeholder="Search by title or author" value={props.value} onChange={props.update}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {Array.isArray(props.result) ? props.result.map( (book,number) => 
                {                  
                  return(<li key={book.id}>
                    <Book book={book.id} moveToShelf={props.moveToShelf}/>
                  </li>)
                }) : <h1>We couldn't find anything matching "{props.value}"</h1> }
                
              </ol>
            </div>
          </div>
    )
}

export default Search;